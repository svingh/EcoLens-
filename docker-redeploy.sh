#!/bin/bash

bold=$(tput bold)
normal=$(tput sgr0)

print_usage() {
  printf "Usage: docker-redeploy -b <git_branch>\n"
}

while getopts 'b:' flag; do
  case "${flag}" in
    b) branch="${OPTARG}" ;;
    *) print_usage
       exit 1 ;;
  esac
done

# ---

echo `date`

dcompose="docker compose"

if [ "$HOME" = "/home/socs" ]; then
    su="sudo"
    environment=production
    config="compose.deploy.yaml"
else
    su=""
    environment=development
    config="compose.yaml"
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

# ---

echo "${bold}Tearing down containers...${normal}"
$su $dcompose -f $config down -v

echo "${bold}Clearing all docker resources...${normal}"
$su docker system prune -af --volumes

if [ ! -z $branch ]; then
    res=`git fetch`

    if [ $? -ne 0 ]; then
        exit 1
    fi

    res=`git status`

    if [ $? -ne 0 ]; then
        exit 1
    fi

    res=`git stash`

    if [ $? -ne 0 ]; then
        exit 1
    fi

    res=`git checkout $branch`

    if [ $? -ne 0 ]; then
        exit 1
    fi

    res=`git pull`

    if [ $? -ne 0 ]; then
        exit 1
    fi

    echo "The git branch is now up-to-date with $branch${normal}"
fi

echo "${bold}Restarting containers...${normal}"
$su ENVIRONMENT=$environment $dcompose -f $config up -d --build
echo "${bold}Done${normal}"
