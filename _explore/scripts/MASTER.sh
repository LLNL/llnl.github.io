#!/bin/bash
# Run this script to refresh all data for today

exec &> >(tee ../LAST_MASTER_UPDATE.log)

export GITHUB_DATA=../../explore/github-data
DATELOG=../LAST_MASTER_UPDATE.txt

# On exit
function finish {
    # Log end time
    echo -e "END\t$(date)" >> $DATELOG
}
trap finish EXIT

# Stop and Log for failed scripts
function errorCheck() {
    if [ $ret -ne 0 ]; then
        echo "FAILED - $1"
        echo -e "FAILED\t$1" >> $DATELOG
        exit
    fi
}

# Basic script run procedure
function runScript() {
    echo "Run - $1"
    python -u $1
    ret=$?
    errorCheck "$1"
}


echo "RUNNING MASTER UPDATE SCRIPT"

# Log start time
echo -e "$(date '+%Y-%m-%d')" > $DATELOG
echo -e "START\t$(date)" >> $DATELOG


# RUN THIS FIRST
runScript cleanup_inputs.py


# --- BASIC DATA ---
# Required before any other repo scripts (output used as repo list)
runScript get_repos_info.py
# Required before any other member scripts (output used as member list)
runScript get_llnl_members.py


# --- EXTERNAL V INTERNAL ---
runScript get_members_extrepos.py
runScript get_repos_users.py


# --- ADDITIONAL REPO DETAILS ---
runScript get_repos_licenses.py
runScript get_repos_languages.py
runScript get_repos_topics.py
runScript get_repos_pullsissues.py
runScript get_repos_activity.py


# --- HISTORY FOR ALL TIME ---
runScript get_repos_creationhistory.py


# RUN THIS LAST
runScript build_subsets.py   # List subsets of repos included in data
runScript build_yearlist.py  # Used in case of long term cumulative data

runScript gather_repo_metadata.py  # Generate simplified metadata file


echo "MASTER UPDATE COMPLETE"
