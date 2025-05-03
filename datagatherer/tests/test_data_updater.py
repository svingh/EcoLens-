from unittest.mock import MagicMock
from app import DataUpdater

def test_update_sewage():
    mock_session = MagicMock()
    mock_session.put.return_value.raise_for_status.return_value = None

    updater = DataUpdater("http://mock-backend", mock_session)
    updater.update_sewage([{"id": 1, "key": "value"}])

    mock_session.put.assert_called_once_with(
        "http://mock-backend/api/sewage",
        json=[{"id": 1, "key": "value"}]
    )
