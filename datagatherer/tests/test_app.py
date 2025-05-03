import pytest
from unittest.mock import MagicMock
from app import main, _create_session, DataGatherer, DataUpdater, DataTransformer

# Test the main function
@pytest.mark.asyncio
async def test_main(mocker):
    # Mock session creation
    mocker.patch("app._create_session", return_value=MagicMock())
    
    # Mock data gatherer fetch
    mocker.patch.object(DataGatherer, "fetch_data", return_value=[{"id": 1, "last_updated": "2023-01-01", "Value": "123.4"}])

    # Mock data transformer
    mocker.patch.object(DataTransformer, "transform_data_wastewater", return_value=[{"id": 1, "lastUpdated": "2023-01-01", "parameterValue": "123.4"}])

    # Mock updater
    mocker.patch.object(DataUpdater, "update_wastewater", return_value=None)

    # Run main
    await main()

    # Assertions to verify workflow
    DataGatherer.fetch_data.assert_called()
    DataTransformer.transform_data_wastewater.assert_called()
    DataUpdater.update_wastewater.assert_called()

# Test data update functionality
def test_update_sewage():
    mock_session = MagicMock()
    mock_session.put.return_value.raise_for_status.return_value = None

    updater = DataUpdater("http://mock-backend", mock_session)
    updater.update_sewage([{"id": 1, "key": "value"}])

    mock_session.put.assert_called_once_with(
        "http://mock-backend/api/sewage",
        json=[{"id": 1, "key": "value"}]
    )

# Test data transformation for wastewater
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

# Test data transformation with errors
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

# Test fetch data functionality (success)
def test_fetch_data_success():
    # Mock session and response
    mock_session = MagicMock()
    mock_response = MagicMock()
    mock_response.json.return_value = [{"id": 1, "key": "value"}]
    mock_response.raise_for_status.return_value = None
    mock_session.get.return_value = mock_response

    gatherer = DataGatherer("http://mock-url", "mock-api-key", mock_session)
    data = gatherer.fetch_data()

    mock_session.get.assert_called_once()
    assert data == [{"id": 1, "key": "value"}]

# Test fetch data functionality (failure)
def test_fetch_data_failure():
    # Mock session and response for failure
    mock_session = MagicMock()
    mock_session.get.side_effect = Exception("Connection failed")

    gatherer = DataGatherer("http://mock-url", "mock-api-key", mock_session)
    data = gatherer.fetch_data()

    mock_session.get.assert_called_once()
    assert data is None
