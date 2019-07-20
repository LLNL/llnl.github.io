#!/bin/sh -l

set -eu
. /opt/venv/bin/activate

# Get latest copy of repository
git config --global user.email $GIT_EMAIL
git config --global user.name $GIT_NAME
git clone --depth 1 https://github.com/LLNL/llnl.github.io.git
cd llnl.github.io
REPO_ROOT=$(pwd)

# Checkout new branch
git checkout $DATA_BRANCHNAME || git checkout -b $DATA_BRANCHNAME
git merge --ff-only master

# Run MASTER script
cd $REPO_ROOT/_explore/scripts
./MASTER.sh

# Commit update
cd $REPO_ROOT
TODAY_STAMP=$(date "+%Y-%m-%d")
git add -A .
git commit -m "$TODAY_STAMP Auto Data Update"

# Push update
# git push --set-upstream origin $DATA_BRANCHNAME
