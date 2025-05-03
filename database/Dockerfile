# Use the MariaDB image as the base for the database
FROM mariadb:latest

# Copy initialization script
COPY ./init.sql /docker-entrypoint-initdb.d/

# Copy test scripts
COPY ./setup_database.sql /docker-entrypoint-initdb.d/
COPY ./test_insert.sql /docker-entrypoint-initdb.d/
COPY ./test_update.sql /docker-entrypoint-initdb.d/
COPY ./test_delete.sql /docker-entrypoint-initdb.d/
