-- test_delete.sql
USE test_db;


START TRANSACTION;

-- Attempt to delete a record to test referential integrity
DELETE FROM sewage WHERE ID = 1;

-- Check if the delete was successful
SELECT 'Delete Test: Success' AS TestResult FROM sewage WHERE ID = 1;

ROLLBACK;