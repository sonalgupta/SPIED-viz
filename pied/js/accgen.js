function makeLists() {
      
	var listContainer = document.createElement("div");
	listContainer.className ="maindiv";
	document.getElementsByTagName("body")[0].appendChild(listContainer);
	var maxIterations = 1000;
	var maxEntities = 10000;
    readData(maxIterations, maxEntities);

    var thisSystemDiv = document.createElement("div");
	thisSystemDiv.className="accordionclass";
	thisSystemDiv.id="accordion1";
	listContainer.appendChild(thisSystemDiv);
    thisSystemDiv.setAttribute("data-source", words1ID);
    width="width:";
    if(compare){
        width = "width:400px;left:10px";
    }else
        width = "width:500px;left:300px";
    thisSystemDiv.setAttribute('style','top:0px;'+width);
    makelist(wordScores1, wordsList1Flat, wordsList2Flat, falseWords, thisSystemDiv, reasonWords1, reasonPats1, words1ID, words2ID, googlekeyword,
     posWords1, negWords1, unlabWords1, patScores1, patScores2, patScoresAllIter1   );
    
    
    var thisSystemDyDiv = document.createElement("div");
	thisSystemDyDiv.id="dycon1";
	thisSystemDyDiv.className="dynamic ui-accordion ui-widget ui-helper-reset";
	thisSystemDyDiv.setAttribute('style','top:-1000px;'+width);
    listContainer.appendChild(thisSystemDyDiv);
     
    //var stik = document.createElement("div");
	//stik.id="compareit";
    //stik.innerHTML= '<div id="rcomp"><img src="img/r.jpg" width="24"></div><div id="lcomp"><img src="img/l.png" width="24"></div>';
    //listContainer.appendChild(stik); 
     
    if(numSystems == 2){
        var thisSystemDiv2 = document.createElement("div");
        thisSystemDiv2.className="accordionclass";
        thisSystemDiv2.id="accordion2";
        thisSystemDiv2.setAttribute("data-source", words2ID);
        
        width = "width:400px;left:410px";
        
        thisSystemDiv2.setAttribute('style','top:0px;'+width);
        listContainer.appendChild(thisSystemDiv2);
        makelist(wordScores2, wordsList2Flat, wordsList1Flat, falseWords, thisSystemDiv2, reasonWords2, reasonPats2, words2ID, words1ID, googlekeyword,
        posWords2, negWords2, unlabWords2, patScores2, patScores1, patScoresAllIter2);

        
        var thisSystemDyDiv2 = document.createElement("div");
        thisSystemDyDiv2.id="dycon2";
        thisSystemDyDiv2.className="dynamic ui-accordion ui-widget ui-helper-reset";
        thisSystemDyDiv2.setAttribute('style','top:-1000px;'+width);
        listContainer.appendChild(thisSystemDyDiv2);
    }
}
	
