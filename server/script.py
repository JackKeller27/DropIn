
file1 = open('req2.txt', 'w')

file2 = open('requirements.txt', 'r')
Lines2 = file2.readlines()

for line in Lines2:
    file1.write(line.split('@')[0])
    file1.write('\n')