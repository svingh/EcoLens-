import unittest
import sqlite3
import requests
from datetime import datetime

class MockDatabaseConnector:
    """ A simple mock connector for an SQLite in-memory database for testing purposes. """
    
    def __init__(self):
        self.connection = None
    
    def connect(self):
        """ Connect to an in-memory SQLite database. """
        self.connection = sqlite3.connect(":memory:")
        self.cursor = self.connection.cursor()
        self.setup_tables()
    
    def setup_tables(self):
        """ Set up tables similar to the production schema. """
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS sewage (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                LAST_UPDATED DATETIME,
                FACILITY_OWNER TEXT,
                SITE_ADDRESS TEXT,
                SITE_MUNICIPALITY TEXT,
                SECTOR TEXT,
                DISTRICT TEXT,
                CONTAMINANT TEXT,
                CONTAMINANT_LIMIT REAL,
                CONTAMINANT_UNIT TEXT,
                CONTAMINANT_MIN_RECORD REAL,
                CONTAMINANT_MAX_RECORD REAL,
                EXCEEDANCE_TYPE TEXT,
                EXCEEDANCE_START DATE,
                EXCEEDANCE_END DATE,
                EXCEEDANCE_COUNT INTEGER,
                LIMIT_FREQUENCY TEXT,
                FACILITY_ACTION TEXT,
                MINISTRY_ACTION TEXT
            )
        """)
        self.connection.commit()
    
    def insert_sample_data(self):
        """ Insert sample data into the sewage table. """
        self.cursor.execute("""
            INSERT INTO sewage (LAST_UPDATED, FACILITY_OWNER, SITE_ADDRESS, SITE_MUNICIPALITY, SECTOR, 
                                DISTRICT, CONTAMINANT, CONTAMINANT_LIMIT, CONTAMINANT_UNIT, 
                                CONTAMINANT_MIN_RECORD, CONTAMINANT_MAX_RECORD, EXCEEDANCE_TYPE, 
                                EXCEEDANCE_START, EXCEEDANCE_END, EXCEEDANCE_COUNT, LIMIT_FREQUENCY, 
                                FACILITY_ACTION, MINISTRY_ACTION)
            VALUES (?, 'Test Facility Owner', '123 Test St', 'Test City', 'Test Sector', 'Test District', 
                    'Test Contaminant', 10.0, 'mg/L', 5.0, 15.0, 'Type A', '2023-01-01', '2023-01-31', 3, 
                    'Monthly', 'Facility Action', 'Ministry Action')
        """, (datetime.now(),))
        self.connection.commit()
    
    def fetch_data(self, query, params=()):
        """ Fetch data from the database. """
        self.cursor.execute(query, params)
        return self.cursor.fetchall()
    
    def close_connection(self):
        """ Close the database connection. """
        self.connection.close()


class MockDataFetcher:
    """ A mock data fetcher that simulates requests to a backend API. """

    def fetch(self, endpoint, params):
        """ Simulate an API call to fetch data. Replace this with a real API call if needed. """
        # For demonstration, this mock fetch returns hardcoded data
        if endpoint == "http://test-backend/api/sewage" and params.get("sector") == "Test Sector":
            return [
                {
                    "FACILITY_OWNER": "Test Facility Owner",
                    "SITE_ADDRESS": "123 Test St",
                    "SITE_MUNICIPALITY": "Test City",
                    "SECTOR": "Test Sector",
                    "CONTAMINANT": "Test Contaminant",
                    "CONTAMINANT_LIMIT": 10.0
                }
            ]
        else:
            return []


class IntegrationTestFetcherBackend(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Initialize mock database and data fetcher
        cls.db = MockDatabaseConnector()
        cls.fetcher = MockDataFetcher()

        # Connect to the database and insert sample data
        cls.db.connect()
        cls.db.insert_sample_data()

    def test_fetch_data_from_backend(self):
        # Perform a fetch from the mock backend
        response = self.fetcher.fetch(endpoint="http://test-backend/api/sewage", params={"sector": "Test Sector"})
        
        # Verify that we got a response and it contains expected data
        self.assertIsNotNone(response, "No response received from backend")
        self.assertTrue(len(response) > 0, "No data returned from backend")

        # Fetch data from the mock database to validate against the response
        db_data = self.db.fetch_data("SELECT FACILITY_OWNER, SITE_ADDRESS, SITE_MUNICIPALITY, SECTOR, CONTAMINANT, CONTAMINANT_LIMIT FROM sewage WHERE SECTOR = ?", ("Test Sector",))
        self.assertTrue(len(db_data) > 0, "No data found in test database")

        # Compare fields in the response with data from the database
        db_record = db_data[0]
        self.assertEqual(response[0]["FACILITY_OWNER"], db_record[0], "Mismatch in FACILITY_OWNER")
        self.assertEqual(response[0]["SITE_ADDRESS"], db_record[1], "Mismatch in SITE_ADDRESS")
        self.assertEqual(response[0]["SITE_MUNICIPALITY"], db_record[2], "Mismatch in SITE_MUNICIPALITY")
        self.assertEqual(response[0]["SECTOR"], db_record[3], "Mismatch in SECTOR")
        self.assertEqual(response[0]["CONTAMINANT"], db_record[4], "Mismatch in CONTAMINANT")
        self.assertEqual(response[0]["CONTAMINANT_LIMIT"], db_record[5], "Mismatch in CONTAMINANT_LIMIT")

    @classmethod
    def tearDownClass(cls):
        # Close the database connection after tests
        cls.db.close_connection()


if __name__ == "__main__":
    unittest.main()
