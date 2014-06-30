#Run first system with NER restriction on the target phrase
java -cp $CLASSPATH:lib/* edu.stanford.nlp.patterns.surface.GetPatternsFromDataMultiClass -props properties/example.properties -identifier UsingNERTargetRest                 -useTargetNERRestriction true

#Run second system without using the NER restriction
java -cp $CLASSPATH:lib/* edu.stanford.nlp.patterns.surface.GetPatternsFromDataMultiClass -props properties/example.properties -identifier NotUsingNERTargetRest -useTargetNERRestriction false

#Visualize the results for the entity type NAME and PLACE
#python pied/prepareData.py --labels NAME,PLACE  --sys1dir out/UsingNERTargetRest --sys2dir out/NotUsingNERTargetRest --google "USA president"

python pied/prepareData.py --labels NAME,PLACE --labeledfiles data/goldnames.txt,data/goldplaces.txt  --sys1dir out/UsingNERTargetRest --sys2dir out/NotUsingNERTargetRest --google "USA president"

#Change to whatever command you use to open the html file
open pied/index.html
open pied/patterns.html


#Use the following command to view just one label
#python pied/prepareData.py --label PLACE --sys1dir out/UsingNERTargetRest --sys2dir out/NotUsingNERTargetRest --labeledfile data/goldplaces.txt --google "USA president"

#Use the following command to view just one system
#python pied/prepareData.py --label NAME --sys1dir out/UsingNERTargetRest  --labeledfile data/labels_name.txt --google "USA president"