function makelist(wordScores, thisListEntities, otherListEntities, falseWords, thisSystemDiv, reasonWords, reasonPats, 
    id, idOther, googlekeyword, posWords, negWords, unlabWords, patScores, otherPatScores, patScoresAllIter) {
	//### Begin Summary Node #####################
	//var listItemHeaderSummary = document.createElement("p");
	var listItemHeaderSummary = document.createElement("div");
	listItemHeaderSummary.className = "p";
    thisSystemDiv.appendChild(listItemHeaderSummary);
	listItemHeaderSummary.innerHTML = id + "&nbsp;Summary";
    listItemHeaderSummary.setAttribute("data-entity", "");
	
	var listItemDivSummary = document.createElement("div");
    thisSystemDiv.appendChild(listItemDivSummary);
    //var listItempSummary = document.createElement("p");        
    var listItempSummary = document.createElement("div");
    listItempSummary.className="p";
    listItemDivSummary.appendChild(listItempSummary);
	
	//### End Summary Node ######################

		
      var numIterations = wordScores.length;
      
      var numWord =0;
      var correctNum =0, incorrectNum =0, unknown =0;
      //for each iterationdata-ent
      for (var i = 0; i < numIterations; i++) {
        
        
        if (typeof wordScores[i] == 'undefined') {
          continue;
        }
       iterWordsScores = wordScores[i];
        // BEGIN ITERATION DIV ELEMENT
       //var listItemHeaderIter = document.createElement("p");
       var listItemHeaderIter = document.createElement("div");
       thisSystemDiv.appendChild(listItemHeaderIter);
	   listItemHeaderIter.innerHTML = "Iteration " + (i+1);
       listItemHeaderIter.className="p diviter";
       listItemHeaderIter.id=id+"iter_"+(i+1);
       listItemHeaderIter.setAttribute("data-entity","iter_"+(i+1));
       
       if(compare){
           var listItemCompareIter = document.createElement("span");
           listItemCompareIter.className = "compareit ui-icon ui-icon-transferthick-e-w";
           listItemCompareIter.setAttribute("data-entity","iter_"+(i+1));
           listItemHeaderIter.appendChild(listItemCompareIter)
        }

	
       var listItemDivIter = document.createElement("div");
       thisSystemDiv.appendChild(listItemDivIter);
       //var listItempIter = document.createElement("p");        
       var listItempIter = document.createElement("div");        
       listItemDivIter.appendChild(listItempIter);
       var iterText = iterWordsScores.length + " instances learned";
       var patScoresthisiter = patScoresAllIter[i];
       var patlistiter = document.createElement("ul");
       for(var j =0; j < patScoresthisiter.length; j++){
            pat = patScoresthisiter[j][0];
			//patscore = patScoresthisiter[j][1];
			createPatternListItem(patlistiter, pat, id, patScores, posWords[pat], negWords[pat], unlabWords[pat], thisListEntities, otherPatScores, otherListEntities);	
		}
    
       iterText +="<br>"+ patScoresthisiter.length + " patterns learned: " ;
       listItempIter.innerHTML = iterText;
       listItempIter.appendChild(patlistiter);
       listItempIter.className="hoverText";
       

       
      //END ITERATION DIV ELEMENT
      

      for(var j = 0 ; j < iterWordsScores.length; j++){
        numWord = numWord+1;

        var ph = iterWordsScores[j][0];
        
        var score = iterWordsScores[j][1];
        var hoverStr = "Score:&nbsp;"+ score.toFixed(2);
        
        //var listItemHeader = document.createElement("p");
        var listItemHeader = document.createElement("div");
        listItemHeader.className="p diviter";
        thisSystemDiv.appendChild(listItemHeader);
		listItemHeader.innerHTML = numWord +".&nbsp;" +  ph ;
		listItemHeader.id = id+ph.split(' ').join('_');
		listItemHeader.setAttribute("data-entity", ph.split(' ').join('_'));
        
        if(compare){
            var listItemCompare = document.createElement("span");
            listItemCompare.className = "compareit ui-icon ui-icon-transferthick-e-w"
            listItemCompare.setAttribute("data-entity", ph.split(' ').join('_'));
            listItemHeader.appendChild(listItemCompare)
        }
        var listItemDiv = document.createElement("div");
        
        //var listItemDivC = document.createElement("div");
        //var listItemDivD = document.createElement("div");
        //listItemDivC.className = "comlink";
        //listItemDivD.className = "patdetails";
        //listItemDivC.innerHTML = "Compare";
        //listItemDiv.appendChild(listItemDivC);
        //listItemDiv.appendChild(listItemDivD);
        thisSystemDiv.appendChild(listItemDiv);
        
        
        var otherListIndex = otherListEntities.indexOf(ph) + 1;
        
        var incorrectEntity = false, correctEntity = false;
        
        hoverStr += "<br>Oracle Label:";
        var phraseColor = "";
        var trueoracle= jQuery.inArray(ph, trueWords) >=0;
        var falseoracle = jQuery.inArray(ph, falseWords) >=0;
        
        if(falseoracle){
			hoverStr+="\tInCorrect";
			incorrectEntity = true;
			incorrectNum+=1;
			}
        else if(trueoracle){
			hoverStr+="\tCorrect";
			correctEntity = true;
			correctNum+=1;
        } else{
			hoverStr+="\tUnknown";
			unknown += 1;
        }
        
        hoverStr+="<br><span onclick=jump('"+(idOther+ph.split(' ').join('_'))+"')>Other System Rank:&nbsp;";
        if(compare){
            if(otherListIndex == 0){
                hoverStr+="Not Extracted";
                if(trueoracle){
                    var badgeEl = document.createElement('img')
                    badgeEl.setAttribute('src','img/badge.png')
                    badgeEl.setAttribute('width','15px');
                    badgeEl.setAttribute('style','padding:10px;');
                    listItemHeader.appendChild(badgeEl);
                }
                else if(falseoracle){
                    var badgeEl = document.createElement('img')
                    badgeEl.setAttribute('src','img/cross.png')
                    badgeEl.setAttribute('width','15px');
                    badgeEl.setAttribute('style','padding:10px;');
                    listItemHeader.appendChild(badgeEl);
                } else{
                    var badgeEl = document.createElement('img')
                    badgeEl.setAttribute('src','img/star.png')
                    badgeEl.setAttribute('width','10px');
                    badgeEl.setAttribute('style','padding:10px;');
                    listItemHeader.appendChild(badgeEl);
                }
            }
            else if(otherListIndex > numWord){
                hoverStr+=(otherListIndex-numWord) + " after";
                }
            else if(otherListIndex < numWord){			
                hoverStr+=(numWord) -otherListIndex + " before";
                }
            else{
                hoverStr+="Same Rank";
            }
        }
		hoverStr+="</span>";
        var phraseColor = getWordColor(thisListEntities.length, otherListEntities.length, otherListIndex, numWord, falseoracle, trueoracle);
        listItemHeader.style.color = phraseColor;
        
        
        hoverStr +="<br><a href= 'http://www.google.com/search?q="+ph+"+"+googlekeyword.split(' ').join('+')+"' target='_blank'>Search Google</a>";
        
        
        hoverStr += "<br/><br/>Patterns responsible:";
        var listItemp = document.createElement("p");        
        listItemDiv.appendChild(listItemp);
        listItemp.innerHTML = hoverStr;
        listItemp.className="hoverText";
                
        //#################START OF REASON ELEMENTS########################
        var reasonElement = document.createElement("p");
        listItemp.appendChild(reasonElement);
        var patlist = document.createElement("ul");
        
        var reasonPatsForPh = reasonPats[ph];
        
        if (typeof reasonPatsForPh == 'undefined') {
          continue;
        }
        
        for(var k = 0; k < reasonPatsForPh.length; k++){
                        
            var pat = reasonPatsForPh[k];
            
            createPatternListItem(patlist, pat, id+"-"+ph.split(' ').join('_'), patScores, posWords[pat], negWords[pat], unlabWords[pat], thisListEntities, otherPatScores, otherListEntities);	
        }
        
        reasonElement.appendChild(patlist);

        reasonElement.className = "contenton";
        reasonElement.id = id + ph.split(' ').join('_') + "-reason";

      
        //###################END OF REASON ELEMENTS#######################################
        
        
		
    }}
    
    var summaryText = "Number of entities extracted: " + numWord + "<br> ("+correctNum + " Correct, "+incorrectNum +" Incorrect, "+ unknown + " Unknown)";
    summaryText += "<br>Number of patterns learned: " + Object.keys(patScores).length;
    summaryText += "<br>Number of iterations: " + numIterations;
    listItempSummary.innerHTML = summaryText;
    listItempSummary.className="hoverText";
    
    
    }
        
    $(function() {
        
    makeLists();
    $( ".accordionclass" ).accordion({
	  event: "click hoverintent",
      heightStyle: "content"});
      


    $( ".litog" ).unbind('click');
    $( ".litog" ).bind("click",function(){
        $( this ).nextAll( "p:first" ).toggle();
        if ($( this ).nextAll( "p:first" ).is(":hidden")) {
            $( this ).nextAll( "div:first" ).hide();
        }
        else
        {
            $( this ).nextAll( "div:first" ).show();
        }
        });
      });
    

    $(function() {
        $(document).mouseup(function (e)
            {
                var container = $(".maindiv");
                
                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    $( ".accordionclass" ).css({"opacity":1}).show();
                    $( ".dynamic" ).empty();
                    $( ".dynamic" ).offset({top:-1000});
                    //$("#helptext").hide();

                }
            });



            
        $( ".compareit").bind("click",function(){
        var offst = $( "#" + $( this ).parent().parent().attr("data-source") + $( this ).attr("data-entity") ).offset();
        $( ".dynamic" ).html('');            
        if(!$( "#" + $( this ).parent().parent().attr("data-source") + $( this ).attr("data-entity") ).attr("data-entity")) {
            $( ".accordionclass" ).accordion('option','active',0).show();
            $( ".dynamic" ).empty();
            $( ".dynamic" ).offset({top:-1000});
        } 
        else if ($( "#" + $( this ).parent().parent().attr("data-source") + $( this ).attr("data-entity") ).attr("data-entity").indexOf("iter") == 0) {
            var dtentity = $( "#" + $( this ).parent().parent().attr("data-source") + $( this ).attr("data-entity") ).attr("data-entity");
            $( ".accordionclass").css({"opacity":0.1});
            $( ".accordionclass" ).each(function(index, element) {
                  $( "#dycon"+(index+1) ).offset({top : offst.top});
                  $( "#dycon"+(index+1) ).html('<div class="p diviter ui-accordion-header ui-helper-reset ui-state-default ui-accordion-i cons ui-corner-top">In '+$( this ).attr("data-source") + '<span class="closeit ui-icon ui-icon-close"></span></div>');
                  //$( "#dycon"+(index+1) ).append("<div>#"+ $( this ).attr("data-source")+ dtentity+"</div>");
                    $( "#"+ $( this ).attr("data-source")+dtentity).next().clone(true).css({"display":"block","overflow":"auto"}).appendTo( "#dycon"+(index+1) );
                    });   
            }
        else {
            var dtentity = $( "#" + $( this ).parent().parent().attr("data-source") + $( this ).attr("data-entity") ).attr("data-entity");
            $( ".accordionclass").css({"opacity":0.1});
            $( ".accordionclass" ).each(function(index, element) {
                $( "#dycon"+(index+1) ).offset({top : offst.top});
                $( "#dycon"+(index+1) ).html('<div class="p diviter ui-accordion-header ui-helper-reset ui-state-default ui-accordion-icons ui-corner-top">In '+$( this ).attr("data-source") + '<span class="closeit ui-icon ui-icon-close"></span></div>');
                if ($( "#"+ $( this ).attr("data-source")+dtentity).length === 0)
                {
                    $("#dycon"+(index+1)).append("Not Extracted!")
                }
                else {
                    $( "#"+ $( this ).attr("data-source")+dtentity).next().clone(true).css({"display":"block","overflow":"auto"}).appendTo( "#dycon"+(index+1) );
                }
            });   
        }

        //$( ".dynamic" ).css({"opacity":1}).show();
        //$( ".litog" ).trigger( "click" );
        $( ".closeit" ).on("click", function() {
                $( ".dynamic" ).empty();
                $( ".dynamic" ).offset({top:-1000});
                $( ".accordionclass" ).css({"opacity":1})
            });
    });
});




