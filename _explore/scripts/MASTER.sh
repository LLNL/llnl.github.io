#!/bin/bash
# Wrapper to generate log file
GITHUB_DATA=../../explore/github-data
unbuffer ./MASTER.sh.real 2>&1 | tee -i $GITHUB_DATA/LAST_MASTER_UPDATE.log
