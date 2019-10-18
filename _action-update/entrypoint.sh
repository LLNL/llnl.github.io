#!/bin/sh -l

set -eu
. /opt/venv/bin/activate

# Check hub installation
hub version

# Requires BRANCH_NAME, BOT_USER, BOT_TOKEN, GITHUB_TOKEN to be included by workflow
export GITHUB_API_TOKEN=$BOT_TOKEN

ACT_LOG_PATH=_explore/LAST_MASTER_UPDATE.txt
ACT_DATA_PATH=explore/github-data

DATA_TIMESTAMP=$(date -u "+%F-%H")
CLONE_CUTOFF=$(date -u "+%F" -d "3 days ago")

# Configure git + hub
git config --global user.name "${BOT_USER}"
git config --global user.email "${BOT_USER}@users.noreply.github.com"
git config --global hub.protocol https

# Get latest copy of repository
git clone --shallow-since=$CLONE_CUTOFF --no-single-branch "https://${BOT_USER}:${GITHUB_TOKEN}@github.com/LLNL/llnl.github.io.git"
cd llnl.github.io
REPO_ROOT=$(pwd)

# Checkout data update branch, creating new if necessary
git checkout $BRANCH_NAME || git checkout -b $BRANCH_NAME
git merge --no-edit master

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
git commit -m "${DATA_TIMESTAMP} Data Update by ${BOT_USER}"
git push origin $BRANCH_NAME

exit 0
