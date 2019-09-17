#!/bin/sh -l

set -eu
. /opt/venv/bin/activate

# Check hub installation
hub version

# Requires BRANCH_NAME, BOT_USER, BOT_TOKEN, GITHUB_TOKEN to be included by workflow
export GITHUB_API_TOKEN=$BOT_TOKEN

DATA_TIMESTAMP=$(date "+%Y-%m-%d-%H")
CLONE_CUTOFF=$(date "+%Y-%m-%d" -d "7 days ago")

# Configure git + hub
git config --global user.name "${BOT_USER}"
git config --global user.email "${BOT_USER}@users.noreply.github.com"
git config --global hub.protocol https

# Get latest copy of repository
git clone --shallow-since=$CLONE_CUTOFF --no-single-branch "https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/LLNL/llnl.github.io.git"
cd llnl.github.io
REPO_ROOT=$(pwd)

# Checkout data update branch, creating new if necessary
git checkout $BRANCH_NAME || git checkout -b $BRANCH_NAME
git merge --ff-only master

# Run MASTER script
cd $REPO_ROOT/_explore/scripts
./MASTER.sh

# Commit update
cd $REPO_ROOT
git add -A .
git commit -m "${DATA_TIMESTAMP} Data Update by ${BOT_USER}"

# Push update
git push origin $BRANCH_NAME

# Create pull request, or list existing
hub pull-request --no-edit --message "Data Update by ${BOT_USER}" || hub pr list --state open --head $BRANCH_NAME
