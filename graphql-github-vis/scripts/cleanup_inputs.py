import os

# Take all input files, process, and write back to file

inputdir = "../inputs/"

print "Cleaning input list files..."

for file in os.listdir(inputdir) :
	print "    "+inputdir+file
	with open(inputdir+file) as filein:
		str_in = filein.read()
	listWIP = str_in.lower().split()	# Standardize as all lowercase
	listWIP = list(set(listWIP))		# Remove duplicates
	listWIP.sort()						# List in alphabetical order
	str_out = '\n'.join(listWIP)
	with open(inputdir+file,"w") as fileout:
		fileout.write(str_out)

print "Input lists cleaned!"
