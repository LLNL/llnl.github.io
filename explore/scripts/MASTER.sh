#!/bin/bash
# Wrapper to generate log file
unbuffer ./MASTER.sh.real |& tee -i ../github-data/LAST_MASTER_UPDATE.log
