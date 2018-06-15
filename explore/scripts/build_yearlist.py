from scraper.github import queryManager as qm
import os.path

yearDict = {}

# Gather all file name data
print("Checking GitHub data file names with year stamps...")
for file in os.listdir("../github-data"):
    if file.endswith(".json"):
        nameSplit = file.split(".")
        # Must have format "somePrefix.0000.json"
        if not nameSplit[0] == "YEARS" and nameSplit[1].isdigit():
            prefix = nameSplit[0]
            yearX = int(nameSplit[1])
            if prefix not in yearDict:
                yearDict[prefix] = []
            yearDict[prefix].append(yearX)

print("Sorting year data...")
# Remove duplicate years (though shouldn't be possible) and sort list
for prefix in yearDict.keys():
    yearList = yearDict[prefix]
    yearList = list(set(yearList))
    yearList.sort()
    yearDict[prefix] = yearList

yearData = qm.DataManager("../github-data/YEARS.json", False)
yearData.fileSave()

print("Done!\n")
