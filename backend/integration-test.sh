#!/bin/bash

fail=0
pass=0

function print_usage() {
  printf "Usage:  integration-test [OPTION]\n"
  printf "Run containerized backend integration tests.\n\n"
  printf "  -h2\t isolation test using H2 database\n"
}

function test_api() {
    echo "Test: [$1, http://localhost:8080/$2]"

    count=0
    while true; do
        if [ $# -eq 4 ] ; then
            result=`curl -s -X $1 http://localhost:8080/$2 -H "Content-Type: application/json" -d $4`
        else
            result=`curl -s -X $1 http://localhost:8080/$2 -H "Content-Type: application/json"`
        fi

        if [[ $result =~ $3 ]] ; then
            echo "${bold}Passed${normal}"
            echo
            pass="$((pass+1))"
            return
        else
            count="$((count+1))"
            if [ $count -ge 3 ]; then
                break
            fi

            echo "Retrying..."
            sleep 3
        fi
    done
    
    echo
    echo "${bold}Failed${normal}"
    echo "Expected: $3, but was: $result"
    fail="$((fail+1))"
    echo
}

if [ $# -gt 1 ]; then
    print_usage
    exit 1
elif [ ! -z "$1" ] && [ "$1" = '-h2' ]; then
    db="h2"
elif [ $# -ne 0 ]; then
    print_usage
    exit 1
fi

bold=$(tput bold)
normal=$(tput sgr0)

# ---

echo `date`

dcompose="docker compose"

config=""
if [[ `pwd` =~ .*backend ]]; then
    config+="../"
fi

if [ "$HOME" = "/home/socs" ]; then
    su="sudo"
    config+="compose.deploy.yaml"
else
    su=""
    config+="compose.yaml"
fi

# Test whether or not the docker engine is running
$su docker ps 1>/dev/null
if [ $? -ne 0 ]; then
    exit 1
fi

if [ ! -e $config ]; then
    echo "${bold}Unable to find docker config file '$config'${normal}"
    exit 1
fi

echo "${bold}Using configuration file '$config'${normal}"

echo "${bold}Restarting backend container...${normal}"

$su $dcompose -f $config down -v

if [ -z $db ]; then
    $su $dcompose -f $config up -d --build database backend
else
    $su ENVIRONMENT=test $dcompose -f $config up -d --build backend
fi

while true; do
    sleep 3
    docker logs ecolens-backend-1 | grep "Started Application" -qs

    if [ $? -eq 0 ]; then
        break
    fi

    echo "Waiting for 'ecolens-backend-1' application to start..."
done

# ---

printf "\n---------------------------${bold}Integration Test Setup${normal}--------------------------------\n\n"

echo "Setting up tables with initial data..."

curl -s -X PUT http://localhost:8080/api/sewage -H "Content-Type: application/json" -d '[
    {
        "LAST_UPDATED": "2024-11-01T10:15:00",
        "FACILITY_OWNER": "Green Energy Ltd.",
        "SITE_ADDRESS": "45 Elm St.",
        "SITE_MUNICIPALITY": "Greenfield",
        "SECTOR": "Agricultural",
        "DISTRICT": "North District",
        "CONTAMINANT": "Nitrate",
        "CONTAMINANT_LIMIT": 10.0,
        "CONTAMINANT_UNIT": "mg/L",
        "CONTAMINANT_MIN_RECORD": 2.0,
        "CONTAMINANT_MAX_RECORD": 15.0,
        "EXCEEDANCE_TYPE": "Type B",
        "EXCEEDANCE_START": "2023-03-15",
        "EXCEEDANCE_END": "2023-03-18",
        "EXCEEDANCE_COUNT": 2,
        "LIMIT_FREQUENCY": "Quarterly",
        "FACILITY_ACTION": "Remediation",
        "MINISTRY_ACTION": "Inspection"
    },
    {
        "LAST_UPDATED": "2024-11-01T11:45:00",
        "FACILITY_OWNER": "Blue Water Co.",
        "SITE_ADDRESS": "78 River Rd.",
        "SITE_MUNICIPALITY": "River City",
        "SECTOR": "Commercial",
        "DISTRICT": "West District",
        "CONTAMINANT": "Phosphate",
        "CONTAMINANT_LIMIT": 3.0,
        "CONTAMINANT_UNIT": "mg/L",
        "CONTAMINANT_MIN_RECORD": 1.5,
        "CONTAMINANT_MAX_RECORD": 3.5,
        "EXCEEDANCE_TYPE": "Type A",
        "EXCEEDANCE_START": "2023-05-10",
        "EXCEEDANCE_END": "2023-05-12",
        "EXCEEDANCE_COUNT": 4,
        "LIMIT_FREQUENCY": "Weekly",
        "FACILITY_ACTION": "None",
        "MINISTRY_ACTION": "Warning"
    },
    {
        "LAST_UPDATED": "2024-11-02T09:30:00",
        "FACILITY_OWNER": "Pure Air Inc.",
        "SITE_ADDRESS": "90 Mountain Ave.",
        "SITE_MUNICIPALITY": "Hilltop",
        "SECTOR": "Industrial",
        "DISTRICT": "Central District",
        "CONTAMINANT": "Ammonia",
        "CONTAMINANT_LIMIT": 8.0,
        "CONTAMINANT_UNIT": "mg/L",
        "CONTAMINANT_MIN_RECORD": 0.5,
        "CONTAMINANT_MAX_RECORD": 10.0,
        "EXCEEDANCE_TYPE": "Type C",
        "EXCEEDANCE_START": "2023-06-01",
        "EXCEEDANCE_END": "2023-06-05",
        "EXCEEDANCE_COUNT": 5,
        "LIMIT_FREQUENCY": "Annually",
        "FACILITY_ACTION": "Treatment",
        "MINISTRY_ACTION": "Legal Action"
    },
    {
        "LAST_UPDATED": "2024-11-02T13:20:00",
        "FACILITY_OWNER": "Eco Waste Services",
        "SITE_ADDRESS": "150 Forest Dr.",
        "SITE_MUNICIPALITY": "Woodland",
        "SECTOR": "Residential",
        "DISTRICT": "East District",
        "CONTAMINANT": "Mercury",
        "CONTAMINANT_LIMIT": 0.1,
        "CONTAMINANT_UNIT": "mg/L",
        "CONTAMINANT_MIN_RECORD": 0.01,
        "CONTAMINANT_MAX_RECORD": 0.15,
        "EXCEEDANCE_TYPE": "Type B",
        "EXCEEDANCE_START": "2023-07-20",
        "EXCEEDANCE_END": "2023-07-22",
        "EXCEEDANCE_COUNT": 1,
        "LIMIT_FREQUENCY": "Monthly",
        "FACILITY_ACTION": "Containment",
        "MINISTRY_ACTION": "Monitoring"
    },
    {
        "LAST_UPDATED": "2024-11-03T08:00:00",
        "FACILITY_OWNER": "Clear Waters LLC",
        "SITE_ADDRESS": "200 Lake Shore",
        "SITE_MUNICIPALITY": "Lakeside",
        "SECTOR": "Tourism",
        "DISTRICT": "South District",
        "CONTAMINANT": "Lead",
        "CONTAMINANT_LIMIT": 0.05,
        "CONTAMINANT_UNIT": "mg/L",
        "CONTAMINANT_MIN_RECORD": 0.02,
        "CONTAMINANT_MAX_RECORD": 0.06,
        "EXCEEDANCE_TYPE": "Type A",
        "EXCEEDANCE_START": "2023-09-15",
        "EXCEEDANCE_END": "2023-09-18",
        "EXCEEDANCE_COUNT": 3,
        "LIMIT_FREQUENCY": "Bi-Annually",
        "FACILITY_ACTION": "Reduction",
        "MINISTRY_ACTION": "Monitoring"
    }
]' 1>/dev/null

curl -s -X PUT http://localhost:8080/api/wastewater -H "Content-Type: application/json" -d '[
    {
        "LAST_UPDATED": "2024-11-01T10:15:00",
        "SECTOR": "Industrial",
        "FACILITY": "Plant A",
        "FACILITY_MUNICIPALITY": "City X",
        "COMPANY_CODE": "C123",
        "SAMPLE_DATE": "2024-11-01",
        "SAMPLE_COLLECTION_FREQUENCY": "Monthly",
        "CONTROL_POINT_NAME": "Point 1",
        "CONTROL_POINT_ID": "P1",
        "PARAMETER": "pH",
        "PARAMETER_VALUE": 7.1,
        "PARAMETER_UNIT": "pH Units",
        "REPORTED_PARAMETER": "Reported pH",
        "RESULT_STRUCTURE": "Standard",
        "COMPONENT_TYPE": "Effluent",
        "REGULATION": "Regulation 101"
    },
    {
        "LAST_UPDATED": "2024-11-01T11:45:00",
        "SECTOR": "Municipal",
        "FACILITY": "Facility B",
        "FACILITY_MUNICIPALITY": "City Y",
        "COMPANY_CODE": "C456",
        "SAMPLE_DATE": "2024-11-01",
        "SAMPLE_COLLECTION_FREQUENCY": "Quarterly",
        "CONTROL_POINT_NAME": "Point 2",
        "CONTROL_POINT_ID": "P2",
        "PARAMETER": "BOD",
        "PARAMETER_VALUE": 18.4,
        "PARAMETER_UNIT": "mg/L",
        "REPORTED_PARAMETER": "Reported BOD",
        "RESULT_STRUCTURE": "Standard",
        "COMPONENT_TYPE": "Effluent",
        "REGULATION": "Regulation 102"
    },
    {
        "LAST_UPDATED": "2024-11-02T09:30:00",
        "SECTOR": "Agriculture",
        "FACILITY": "Farm C",
        "FACILITY_MUNICIPALITY": "City Z",
        "COMPANY_CODE": "C789",
        "SAMPLE_DATE": "2024-11-02",
        "SAMPLE_COLLECTION_FREQUENCY": "Weekly",
        "CONTROL_POINT_NAME": "Point 3",
        "CONTROL_POINT_ID": "P3",
        "PARAMETER": "COD",
        "PARAMETER_VALUE": 23.7,
        "PARAMETER_UNIT": "mg/L",
        "REPORTED_PARAMETER": "Reported COD",
        "RESULT_STRUCTURE": "Standard",
        "COMPONENT_TYPE": "Effluent",
        "REGULATION": "Regulation 103"
    },
    {
        "LAST_UPDATED": "2024-11-02T13:20:00",
        "SECTOR": "Industrial",
        "FACILITY": "Plant D",
        "FACILITY_MUNICIPALITY": "City W",
        "COMPANY_CODE": "C012",
        "SAMPLE_DATE": "2024-11-02",
        "SAMPLE_COLLECTION_FREQUENCY": "Daily",
        "CONTROL_POINT_NAME": "Point 4",
        "CONTROL_POINT_ID": "P4",
        "PARAMETER": "TSS",
        "PARAMETER_VALUE": 10.5,
        "PARAMETER_UNIT": "mg/L",
        "REPORTED_PARAMETER": "Reported TSS",
        "RESULT_STRUCTURE": "Standard",
        "COMPONENT_TYPE": "Effluent",
        "REGULATION": "Regulation 104"
    },
    {
        "LAST_UPDATED": "2024-11-03T08:00:00",
        "SECTOR": "Municipal",
        "FACILITY": "Facility E",
        "FACILITY_MUNICIPALITY": "City V",
        "COMPANY_CODE": "C345",
        "SAMPLE_DATE": "2024-11-03",
        "SAMPLE_COLLECTION_FREQUENCY": "Monthly",
        "CONTROL_POINT_NAME": "Point 5",
        "CONTROL_POINT_ID": "P5",
        "PARAMETER": "Nitrate",
        "PARAMETER_VALUE": 3.2,
        "PARAMETER_UNIT": "mg/L",
        "REPORTED_PARAMETER": "Reported Nitrate",
        "RESULT_STRUCTURE": "Standard",
        "COMPONENT_TYPE": "Effluent",
        "REGULATION": "Regulation 105"
    }
]' 1>/dev/null

printf "\n------------------------------${bold}Integration Test${normal}-----------------------------------\n\n"

# Test getting all sewage/wastewater records from the tables.
test_api "GET" "api/wastewater" "[{.*}]"
test_api "GET" "api/sewage" "[{.*}]"

# Test updating the sewage/wastewater table.
test_api "PUT" "api/sewage" "Updated" "[{}]"
test_api "PUT" "api/wastewater" "Updated" "[{}]"

printf "\n---------------------------${bold}Integration Test Results${normal}------------------------------\n\n"

echo "${bold}Passed:${normal} $((pass))"
echo "${bold}Failed:${normal} $((fail))"
echo "${bold}Total:${normal} $((pass+fail))"

echo "${bold}Done${normal}"
