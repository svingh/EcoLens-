import os
import asyncio
import datetime
import requests

from urllib3.util.retry import Retry
from requests.adapters import HTTPAdapter


# Table names
SEWAGE_TABLE = "Industrial_Sewage_By_Site"
WASTEWATER_TABLE = "Industrial_Wastewater_By_Facility"

# Environment variables
SEWAGE_UPDATE_FILE = ".lud_sewage"
WASTEWATER_UPDATE_FILE = ".lud_wastewater"

# Configuration for external data service and backend
DATA_SERVICE_URL = "https://cis-data-service.socs.uoguelph.ca"
API_KEY = "Bpg6kdC_epqE-vKE3Mfu_i3hXq-LOnrklY6-UQBIAHG0Lmuf7DDeOw"  #team's API key
BACKEND_API_URL = "http://backend:8080"


class DataGatherer:
    def __init__(self, data_service_url: str, api_key: str, session: requests.Session):
        self.data_service_url = data_service_url
        self.api_key = api_key
        self.session = session

    def fetch_data(self):
        """Fetch data from the external data service with the API key."""
        try:
            headers = {"Apikey": self.api_key}
            response = self.session.get(self.data_service_url, headers=headers)
            response.raise_for_status()  # Check for HTTP errors
            return response.json()
        except Exception as e:
            print(f"Error fetching data: {e}")
            return None

class DataTransformer:
    """Handles transformation for data resources"""
    @staticmethod
    def transform_data_wastewater(data):
        """Transforms wastewater data"""
        transformed_data = []
        if not isinstance(data, list):
            return transformed_data

        for item in data:
            transformed_note = {
                "id": item.get("id"),
                "lastUpdated": item.get("last_updated"),
                "sector": item.get("\ufeffSECTOR"),  # column is misspelled
                "facility": item.get("Works Name"),
                "companyCode": item.get("Company Code"),
                "facilityMunicipality": item.get("Municipality"),
                "sampleDate": item.get("SAMPLEDATE"),
                "controlPointName": item.get("Control Point Name"),
                "controlPointId": item.get("Control Point ID"),
                "parameter": item.get("Parameter Name", "").split(",")[0],  # Ensure default value
                "reportedParameter": item.get("Parameter Reported As"),
                "resultStructure": item.get("Result Structure"),
                "componentType": item.get("Component Type"),
                "parameterValue": item.get("Value"),
                "parameterUnit": item.get("Unit of Measure"),
                "regulation": item.get("Regulation"),
                "sampleCollectionFrequency": item.get("Frequency"),
            }
            transformed_data.append(transformed_note)

        return transformed_data

    
    @staticmethod
    def transform_data_sewage(data):
        """Transforms sewage data"""
        transformed_data = []
        if not isinstance(data, list):
            return transformed_data

        for item in data:
            try:
                # Attempt to parse contaminantLimit, contaminantMinRecord, and contaminantMaxRecord as floats
                contaminant_limit = float(item.get("Contaminant Limit", 0.0))
                contaminant_min_record = float(item.get("Quantity Minimum*", 0.0)) # column is misspelled
                contaminant_max_record = float(item.get("Quantity Maximum*", 0.0)) # column is misspelled
                
                # If parsing succeeds, proceed with adding the transformed note
                transformed_note = {
                    "id": item.get("id"),
                    "lastUpdated": item.get("last_updated"),
                    "facilityOwner": item.get("\ufeffFacility Owner", "").split(".")[0],  # column is misspelled
                    "siteAddress": item.get("Site Address"),
                    "siteMunicipality": item.get("Site Municipality"),
                    "sector": item.get("Sector"),
                    "district": item.get("District"),
                    "contaminant": item.get("Contaminant", "").strip(),
                    "contaminantLimit": contaminant_limit,
                    "contaminantUnit": item.get("Contaminant Unit"),
                    "contaminantMinRecord": contaminant_min_record,  # column is misspelled
                    "contaminantMaxRecord": contaminant_max_record,  # column is misspelled
                    "exceedanceType": item.get("Type of Exceedance"),
                    "exceedanceStart": item.get("Exceedance Start Date"),
                    "exceedanceEnd": item.get("Exceedance End Date"),
                    "exceedanceCount": item.get("No of Exceedances"),
                    "limitFrequency": item.get("Limit Frequency"),
                    "facilityAction": item.get("Facility Action"),
                    "ministryAction": item.get("Ministry Action"),
                }
                # Append the valid transformed note
                transformed_data.append(transformed_note)

            except ValueError:
                # If there's a ValueError, skip this item since the contaminant limit or record fields are not numeric
                print(f"Skipping row {item['id']} with invalid contaminant limit/records.")
        return transformed_data

