-- test_insert.sql
USE test_db;


START TRANSACTION;

-- Test inserting valid data into sewage table
INSERT INTO sewage (
    LAST_UPDATED, FACILITY_OWNER, SITE_ADDRESS, SITE_MUNICIPALITY, SECTOR, DISTRICT, CONTAMINANT,
    CONTAMINANT_LIMIT, CONTAMINANT_UNIT, CONTAMINANT_MIN_RECORD, CONTAMINANT_MAX_RECORD,
    EXCEEDANCE_TYPE, EXCEEDANCE_START, EXCEEDANCE_END, EXCEEDANCE_COUNT,
    LIMIT_FREQUENCY, FACILITY_ACTION, MINISTRY_ACTION
) VALUES (
    NOW(), 'Test Owner', '123 Test St.', 'Test Municipality', 'Industrial', 'Test District',
    'Test Contaminant', 5.0, 'mg/L', 1.0, 6.0, 'Type A', '2023-01-01', '2023-01-02',
    3, 'Monthly', 'None', 'Monitoring'
);

-- Check that the data was inserted successfully
SELECT 'Insert Test: Success' AS TestResult FROM sewage WHERE FACILITY_OWNER = 'Test Owner';

-- Attempt to insert invalid data (should fail due to NOT NULL constraint)
-- This will raise an error if it fails as expected
INSERT INTO sewage (LAST_UPDATED) VALUES (NULL);

-- If the previous statement fails as expected, the following statement will not execute.
SELECT 'Constraint Test: Failed (Expected Constraint Violation)' AS TestResult;

ROLLBACK;