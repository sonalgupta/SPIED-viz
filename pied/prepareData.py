#!/usr/bin/python

#how to run: python prepareData.py -h
import os;
import sys;
import shutil;
import convertLabeledToVar
import argparse
import getopt
import ntpath
import tempfile



sys1dir = '';
sys2dir= '';
sys1name ='';
sys2name = '';
outputfile = ''
googlekeywords ='';
labeledfile = '';
labeledfiles = [];
helpstr = 'Usage: test.py --labels (label names separated by comma) --labeledfiles (optional files with labeled list of phrases, separared by comma in same order as labels) --sys1dir (output directory of one system) --sys1name (identifier for first system) --sys2dir (optional, same as sys1dir) --sys2name (optional, same as sys1name) --google (optional, keyword to search on google)' ;
try:
  opts, args = getopt.getopt(sys.argv[1:],"-h",["labeledfiles=","sys1dir=","sys2dir=","labeled2=","google=","sys1name=","sys2name=","labels="])
except getopt.GetoptError:
  print helpstr
  sys.exit(2)
for opt, arg in opts:
   if opt == '-h':
       print helpstr
       sys.exit()
   elif opt in ("--sys1dir"):
       sys1dir = arg
   elif opt in ("--sys2dir"):
       sys2dir = arg
   elif opt in ("--sys1name"):
       sys1name = arg
   elif opt in ("--sys2name"):
       sys2name = arg;
   elif opt in ("--labels"):
       labels = arg.split(',');
   elif opt in ("--google"):
       googlekeywords = arg
   elif opt in ("--labeledfiles"):
        labeledfiles = arg.split(',');

outfilelabels = "pied/js/currentViz/labels.js";
with open (outfilelabels,"w") as f:
    f.write("var labels=['"+("','".join(labels))+"'];");
    
for index, label in enumerate(labels):
    
    if(len(labeledfiles) == 0):
        templabelfile = tempfile.NamedTemporaryFile();
        labeledfile = templabelfile.name;
    else:
        labeledfile = labeledfiles[index];    
    
    
    outindexfile="pied/labelhtmlfiles/index_"+label+".html";
    outpatternfile="pied/labelhtmlfiles/patterns_"+label+".html";
    outfilename="pied/js/currentViz/data_"+label+".js"
    
    if(len(sys1name) == 0):
        head, tail = ntpath.split(sys1dir)
        sys1name = tail or ntpath.basename(head);
        


    with open(sys1dir+"/" + label+"/words.json", 'r') as content_file:
        content = content_file.read();
       
    content = "var reasons1=[" + content + "]";

    with open (outfilename,"w") as f:
        
        f.write(content+"\n");
        f.write("var words1ID='" + sys1name + "';\n");
        f.write("var googlekeyword='" + googlekeywords+"'\n");

    with open(sys1dir+"/" + label+"/patterns.json", 'r') as content_file:
        content = content_file.read();
       
    content = "var patterns1=" + content;
    with open(outfilename,"a") as f:
      f.write(content+"\n");
      
    numsys = 1;

    if(len(sys2dir) > 0) :	
        if(len(sys2name) == 0):
            head, tail = ntpath.split(sys2dir)
            sys2name = tail or ntpath.basename(head);
        
        numsys = 2;
        with open(sys2dir+"/" + label+"/words.json", 'r') as content_file:
            content = content_file.read();
           
           

        content = "var reasons2=[" + content + "]";

        with open (outfilename,"a") as f:
            f.write(content+"\n");
            f.write("var words2ID='" + sys2name + "';\n");


        with open(sys2dir+"/" + label+"/patterns.json", 'r') as content_file:
            content = content_file.read();
           
        content = "var patterns2=" + content;
        with open(outfilename,"a") as f:
          f.write(content+"\n");
          #f.write("var id2='" + sys.argv[4] + "'\n");


       

    labeledstr = convertLabeledToVar.convert(labeledfile);

    with open (outfilename,"a") as f:
        f.write("var numSystems = "+str(numsys)+"\n");
        f.write(labeledstr+"\n");


        

    str1 = "<html>\n<head>\n <script src='../js/currentViz/data_"+label+".js'></script>\n<script src='../js/util.js'></script>\n<script type='text/javascript' src='../js/jquery-1.9.1.js'></script>\n<script type='text/javascript' src='../js/jquery-ui.js'></script>";
    str2 = "<script type='text/javascript' src='../js/jquery.sticky.js'></script>\n<link rel='stylesheet' href='../js/jquery-ui.css'>";
    str3= "<link rel='stylesheet' href='../js/pied.css'>\n<script src='../js/commonjsfunctions.js'></script>\n</head>\n";
    strbodyentity = "<body>\n<script type='text/javascript' src='../js/accgen.js'></script>\n</body>\n</html>";
    strbodypatterns = "<body>\n<script type='text/javascript' src='../js/accordion-lists.js'></script>\n</body>\n</html>";

    with open(outindexfile,"w") as f:
        f.write(str1+"\n"+str2+"\n"+str3+"\n"+strbodyentity);
    
    with open(outpatternfile,"w") as f:
        f.write(str1+"\n"+str2+"\n"+str3+"\n"+strbodypatterns);

    #with open(sys.argv[1]+"/tokensmatchedpatterns.json", 'r') as content_file:
    #    content = content_file.read();
    #content = "var matchedTokens1=" + content;
    #with open("pied/js/currentViz/matchedTokens1.js","w") as f:
    #  f.write(content+"\n");
      
    #with open(sys.argv[4]+"/tokensmatchedpatterns.json", 'r') as content_file:
    #    content = content_file.read(); 
    #content = "var matchedTokens2=" + content;
    #with open("pied/js/currentViz/matchedTokens2.js","w") as f:
    #  f.write(content+"\n");
      

    #sys1sent=sys.argv[1][:sys.argv[1].rfind("/")]+"/sentences.json"
    #with open(sys1sent, 'r') as content_file:
    #    content = content_file.read();
    #content = "var sentences1=" + content;
    #with open("pied/js/currentViz/sentences1.js","w") as f:
    #  f.write(content+"\n");
      
    #sys2sent=sys.argv[4][:sys.argv[4].rfind("/")]+"/sentences.json"
    #with open(sys2sent, 'r') as content_file:
    #    content = content_file.read(); 
    #content = "var sentences2=" + content;
    #with open("pied/js/currentViz/sentences2.js","w") as f:
    #  f.write(content+"\n");
