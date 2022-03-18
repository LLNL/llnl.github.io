from scraper.github import queryManager as qm
from os import environ as env
import re

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/intRepos_CreationHistory.json" % ghDataDir
query_commits_in = "/repos/OWNNAME/REPONAME/commits?until=CREATETIME&per_page=100"
query_commits_in2 = "/repos/OWNNAME/REPONAME/commits?per_page=100"

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/intReposInfo.json" % ghDataDir, True)
# Populate repo list
repolist = []
print("Getting internal repos ...")
repolist = sorted(inputLists.data["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
try:
    # Load existing data
    dataCollector.fileLoad()
except FileNotFoundError:
    # If no existing data, initialize the data object
    dataCollector.data = {"data": {}}

# Initialize query manager
queryMan = qm.GitHubQueryManager()

# Iterate through internal repos
print("Gathering data across multiple paginated queries...")
for repo in repolist:
    print("\n'%s'" % (repo))

    # History doesn't change, only update new repos or those that had no previous commits
    if "data" in dataCollector.data.keys() and repo in dataCollector.data["data"]:
        if dataCollector.data["data"][repo]["firstCommitAt"]:
            print("Already recorded data for '%s'" % (repo))
            continue

    repoData = {}  # Collect data from multiple queries for a single repo first
    r = repo.split("/")

    # Copy creation date from main info file
    print("Part 1)  Get creation date...")
    repoData = {"createdAt": inputLists.data["data"][repo]["createdAt"]}

    # Query
    print("Part 2)  Get pre-GitHub commit timestamps...")

    gitquery2 = re.sub("OWNNAME", r[0], query_commits_in)
    gitquery2 = re.sub("REPONAME", r[1], gitquery2)
    gitquery2 = re.sub("CREATETIME", repoData["createdAt"], gitquery2)

    try:
        outObj2 = queryMan.queryGitHub(gitquery2, rest=True, paginate=True)
    except Exception as error:
        print("Could not complete '%s'" % (repo))
        print(error)

    # Update repo data
    repoData["commitTimestamps"] = []
    try:
        for commit in outObj2:
            repoData["commitTimestamps"].append(commit["commit"]["committer"]["date"])
    except NameError:
        print("Could not get pre-GitHub commits for '%s'" % (repo))

    # If no pre-GitHub commits, check the greater commit history
    if len(repoData["commitTimestamps"]) > 0 and repoData["commitTimestamps"][0]:
        repoData["initBeforeGitHubRepo"] = True
    else:
        repoData["initBeforeGitHubRepo"] = False

        # Query 3
        print("Part 3)  No pre-GitHub commits found, getting full history...")

        gitquery3 = re.sub("OWNNAME", r[0], query_commits_in2)
        gitquery3 = re.sub("REPONAME", r[1], gitquery3)

        try:
            outObj3 = queryMan.queryGitHub(gitquery3, rest=True, paginate=True)
        except Exception as error:
            print("Warning: Could not complete '%s'" % (repo))
            print(error)

        # Update repo data
        try:
            for commit in outObj3:
                repoData["commitTimestamps"].append(
                    commit["commit"]["committer"]["date"]
                )
        except NameError:
            print("Could not get any commits for '%s'." % (repo))
            continue

    # Sort dates
    repoData["commitTimestamps"].sort()
    # Save earliest commit date
    firstdate = None
    if len(repoData["commitTimestamps"]) > 0:
        firstdate = repoData["commitTimestamps"][0]
    repoData["firstCommitAt"] = firstdate
    # Delete commit timestamp data (only needed to find first commit)
    del repoData["commitTimestamps"]

    # Update collective data
    dataCollector.data["data"][repo] = repoData

    print("'%s' Done!" % (repo))

print("\nCollective data gathering complete!")

# Remove any data for repos no longer in the list
print("Deleting unwanted data (from unlisted repos)...")
for repo in list(dataCollector.data["data"].keys()):
    if repo not in repolist:
        dataCollector.data["data"].pop(repo, None)
        print("Removed '%s'" % (repo))

# Write output file
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
