import os.path
import json

yearDict = {}

# Gather all file name data
print("Checking GitHub data file names with year stamps...")
for file in os.listdir("../github-data"):
	if file.endswith(".json"):
		nameSplit = file.split(".")
		# Must have format "somePrefix.0000.json"
		if not nameSplit[0] == "YEARS" and nameSplit[1].isdigit() :
			prefix = nameSplit[0]
			yearX = int(nameSplit[1])
			if not prefix in yearDict.keys():
				yearDict[prefix] = []
			yearDict[prefix].append(yearX)

print("Sorting year data...")
# Remove duplicate years (though shouldn't be possible) and sort list
for prefix in yearDict.keys():
	yearList = yearDict[prefix]
	yearList = list(set(yearList))
	yearList.sort()
	yearDict[prefix] = yearList

yearDataString = json.dumps(yearDict, indent=4, sort_keys=True)
datfilepath = "../github-data/YEARS.json"

# Write year list file
print("Writing file '%s'" %(datfilepath))
with open(datfilepath,"w") as fileout:
	fileout.write(yearDataString)
print("Wrote file!")

print("Done!\n")
