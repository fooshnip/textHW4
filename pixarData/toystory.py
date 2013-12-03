'''
Created on Nov 30, 2013

@author: Riles
'''
import nltk
import re
from itertools import chain

with open ("toyStory.txt", "r") as myfile:
    text = myfile.read()


#split on speaker session
conversation = []
conversation = [s.strip() for s in re.split("\n                         ",text)]

#get our character list
names = []
for element in conversation:
    a = element.splitlines()[0]
    a = re.split("[\(#]",a)[0].strip()
    names.append(a)

clean = []
#cleanup conversation
for element in conversation:
    clean.append(re.split("\n\n",element)[0])

#strips and cleans the conversation pieces
cleanconv = []
for i in clean:
    a = "".join(i.split("\n")[1:len(i.split("\n"))])
    a = a.strip().replace("            "," ")
    cleanconv.append(a)
    
index = range(1,908)

toystory = [{'index':a,'name':b, 'quote':c} for a,b,c in zip(index, names, cleanconv)]
print toystory

unique_names = set(d['name'] for d in toystory)
print unique_names
#for value in unique_names:    
#    print value,"\n"," ".join([i['quote'] for i in toystory if i['name']==value])





