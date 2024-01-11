#!/bin/bash
# Run this script to trigger GitHub's data caching
# https://docs.github.com/en/rest/metrics/statistics?apiVersion=2022-11-28#best-practices-for-caching

exec &> ../LAST_CACHE_REQUEST.log

export GITHUB_DATA=../../visualize/github-data
DATELOG=../LAST_CACHE_REQUEST.txt

# On exit
function finish {
    # Log end time
    echo -e "END\t$(date -u)" >> $DATELOG
}
trap finish EXIT

# Stop and Log for failed scripts
function errorCheck() {
    if [ $ret -ne 0 ]; then
        echo "FAILED - $1"
        echo -e "FAILED\t$1" >> $DATELOG
        exit 1
    fi
}

# Basic script run procedure
function runScript() {
    echo "Run - $1"
    python -u $1
    ret=$?
    errorCheck "$1"
}


# Check Python requirements
runScript python_check.py


echo "RUNNING CACHE REQUEST SCRIPT"

# Log start time
echo -e "$(date -u '+%F-%H')" > $DATELOG
echo -e "START\t$(date -u)" >> $DATELOG


# --- CHACHEABLE QUERIES ---
runScript cache_repos_activitycommits.py


echo "CACHE REQUEST COMPLETE"
