SPIED-viz
=========

Stanford Pattern-based Information Extraction and Diagnostics -- Visualization. The code is for visualizing output of pattern-based entity learning systems. See http://nlp.stanford.edu/software/patternslearning.shtml for one such system.

DOCUMENTATION

CONFIGURATION and INSTALLATION:
Input to visualization: The easiest way is to run our pattern/entity learning code and then run this. 
**see demo.sh for an example.**
    
    If you want to use some other entity learning system:
    
            The input files should be in the JSON format and should have following format:
            
            For a system sys1 and a label label1, you should have following files:
            
            sys1/label1/patterns.json and sys1/label1/words.json
            
            words.json has list of iterations, each iteration has list of maps, each map has the "entity", "score", and the "patterns"
            that extracted the entity. "reasonwords" are the positive words of the patterns that extracted the entity (it is supposed to show 
            because of what entities the current entity was extracted).
            
            patterns.json has list of iterations and each iteration is a map where keys are patterns learned in that iteration and
            values are maps of positive, negative, and unlabeled entities that the pattern extracts and the pattern score.
            
            For example, see the files inside directory out/UsingNERTargetRest 
    
    Run "python pied/prepareData.py -h" to know to run the file to prepare the data for the visualization
    
    

Output: open pied/index.html for entity-centric view and pied/patterns.html for pattern-centric view.


CITATION

Please cite the following paper if you use SPIED-Viz in your work:

@inproceedings{gupta:vizacl14,
author={Sonal Gupta and Christopher D. Manning},
booktitle={Proceedings of the ACL 2014 Workshop on Interactive Language Learning, Visualization, and Interfaces (ACL-ILLVI)},
title={SPIED: Stanford Pattern-based Information Extraction and Diagnostics},
year ={2014}
}

Please cite the following paper if you also use the learning part of SPIED (http://nlp.stanford.edu/software/patternslearning.shtml).

@inproceedings{gupta14evalpatterns,
author = {Sonal Gupta and Christopher D. Manning},
booktitle = {Proceedings of the Eighteenth Conference on Computational Natural Language Learning (CoNLL)},
title = {Improved Pattern Learning for Bootstrapped Entity Extraction},
year = {2014},
}


