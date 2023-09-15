#!/bin/sh -l

set -eu

### VARIABLES ###

# From action env:
#   BOT_USER
#   BOT_TOKEN
#   DATA_REPO

ACT_LOG_PATH=_visualize/LAST_MASTER_UPDATE.txt
ACT_INPUT_PATH=_visualize
ACT_DATA_PATH=visualize/github-data
ACT_SCRIPT_PATH=_visualize/scripts

### SETUP ###

export GITHUB_API_TOKEN=$BOT_TOKEN

DATA_TIMESTAMP=$(date -u "+%F-%H")

# Configure git
git config --global user.name "${BOT_USER}"
git config --global user.email "${BOT_USER}@users.noreply.github.com"

# Store absolute path
cd $DATA_REPO
REPO_ROOT=$(pwd)

# Store previous END timestamp
OLD_END=$(cat $ACT_LOG_PATH | grep END | cut -f 2)
OLD_END=$(date --date="$OLD_END" "+%s")

### RUN MASTER SCRIPT ###

cd $REPO_ROOT/$ACT_SCRIPT_PATH
./MASTER.sh

### VALIDATE UPDATE ###

cd $REPO_ROOT

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
VALID_COUNT=$(git diff --name-only HEAD | grep -c -E "(^${ACT_DATA_PATH}\/\S+\.json$)|(^${ACT_INPUT_PATH}\/input\S+\.json$)|(${ACT_LOG_PATH})")
if [ "$CHANGE_COUNT" -ne "$VALID_COUNT" ]
    then
        echo "UPDATE FAILED - Unexpected file changes"
        exit 1
    else
        echo "Changed files validated"
fi

### COMMIT UPDATE ###
git stash
git pull --ff-only
git stash pop
git add -A .
git commit -m "${DATA_TIMESTAMP} Data Update by ${BOT_USER}"
git push

exit 0
