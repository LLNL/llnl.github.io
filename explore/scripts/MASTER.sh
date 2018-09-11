#!/bin/bash
# Wrapper to generate log file
unbuffer ./MASTER.sh.real 2>&1 | tee -i ../github-data/LAST_MASTER_UPDATE.log
