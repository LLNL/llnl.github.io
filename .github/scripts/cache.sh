#!/bin/sh -l

set -eu

### VARIABLES ###

# From action env:
#   BOT_TOKEN
#   DATA_REPO

ACT_SCRIPT_PATH=_visualize/scripts

### SETUP ###

export GITHUB_API_TOKEN=$BOT_TOKEN

DATA_TIMESTAMP=$(date -u "+%F-%H")

# Store absolute path
cd $DATA_REPO
REPO_ROOT=$(pwd)

### RUN CACHE SCRIPT ###

cd $REPO_ROOT/$ACT_SCRIPT_PATH
./CACHE.sh

exit 0
