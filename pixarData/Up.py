import re

with open ("/Users/Adam/Desktop/Up.txt", "r") as myfile:
    text = myfile.read()

#split on speaker session
conversation = []
conversation = [s.strip() for s in re.split("\n                              ",text)]
conversation2 = []
for i in conversation:
    if re.match('^[0-9]',i)==None and len(i) > 1:
        conversation2.append(i)

#get our character list
names = []
for element in conversation2:
    a = element.splitlines()[0]
    a = re.split("\(",a)[0].strip()
    names.append(a)

clean = []
#cleanup conversation
for element in conversation2:
    clean.append(re.split("\n\n",element)[0])

#strips and cleans the conversation pieces
cleanconv = []
for i in clean:
    a = "".join(i.split("\n")[1:len(i.split("\n"))])
    a = a.strip().replace("  "," ")
    a = a.replace("  "," ")
    a = a.replace("  "," ")
    a = a.replace("  "," ")
    a = a.replace("  "," ")
    cleanconv.append(a)

index = range(1,731)

up = [{'index':a,'name':b, 'quote':c} for a,b,c in zip(index, names, cleanconv)]
print up