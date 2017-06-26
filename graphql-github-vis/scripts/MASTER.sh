# Run this script to refresh all data for today
echo "RUNNING MASTER UPDATE SCRIPT"
pushd /g/g0/weber42/software.llnl.gov-dev/graphql-github-vis/scripts
python cleanup_inputs.py
python getdata.py
python get_org_members.py
python get_user_repos.py # requires get_org_members.py output
popd
echo "MASTER UPDATE COMPLETE"
