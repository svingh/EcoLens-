-- test_update.sql
USE test_db;

START TRANSACTION;

-- Attempt to update data in sewage table to test constraints
UPDATE sewage
SET CONTAMINANT_LIMIT = 10.0
WHERE ID = 1;

-- Check if the update was successful
SELECT 'Update Test: Success' AS TestResult FROM sewage WHERE ID = 1 AND CONTAMINANT_LIMIT = 10.0;

ROLLBACK;