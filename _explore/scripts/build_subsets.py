from scraper.github import queryManager as qm
from os import environ as env

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/labReposSubsets.json" % ghDataDir

# Read repo info data file (to use as repo list)
inputLists = qm.DataManager("%s/labReposInfo.json" % ghDataDir, True)
# Populate repo list
repolist = []
print("Getting internal repos...")
repolist = sorted(inputLists.data["data"].keys())
print("Repo list complete. Found %d repos." % (len(repolist)))

# Read subset input lists of orgs and repos
subsetLists = qm.DataManager("../input_lists_subsets.json", True)
myTags = sorted(subsetLists.data.keys())

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}


# Helper function - test if matches org only
def matchOrg(orgName, repoName):
    # TODO
    orgName = orgName.lower()
    repoName = repoName.lower()
    if orgName == repoName.split("/")[0]:
        return True
    else:
        return False


# Helper function - test if matches full 'org/repo' name
def matchRepo(repoName1, repoName2):
    # TODO
    repoName1 = repoName1.lower()
    repoName2 = repoName2.lower()
    if repoName1 == repoName2:
        return True
    else:
        return False


# Iterate through subset tags
print("Building repo subset lists...")
for tag in myTags:
    print("\n'%s'" % (tag))
    sub_orglist = subsetLists.data[tag]["orgs"]
    sub_repolist = subsetLists.data[tag]["repos"]

    # Initialize list
    subset = set()

    print("Match orgs...")
    for org in sub_orglist:
        print("\t%s" % org)
        matched_orgs = list(filter(lambda x: matchOrg(org, x), repolist))
        print("\t  > ", end="")
        print("match %s" % len(matched_orgs) if (len(matched_orgs) > 0) else "NO MATCH")
        subset.update(matched_orgs)

    print("Match repos...")
    for repo in sub_repolist:
        print("\t%s" % repo)
        matched_repos = list(filter(lambda x: matchRepo(repo, x), repolist))
        print("\t  > ", end="")
        print(
            "match %s" % len(matched_repos) if (len(matched_repos) > 0) else "NO MATCH"
        )
        subset.update(matched_repos)

    # Update collective data
    dataCollector.data["data"][tag] = sorted(subset)

    print("'%s' Done!" % (tag))

print("\nSubset lists complete!")

# Write output file
dataCollector.fileSave()

print("\nDone!\n")
