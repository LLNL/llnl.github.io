import helpers
import json

# Take all input lists, process, and write back to file

fileIn = "../input_lists.json"

inputLists = helpers.read_json(fileIn)

print("Cleaning input lists...")

for aList in inputLists.keys() :
	print("    "+aList)
	# Standardize as all lowercase
	listWIP = [x.lower() for x in inputLists[aList]]
	listWIP = list(set(listWIP))		# Remove duplicates
	listWIP.sort()						# List in alphabetical order
	inputLists[aList] = listWIP

str_out = json.dumps(inputLists, indent=4, sort_keys=True)

with open(fileIn,"w") as fileout:
	fileout.write(str_out)

print("Input lists cleaned!")
