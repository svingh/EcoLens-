import pytest
from unittest.mock import MagicMock
from app import DataGatherer

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

def test_fetch_data_failure():
    # Mock session and response for failure
    mock_session = MagicMock()
    mock_session.get.side_effect = Exception("Connection failed")

    gatherer = DataGatherer("http://mock-url", "mock-api-key", mock_session)
    data = gatherer.fetch_data()

    mock_session.get.assert_called_once()
    assert data is None
