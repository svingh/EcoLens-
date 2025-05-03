import pytest
from unittest.mock import MagicMock
from app import main, _create_session, DataGatherer, DataUpdater, DataTransformer

@pytest.mark.asyncio
async def test_main(mocker):
    # Mock session creation
    mocker.patch("app._create_session", return_value=MagicMock())
    
    # Mock data gatherer fetch
    mocker.patch.object(DataGatherer, "fetch_data", return_value=[
        {"id": 1, "last_updated": "2023-01-01", "Value": "123.4"}
    ])

    # Mock data transformer
    mocker.patch.object(DataTransformer, "transform_data_wastewater", return_value=[
        {"id": 1, "lastUpdated": "2023-01-01", "parameterValue": "123.4"}
    ])

    # Mock updater
    mocker.patch.object(DataUpdater, "update_wastewater", return_value=None)

    # Run main
    await main()

    # Assertions to verify workflow
    DataGatherer.fetch_data.assert_called()
    DataTransformer.transform_data_wastewater.assert_called()
    DataUpdater.update_wastewater.assert_called()
