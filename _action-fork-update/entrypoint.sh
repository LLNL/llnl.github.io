#!/bin/sh -l

set -eu
. /opt/venv/bin/activate

# Check hub installation
hub version

# Requires BOT_USER, BOT_TOKEN to be included by workflow
export GITHUB_API_TOKEN=$BOT_TOKEN

ACT_LOG_PATH=_explore/LAST_MASTER_UPDATE.txt
ACT_DATA_PATH=explore/github-data

DATA_TIMESTAMP=$(date -u "+%F-%H")
CLONE_CUTOFF=$(date -u "+%F" -d "7 days ago")

# Configure git + hub
git config --global user.name "${BOT_USER}"
git config --global user.email "${BOT_USER}@users.noreply.github.com"
git config --global hub.protocol https

# Get latest copy of repository
git clone --shallow-since=$CLONE_CUTOFF --no-single-branch "https://${BOT_USER}:${BOT_TOKEN}@github.com/${BOT_USER}/llnl.github.io.git"
cd llnl.github.io
REPO_ROOT=$(pwd)

# Link and update fork
git checkout master
git remote add upstream "https://${BOT_USER}:${BOT_TOKEN}@github.com/LLNL/llnl.github.io.git"
git fetch upstream
git merge --no-edit upstream/master

# Store previous END timestamp
OLD_END=$(cat $ACT_LOG_PATH | grep END | cut -f 2)
OLD_END=$(date --date="$OLD_END" "+%s")

# Run MASTER script
cd $REPO_ROOT/_explore/scripts
./MASTER.sh
cd $REPO_ROOT
git add -A .

### VALIDATE UPDATE ###

#   Timestamp log changed
cat $ACT_LOG_PATH
if [ $(git diff --name-only HEAD | grep -c "${ACT_LOG_PATH}") -ne "1" ]
    then
        echo "UPDATE FAILED - Timestamp log unchanged"
        exit 1
    else
        echo "Timestamp log confirmed"
fi

#   Logged START and END without FAILED
if [ $(cat $ACT_LOG_PATH | grep -c FAILED) -ne "0" ] || [ $(cat $ACT_LOG_PATH | grep -c START) -ne "1" ] || [ $(cat $ACT_LOG_PATH | grep -c END) -ne "1" ]
    then
        echo "UPDATE FAILED - Invalid timestamp log"
        exit 1
    else
        echo "Timestamp log valid"
fi

#   New START is later than previous END
NEW_START=$(cat $ACT_LOG_PATH | grep START | cut -f 2)
NEW_START=$(date --date="$NEW_START" "+%s")
if [ "$OLD_END" -gt "$NEW_START" ]
    then
        echo "UPDATE FAILED - New START is earlier than previous END"
        exit 1
    else
        echo "START timestamp valid"
fi

#   All changes are to valid files only
git diff --name-only HEAD
CHANGE_COUNT=$(git diff --name-only HEAD | grep -c -E ".+")
VALID_COUNT=$(git diff --name-only HEAD | grep -c -E "(^${ACT_DATA_PATH}\/\S+\.json$)|(${ACT_LOG_PATH})")
if [ "$CHANGE_COUNT" -ne "$VALID_COUNT" ]
    then
        echo "UPDATE FAILED - Unexpected file changes"
        exit 1
    else
        echo "Changed files validated"
fi

### COMMIT UPDATE ###
git pull
git commit -m "${DATA_TIMESTAMP} Data Update by ${BOT_USER}"
# git push origin master

### SEND UPDATE UPSTREAM ###
git checkout -b data-update-${DATA_TIMESTAMP} upstream/master
git cherry-pick master
git push upstream data-update-${DATA_TIMESTAMP}/master

# Create pull request, or list existing
# hub pull-request --no-edit --message "Data Update by ${BOT_USER}" || hub pr list --state open --head $BRANCH_NAME

exit 0