class DataUpdater:
    def __init__(self, backend_api_url: str, session: requests.Session):
        self.backend_api_url = backend_api_url
        self.session = session

    def _subset_data(self, data: list, chunks=10):
        CHUNKS = chunks
        MIN_CHUNK_SIZE = 100
        MAX_CHUNK_SIZE = 1000

        # Clamp the chunk size between 100 and 1000
        chunk_size = max(MIN_CHUNK_SIZE, min(len(data) / CHUNKS, MAX_CHUNK_SIZE))
        
        for i in range(0, len(data), chunk_size):
            yield data[i:i + chunk_size]

    def update_sewage(self, transformed_data):
        """Update the transformed data into the backend."""
        for subset_data in self._subset_data(transformed_data):
            update_response = self.session.put(self.backend_api_url + "/api/sewage", json=subset_data)
            update_response.raise_for_status()

        with open(SEWAGE_UPDATE_FILE, "w") as f:
            f.write(str(datetime.datetime.now().date()))

    def update_wastewater(self, transformed_data):
        """Update the transformed data into the backend."""
        for subset_data in self._subset_data(transformed_data):
            update_response = self.session.put(self.backend_api_url + "/api/wastewater", json=subset_data)
            update_response.raise_for_status()
            
        with open(WASTEWATER_UPDATE_FILE, "w") as f:
            f.write(str(datetime.datetime.now().date()))

def _create_session():
    """Create the session object."""
    session = requests.Session()

    retry = Retry(backoff_factor=0.05)
    adapter = HTTPAdapter(max_retries=retry)

    session.mount(BACKEND_API_URL, adapter)

    print(f"Created session with adapter to url '{BACKEND_API_URL}'."
          " Retries: 10, Backoff Factor: 0.05."
    )

    return session

def _get_data_service_url(table: str, update_file: str):
    url = f"{DATA_SERVICE_URL}/data/{table}"

    if not os.path.exists(update_file):
        return url

    try:
        with open(update_file, "r") as f:
            last_update = f.readline()
            return url + f"/?after={last_update}"
    except OSError:
        pass

    return url

async def fetch_and_update_data(session, table, update_file, updater):
    gatherer = DataGatherer(_get_data_service_url(table, update_file), API_KEY, session)
    
    raw_data = gatherer.fetch_data()
    if raw_data:
        transformer = DataTransformer()
        transformed_data = transformer.transform_data_wastewater(raw_data) if table == WASTEWATER_TABLE else transformer.transform_data_sewage(raw_data)
        if table == WASTEWATER_TABLE:
            await asyncio.to_thread(updater.update_wastewater, transformed_data)
        else:
            await asyncio.to_thread(updater.update_sewage, transformed_data)


async def main():
    print("Creating session...")
    session = _create_session()
    updater = DataUpdater(BACKEND_API_URL, session)
    
    print("Fetching and updating data...")
    wastewater_task = asyncio.create_task(fetch_and_update_data(session, WASTEWATER_TABLE, WASTEWATER_UPDATE_FILE, updater))
    sewage_task = asyncio.create_task(fetch_and_update_data(session, SEWAGE_TABLE, SEWAGE_UPDATE_FILE, updater))

    # Use asyncio.gather with return_exceptions=True to handle potential errors
    results = await asyncio.gather(wastewater_task, sewage_task, return_exceptions=True)

    # Check and print any exceptions that may have occurred during the tasks
    for result in results:
        if isinstance(result, Exception):
            print(f"An error occurred during fetch and update: {result}")

    print("Closing session...")
    session.close()

    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
