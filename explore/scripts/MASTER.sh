# Run this script to refresh all data for today


echo "RUNNING MASTER UPDATE SCRIPT"

# Log start time
date -I > ../github-data/LAST_MASTER_UPDATE.txt
echo "Start" >> ../github-data/LAST_MASTER_UPDATE.txt
date >> ../github-data/LAST_MASTER_UPDATE.txt


echo "Run - Cleanup Inputs"
# RUN THIS FIRST
python cleanup_inputs.py


# --- BASIC DATA ---

echo "Run - Get Repos Info"
# Required before any other repo scripts (output used as repo list)
python get_repos_info.py

echo "Run - Get LLNL Members"
# Required before any other member scripts (output used as member list)
python get_llnl_members.py


# --- EXTERNAL V INTERNAL ---

echo "Run - Get Members External Repos"
python get_members_extrepos.py

echo "Run - Get Repos External Users"
python get_repos_extusers.py


# --- ADDITIONAL REPO DETAILS ---

echo "Run - Get Repos Licenses"
python get_repos_licenses.py

echo "Run - Get Repos Languages"
python get_repos_languages.py

echo "Run - Get Repos Topics"
python get_repos_topics.py

echo "Run - Get Repos Pulls and Issues"
python get_repos_pullsissues.py

echo "Run - Get Repos Activity"
python get_repos_activity.py


# --- HISTORY FOR ALL TIME ---

echo "Run - Get Repos Creation History"
python get_repos_creationhistory.py


echo "Run - Build Year List"
# RUN THIS LAST, used in case of long term cumulative data
python build_yearlist.py


# Log end time
echo "End" >> ../github-data/LAST_MASTER_UPDATE.txt
date >> ../github-data/LAST_MASTER_UPDATE.txt

echo "MASTER UPDATE COMPLETE"
