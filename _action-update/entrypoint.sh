#!/bin/sh -l

set -eu
. /opt/venv/bin/activate

# Check hub installation
hub version

# Requires BOT_TOKEN, BRANCH_PREFIX, GIT_USER, GIT_EMAIL, GIT_NAME to be included by workflow
export GITHUB_USER=$GIT_USER
export GITHUB_API_TOKEN=$BOT_TOKEN
DATA_TIMESTAMP=$(date "+%Y-%m-%d-%H")
DATA_BRANCHNAME=$BRANCH_PREFIX$DATA_TIMESTAMP

# Get latest copy of repository
git config --global user.email "$GIT_EMAIL"
git config --global user.name "$GIT_NAME"
git clone --depth 2 https://github.com/LLNL/llnl.github.io.git
cd llnl.github.io
REPO_ROOT=$(pwd)

# Checkout new branch
git checkout -b $DATA_BRANCHNAME

# Run MASTER script
cd $REPO_ROOT/_explore/scripts
./MASTER.sh

# Commit update
cd $REPO_ROOT
git add -A .
git commit -m "$DATA_TIMESTAMP Data Update (via bot)"

# Push update
git push --set-upstream origin $DATA_BRANCHNAME

# Create pull request
hub pull-request --no-edit
