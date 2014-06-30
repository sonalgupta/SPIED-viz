#!/usr/bin/python

import os;
import sys;

# use python convertLabeledToVar <the txt file> <outfile> (outfile shd be in "pied/js/currentViz/labeled.js")
def convert(infile):
  str = "";
  with open (infile, "r") as myfile:
    content = myfile.readlines()
    i = 0;
    for c in content:
      c = c.replace("\n","");
      c = c.replace("'","<Q>");
      if i == 0: 
        str = "'"+c+"'";
      else:
        str = str + ",'"+c+"'";
      i = i+1;

  str = "var labeledWords  =["+str+"]"
  return str;
  #with open (outfile,"w") as myfile:
  #        myfile.write(str);

#convert(sys.argv[1])
