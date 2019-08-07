from scraper.github import queryManager as qm

# Take all input lists, process, and write back to file

# Primary Inputs

inputLists = qm.DataManager("../input_lists.json", True)

print("Cleaning primary input lists...")

for aList in inputLists.data.keys():
    print("\t%s" % aList)
    listWIP = [x.lower() for x in inputLists.data[aList]]  # Standardize as all lowercase
    listWIP = list(set(listWIP))  # Remove duplicates
    listWIP.sort()  # List in alphabetical order
    inputLists.data[aList] = listWIP

inputLists.fileSave()

print("Primary input lists cleaned!")

# Secondary Inputs

subsetLists = qm.DataManager("../input_lists_subsets.json", True)

print("Cleaning input subset lists...")

for aSet in subsetLists.data.keys():
    print("\t%s" % aSet)
    for aList in subsetLists.data[aSet].keys():
        print("\t\t%s" % aList)
        listWIP = [x.lower() for x in subsetLists.data[aSet][aList]]  # Standardize as all lowercase
        listWIP = list(set(listWIP))  # Remove duplicates
        listWIP.sort()  # List in alphabetical order
        subsetLists.data[aSet][aList] = listWIP

subsetLists.fileSave()

print("Input subset lists cleaned!")
