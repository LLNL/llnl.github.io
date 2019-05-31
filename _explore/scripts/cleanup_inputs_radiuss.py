from scraper.github import queryManager as qm

# Take all input lists, process, and write back to file

inputLists = qm.DataManager("../input_lists_radiuss.json", True)

print("Cleaning radiuss input lists...")

for aList in inputLists.data.keys():
    print("\t%s" % aList)
    # Standardize as all lowercase
    listWIP = [x.lower() for x in inputLists.data[aList]]
    listWIP = list(set(listWIP))        # Remove duplicates
    listWIP.sort()                      # List in alphabetical order
    inputLists.data[aList] = listWIP

inputLists.fileSave()

print("Input lists cleaned!")
