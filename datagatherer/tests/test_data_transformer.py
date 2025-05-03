from app import DataTransformer

def test_transform_data_wastewater():
    raw_data = [
        {
            "id": 1,
            "last_updated": "2023-01-01",
            "Works Name": "Facility A",
            "\ufeffSECTOR": "Manufacturing",
            "Value": "123.4",
            "Parameter Name": "pH,Temperature",  # Added missing key
        }
    ]

    expected_output = [
        {
            "id": 1,
            "lastUpdated": "2023-01-01",
            "sector": "Manufacturing",
            "facility": "Facility A",
            "companyCode": None,
            "facilityMunicipality": None,
            "sampleDate": None,
            "controlPointName": None,
            "controlPointId": None,
            "parameter": "pH",  # Extracted first part before the comma
            "reportedParameter": None,
            "resultStructure": None,
            "componentType": None,
            "parameterValue": "123.4",
            "parameterUnit": None,
            "regulation": None,
            "sampleCollectionFrequency": None,
        }
    ]

    transformed = DataTransformer.transform_data_wastewater(raw_data)
    assert transformed == expected_output

def test_transform_data_sewage_with_errors():
    raw_data = [
        {
            "id": 1,
            "last_updated": "2023-01-01",
            "\ufeffFacility Owner": "Company A.",
            "Contaminant Limit": "INVALID",  # Invalid float
        }
    ]

    transformed = DataTransformer.transform_data_sewage(raw_data)
    assert len(transformed) == 0
