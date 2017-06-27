# Run this script to refresh all data for today
echo "RUNNING MASTER UPDATE SCRIPT"
python cleanup_inputs.py
python getdata_singlefile.py
python get_org_members_singlefile.py
python get_user_repos_singlefile.py # requires get_org_members_singlefile.py output
echo "MASTER UPDATE COMPLETE"
