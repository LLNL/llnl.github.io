# Run this script to refresh all data for today
echo "RUNNING MASTER UPDATE SCRIPT"
date -I > ../github-data/LAST_MASTER_UPDATE.txt
echo "Start" >> ../github-data/LAST_MASTER_UPDATE.txt
date >> ../github-data/LAST_MASTER_UPDATE.txt
echo "Run - Cleanup Inputs"
python cleanup_inputs.py
echo "Run - Get Org Repos"
python get_org_repos.py
echo "Run - Get Org Members"
python get_org_members.py
echo "Run - Get User Repos"
python get_user_repos.py # requires get_org_members.py output
echo "End" >> ../github-data/LAST_MASTER_UPDATE.txt
date >> ../github-data/LAST_MASTER_UPDATE.txt
echo "MASTER UPDATE COMPLETE"
