# Run this script to refresh all data for today
echo "RUNNING MASTER UPDATE SCRIPT"
python cleanup_inputs.py
python getdata.py
python get_org_members.py
python get_user_repos.py # requires get_org_members.py output
echo "MASTER UPDATE COMPLETE"
