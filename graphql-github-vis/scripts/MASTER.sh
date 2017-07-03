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
# requires output from get_org_members.py
python get_user_repos.py

echo "Run - Sort Repo Ownership"
# requires output from get_org_repos.py, get_user_repos.py
python sort_repo_ownership.py

echo "Run - Get Repos Mentionable Users"
# requires output from sort_repo_ownership.py
python get_repos_mentionableusers.py

echo "Run - Sort User Membership"
# requires output from get_repos_mentionableusers.py, get_user_repos.py
python sort_user_membership.py

echo "Run - Get Repos Languages"
# requires output from sort_repo_ownership.py
python get_repos_languages.py

echo "End" >> ../github-data/LAST_MASTER_UPDATE.txt
date >> ../github-data/LAST_MASTER_UPDATE.txt
echo "MASTER UPDATE COMPLETE"
