#!/bin/bash
printf "\nDownloading Stanford CoreNLP\n"
wget http://nlp.stanford.edu/software/stanford-corenlp-full-2014-06-16.zip
printf "\nUnzipping it\n"
#unzip it
unzip stanford-corenlp-full-2014-06-16.zip
printf "\nCopying jar files to lib\n"
#copy the jar files
cp stanford-corenlp-full-2014-06-16/*.jar lib/
printf "\nRemoving the downloaded files\n"
#remove the zip file
rm stanford-corenlp-full-2014-06-16.zip 
#remove this line if you want to save the download
rm -rf stanford-corenlp-full-2014-06-16
printf "\nDone setting up. Try running demo.sh."
