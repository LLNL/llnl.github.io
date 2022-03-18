from scraper.github import queryManager as qm

# Take all input lists, process, and write back to file

# Primary Inputs

inputLists = qm.DataManager("../input_lists.json", True)

print("Cleaning primary input lists...")

for aList in inputLists.data.keys():
    print("\t%s" % aList)
    listWIP = [
        x.lower() for x in inputLists.data[aList]
    ]  # Standardize as all lowercase
    listWIP = list(set(listWIP))  # Remove duplicates
    listWIP.sort()  # List in alphabetical order
    inputLists.data[aList] = listWIP

inputLists.fileSave(newline="\n")

print("Primary input lists cleaned!")
