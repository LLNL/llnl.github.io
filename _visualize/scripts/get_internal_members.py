from scraper.github import queryManager as qm
from os import environ as env

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/intUsers.json" % ghDataDir
queryPath = "../queries/org-Members.gql"

# Read input list of member organizations
inputLists = qm.DataManager("../input_lists.json", True)
orglist = inputLists.data["memberOrgs"]

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}

# Initialize query manager
queryMan = qm.GitHubQueryManager()

# Iterate through orgs of interest
print("Gathering data across multiple paginated queries...")
for org in orglist:
    print("\n'%s'" % (org))

    try:
        outObj = queryMan.queryGitHubFromFile(
            queryPath,
            {"orgName": org, "numUsers": 50, "pgCursor": None},
            paginate=True,
            cursorVar="pgCursor",
            keysToList=["data", "organization", "membersWithRole", "nodes"],
        )
    except Exception as error:
        print("Warning: Could not complete '%s'" % (org))
        print(error)
        continue

    # Update collective data
    for user in outObj["data"]["organization"]["membersWithRole"]["nodes"]:
        userKey = user["login"]
        dataCollector.data["data"][userKey] = user

    print("'%s' Done!" % (org))

print("\nCollective data gathering complete!")

# Write output file
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
