var falseWords;
var trueWords;

var wordScores1 = [], reasonWords1 = [], reasonPats1 =[], wordScores2 =[], reasonWords2=[], reasonPats2=[];
var posWords1 = [], negWords1 =[], unlabWords1 = [], posWords2 =[], negWords2 =[], unlabWords2=[], wordsList1Flat =[], wordsList2Flat=[];
var patScores1 = {}, patScores2={};
var words2ID;
var patScoresAllIter1=[], patScoresAllIter2=[];
var rainbowcorrect, rainbowfalse;
var matchedTokens1, matchedTokens2;
var sentTokens1, sentTokens2;
var compare = false;

function toggle_visibility(a) {
    console.log("toggling");
		var b = document.getElementById(a);
		b.style.display == "block" ? b.style.display = "none" : b.style.display = "block";
};

function jump(h){
    var url = location.href;
    location.href = "#"+h;
    // history.replaceState(null,null,url)
}
	
function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

function getFlatListFromScores(wordScores){
	var wordsListFlat = [];
	for(var i = 0; i < wordScores.length; i++){

        for(var j = 0; j < wordScores[i].length; j++){
        wordsListFlat = wordsListFlat.concat(wordScores[i][j][0]);
        }
      }
      return wordsListFlat;
}


function readData(maxIterations, maxEntities){
  readFalseWords();
  
  var exp1 = readReasonWords(reasons1, maxIterations, maxEntities);
  wordScores1 = exp1[0];      
  reasonWords1 = exp1[1];
  reasonPats1 = exp1[2];
  
  var g = readPatFile(patterns1);
  posWords1 = g[0];
  negWords1 = g[1];
  unlabWords1 = g[2];
  patScoresAllIter1 = g[3];
  wordsList1Flat = getFlatListFromScores(wordScores1);      
  var patrank =0;
  for(var i = 0; i < patScoresAllIter1.length; i++){
	for(var j = 0; j < patScoresAllIter1[i].length; j++){
		patrank += 1;
		patScores1[patScoresAllIter1[i][j][0]] = [patScoresAllIter1[i][j][1], patrank];
	}
  }
  
  if(numSystems == 2){
      var exp2 = readReasonWords(reasons2, maxIterations, maxEntities);
      wordScores2 = exp2[0];
      reasonWords2 = exp2[1];
      reasonPats2 = exp2[2];
      g = readPatFile(patterns2);
      posWords2 = g[0];
      negWords2 = g[1];
      unlabWords2 = g[2];
      patScoresAllIter2 = g[3];
      wordsList2Flat = getFlatListFromScores(wordScores2);
      patrank =0;
      for(var i = 0; i < patScoresAllIter2.length; i++){
        for(var j = 0; j < patScoresAllIter2[i].length; j++){
            patrank +=1;
            patScores2[patScoresAllIter2[i][j][0]] = [patScoresAllIter2[i][j][1], patrank];
        }
      }
      compare = true;
  } else{
      words2ID = "";
      }

	//rainbowcorrect = new Rainbow();
	//darker, lighter
	//rainbowcorrect.setSpectrum('193319','448844');
	//rainbowcorrect.setNumberRange(-5, 5);
	
	//rainbowfalse = new Rainbow();
	//rainbowfalse.setSpectrum('ff9999','red');
	//rainbowfalse.setNumberRange(-2, 2);
	
}

function readFalseWords() {
	labels = labeledWords;
    falseWords = new Array();
    trueWords = new Array();
    for (var i = 0; i < labels.length; ++i) {
      if (labels[i].lastIndexOf('#') == labels[i].length - 1) {
        var s = labels[i].substring(0, labels[i].length - 1);
        falseWords.push(s);
      } else
        trueWords.push(labels[i]);
    }
}

function getColor(thisListLength, otherListLength, thisListIndex, otherListIndex, correct){
		if(correct)
			return 'green';// + rainbowcorrect.colourAt(colorBin);
		else
                return 'red'
                
		/*maxLen = Math.max(thisListLength, otherListLength);
		var binsize = maxLen /5;
		var diff = thisListIndex - otherListIndex;
		var colorBin = 5 - diff % binsize;
		if(otherListIndex <= 0)
			if(!correct)
				colorBin = 	2;
		
		return '#' + rainbowfalse.colourAt(colorBin); */
}


function getWordColor(thisListLength, otherListLength, otherListIndex, thisListIndex, falseOracle, trueOracle){

	
		

	var notInOther = otherListIndex == 0;
	var notInThis = thisListIndex ==0;
	var diff = notInThis - notInOther;
	var diffnorm = 2*diff/thisListIndex.length;
	if ((!falseOracle && !trueOracle) || notInThis){
		//console.log("Problem! " + ph + " not labeled");
	return 'black';
	} else {
		return getColor(thisListLength, otherListLength, thisListIndex, otherListIndex, trueOracle);
		//if (falseOracle) {
		//	
		//	if (notInOther) {
		//		return getColor(600", diffnorm);	
		//	}
		//	return ColorLuminance("CC6600", diffnorm);
		//} else{
		//	
		//	 if (notInOther) {
		//		return ColorLuminance("009900", diffnorm);
		//	} else{
		//		return ColorLuminance("009900", diffnorm);
		//	}
		//}
	}
}

function readPatFile(patterns){
	var posWords = {};
	var negWords = {};
	var unlabWords = {};
	var scores = {};

	var scoresAllIter = [];

	for(var i =0; i < patterns.length; i++){
		var scores = [];
		
		for(var m in patterns[i]){
			var posWordsIter  = {};
			var negWordsIter = {};
			posWords[m] = patterns[i][m]["Positive"];
			negWords[m] = patterns[i][m]["Negative"];
			unlabWords[m] = patterns[i][m]["Unlabeled"];
			scores.push([m, patterns[i][m]["Score"]]);
		}

		scores.sort(function(a, b) {
			a = a[1];
			b = b[1];
			return a > b ? -1 : (a < b ? 1 : 0);
		});
		scoresAllIter.push(scores);
	}
	return [posWords, negWords, unlabWords, scoresAllIter];
}

function readReasonWords(reasonForWordsAll, maxIterations, maxEntities) {
  var reasonWords = new Object();
  var reasonPats = new Object();
  var wordScores = [];
  var numWord = 0;
  
  var reasonForWords = reasonForWordsAll[0];
  for (var j = 0; j < reasonForWords.length && j < maxIterations; j++) {
	  var wordScoresThisIter = [];
	for (var i = 0; i < reasonForWords[j].length; i++) {
		numWord +=1;
		if(numWord > maxEntities)
			break;
	  word = reasonForWords[j][i]["entity"];
	  reasonWords[word] = reasonForWords[j][i]["words"];
	  reasonPats[word] = reasonForWords[j][i]["patterns"];
	  wordScoresThisIter.push([word,reasonForWords[j][i]["score"]]);
	}
	wordScoresThisIter.sort(function(a, b) {
		a = a[1];
		b = b[1];
		return a > b ? -1 : (a < b ? 1 : 0);
	});
	wordScores.push(wordScoresThisIter);
  }
  return [wordScores, reasonWords, reasonPats];
 }
    
function getColoredListOfPhrases(list, thisListData, otherListdata){
	var str ="";
	for(var i =0; i < list.length; i++){
		var ph = list[i];
		var trueoracle= jQuery.inArray(ph, trueWords) >=0;
        var falseoracle = jQuery.inArray(ph, falseWords) >=0;
        var otherListIndex = jQuery.inArray(ph, otherListdata);
        var indexInThis = jQuery.inArray(ph, thisListData);
		if( i > 0)
			str+= "<br/>"
		str+="<font color='"+ getWordColor(thisListData.length, otherListdata.length, otherListIndex, indexInThis, falseoracle, trueoracle) +"'>" + list[i] + "</font>";
		
	}
	return str;
}

function getColoredListOfPhrasesJSON(list, thisListData, otherListdata){
	var retval=[];
	//var str ="";
	for(var i =0; i < list.length; i++){
		var ph = list[i];
		var trueoracle= jQuery.inArray(ph, trueWords) >=0;
        var falseoracle = jQuery.inArray(ph, falseWords) >=0;
        //var otherListIndex = jQuery.inArray(ph, otherListdata);
        //var indexInThis = jQuery.inArray(ph, thisListData);
		if( i > 0)
			//str+= "<br/>"
			//str+="<font color='"+ getWordColor(thisListData.length, otherListdata.length, otherListIndex, indexInThis, falseoracle, trueoracle) +"'>" + list[i] + "</font>";
			retval.push({"name":list[i],"color":getWordColor(thisListData.length, otherListdata.length, -1, -1, falseoracle, trueoracle)});
	}
	return retval;
}


function createPatternListItem(parentElement, pat, id, patScores, posWordsForPat, negWordsForPat, unlabWordsForPat, thisListEntities, otherPatScores, otherListEntities){

	//##### start: get ratio of correct entities in Unlabeled
	var ratioCorrectUnlab = 0;
    var numUnlabLabeled = 0.0;
	for(var m =0; m < unlabWordsForPat.length; m++){
		if(jQuery.inArray(unlabWordsForPat[m], trueWords) >=0){
			ratioCorrectUnlab +=1;
            numUnlabLabeled += 1;
        } else if(jQuery.inArray(unlabWordsForPat[m], falseWords) >=0){
			numUnlabLabeled+= 1;
        }
	}
	
	if(numUnlabLabeled > 0){
		ratioCorrectUnlab = ratioCorrectUnlab/numUnlabLabeled;
	}else
        ratioCorrectUnlab = 0;
	//#####  end: get ratio of correct entities in Unlabeled
	
	
	var listItem = document.createElement("li");
	var patnode = document.createElement("span");
	patnode.innerHTML = pat;
    listItem.className="litog"
	listItem.appendChild(patnode);
	if(numUnlabLabeled > 0 && ratioCorrectUnlab < 0.50){
		var redEl = document.createElement('img')
		redEl.setAttribute('src','../img/redexcl.png')
		redEl.setAttribute('width','10px');
		redEl.setAttribute('style','padding:2px;');
		listItem.appendChild(redEl);
	} else if(ratioCorrectUnlab > 0.90){
        var redEl = document.createElement('img')
		redEl.setAttribute('src','../img/tick.png')
		redEl.setAttribute('width','10px');
		redEl.setAttribute('style','padding:2px;');
		listItem.appendChild(redEl);
    }	

	var existInOther = false;
    if(compare){
        if(pat in otherPatScores){
            existInOther = true;
            
        } else{
            listItem.style.color = 'blue';
        }
    }

	var reasonElement = document.createElement("p");
	var details = document.createElement("span");
	var score = patScores[pat][0];
    var patRankThis = patScores[pat][1];
    var diffStr = "";

    details.innerHTML ="<br>System score: "+ score.toFixed(2)+"<br>% correct unlabeled: " + ratioCorrectUnlab.toFixed(2);
    
    if(compare){
        if(existInOther){
            var patRankOther = otherPatScores[pat][1];
            var patScoreOther = otherPatScores[pat][0];
            var diff = Math.abs(patRankThis - patRankOther);
            if(patRankThis > patRankOther){
                diffStr += diff + " ranks earlier, score " + patScoreOther.toFixed(2);
            }else
                diffStr += diff + " ranks after, score  " + patScoreOther.toFixed(2);
        } else
            diffStr = "Not extracted";
        

        details.innerHTML += "<br>Other system:"+diffStr + "<br><br>";
    }
	reasonElement.appendChild(details)
	reasonElement.className="smallsize";
	
	
	var posnegunlabdiv = document.createElement("div");
    posnegunlabdiv.className="tablelike"
	reasonElement.appendChild(posnegunlabdiv);
	
	var posdiv = document.createElement("div");
	posnegunlabdiv.appendChild(posdiv);
	posdiv.className="posnegunlabDiv";
	posdiv.innerHTML="<b>Positive</b><br/> " + getColoredListOfPhrases(posWordsForPat, thisListEntities, otherListEntities) ;
	
	var negdiv = document.createElement("div");
	posnegunlabdiv.appendChild(negdiv);
	negdiv.className="posnegunlabDiv";
	negdiv.innerHTML="<b>Negative</b><br/> " + getColoredListOfPhrases(negWordsForPat, thisListEntities, otherListEntities) ;
	
	var unlabdiv = document.createElement("div");
	posnegunlabdiv.appendChild(unlabdiv);
	unlabdiv.className="posnegunlabDiv";
	unlabdiv.innerHTML="<b>Unlabeled</b><br/> " + getColoredListOfPhrases(unlabWordsForPat, thisListEntities, otherListEntities) ;
	
	reasonElement.className="content";
	//reasonElement.id = id+pat+"-reason";
	
	//listItem.onclick =  function(){toggle_visibility(this.id+"-reason")};
	//listItem.id = id+pat;
	
	parentElement.appendChild(listItem);
	parentElement.appendChild(reasonElement);
}



function createPatternListItemJSON( pat, id, patScores, posWordsForPat, negWordsForPat, unlabWordsForPat, thisListEntities, otherPatScores, otherListEntities){
	var retval=[];
	//##### start: get ratio of correct entities in Unlabeled
	var ratioCorrectUnlab = 0;
	for(var m =0; m < unlabWordsForPat.length; m++){
		if(jQuery.inArray(unlabWordsForPat[m], trueWords) >=0)
			ratioCorrectUnlab +=1;
	}
	
	if(unlabWordsForPat.length > 0){
		ratioCorrectUnlab = ratioCorrectUnlab/unlabWordsForPat.length;
	}
	//#####  end: get ratio of correct entities in Unlabeled
	
	
	//var listItem = document.createElement("li");
	//var patnode = document.createElement("span");
	retval["name"] = pat
	//patnode.innerHTML = pat;
    //listItem.className="litog"
	//listItem.appendChild(patnode);
	if(ratioCorrectUnlab < 0.50){
		//var badgeEl = document.createElement('img')
		//badgeEl.setAttribute('src','img/redexcl.png')
		//badgeEl.setAttribute('width','10px');
		//badgeEl.setAttribute('style','padding:2px;');
		//listItem.appendChild(badgeEl);
		retval["img"] = "redexcl"
	}	
	retval["color"] = "black"
	var existInOther = false;
	if(pat in otherPatScores){
		existInOther = true;
		
	} else{
		retval["color"] = "blue"
		//listItem.style.color = 'blue';
	}
	

	//var reasonElement = document.createElement("p");
	//var details = document.createElement("span");
	var score = patScores[pat][0];
    var patRankThis = patScores[pat][1];
    var diffStr = "";
    if(existInOther){
		var patRankOther = otherPatScores[pat][1];
		var patScoreOther = otherPatScores[pat][0];
		var diff = Math.abs(patRankThis - patRankOther);
		if(patRankThis > patRankOther){
			diffStr += diff + " ranks earlier, score " + patScoreOther.toFixed(2);
		}else
			diffStr += diff + " ranks after, score  " + patScoreOther.toFixed(2);
	} else
		diffStr = "Not extracted";
    
    retval["score"] = score.toFixed(2)
    retval["ratio"] = ratioCorrectUnlab.toFixed(2)
    //details.innerHTML ="<br>System score: "+ score.toFixed(2)+"<br>% correct unlabeled: " + ratioCorrectUnlab.toFixed(2);
	retval["other"] = diffStr
	//details.innerHTML += "<br>Other system:"+diffStr + "<br><br>";
	//reasonElement.appendChild(details)
	//reasonElement.className="smallsize";
	
	
	//var posnegunlabdiv = document.createElement("div");
    //posnegunlabdiv.className="tablelike"
	//reasonElement.appendChild(posnegunlabdiv);
	
	//var posdiv = document.createElement("div");
	//posnegunlabdiv.appendChild(posdiv);
	//posdiv.className="posnegunlabDiv";
	retval["positive"]=getColoredListOfPhrasesJSON(posWordsForPat, thisListEntities, otherListEntities)
	retval["negative"]=getColoredListOfPhrasesJSON(negWordsForPat, thisListEntities, otherListEntities)
	retval["unlabeled"]=getColoredListOfPhrasesJSON(unlabWordsForPat, thisListEntities, otherListEntities)
	//posdiv.innerHTML="<b>Positive</b><br/> " + getColoredListOfPhrases(posWordsForPat, //thisListEntities, otherListEntities) ;
	
	//var negdiv = document.createElement("div");
	//posnegunlabdiv.appendChild(negdiv);
	//negdiv.className="posnegunlabDiv";
	//negdiv.innerHTML="<b>Negative</b><br/> " + getColoredListOfPhrases(negWordsForPat, thisListEntities, otherListEntities) ;
	
	//var unlabdiv = document.createElement("div");
	//posnegunlabdiv.appendChild(unlabdiv);
	//unlabdiv.className="posnegunlabDiv";
	//unlabdiv.innerHTML="<b>Unlabeled</b><br/> " + getColoredListOfPhrases(unlabWordsForPat, thisListEntities, otherListEntities) ;
	
	//reasonElement.className="content";
	//reasonElement.id = id+pat+"-reason";
	
	//listItem.onclick =  function(){toggle_visibility(this.id+"-reason")};
	//listItem.id = id+pat;
	
	//parentElement.appendChild(listItem);
	//parentElement.appendChild(reasonElement);
	return retval
}

function makeLists(){
    
    var listContainer = document.createElement("div");
	listContainer.className ="maindiv";
	document.getElementsByTagName("body")[0].appendChild(listContainer);
	var maxIterations = 1000;
	var maxEntities = 10000;
    readData(maxIterations, maxEntities);

    var thisSystemDiv = document.createElement("div");
	thisSystemDiv.className="accordionclass";
	thisSystemDiv.id="laccordion";
	listContainer.appendChild(thisSystemDiv);
    width="width:";
    if(compare){
        width = "width:400px;left:10px";
    }else
        width = "width:500px;left:300px";
    thisSystemDiv.setAttribute('style','top:0px;'+width);
    makePatList(patScoresAllIter1, posWords1, negWords1, unlabWords1, patScores2, wordsList1Flat, wordsList2Flat, thisSystemDiv, words1ID, patScores1);
     
    if(numSystems == 2){
        var thisSystemDiv2 = document.createElement("div");
        thisSystemDiv2.className="accordionclass";
        thisSystemDiv2.id="raccordion";
        
        width = "width:400px;left:410px";
        
        thisSystemDiv2.setAttribute('style','top:0px;'+width);
        listContainer.appendChild(thisSystemDiv2);
       
        
        makePatList(patScoresAllIter2, posWords2, negWords2, unlabWords2,patScores1, wordsList2Flat, wordsList1Flat, thisSystemDiv2, words2ID, patScores2);

    }
    
    
    
  }
  
function makePatList(patScoresAllIter, posWords, negWords, unlabWords, otherPatScores, thisListEntities, otherListEntities, thisSystemDiv, id, patScores){

		     
	//### Begin Summary Node #####################
	var listItemHeaderSummary = document.createElement("p");
    thisSystemDiv.appendChild(listItemHeaderSummary);
	listItemHeaderSummary.innerHTML = id + "&nbsp;Summary";
	
	var listItemDivSummary = document.createElement("div");
    thisSystemDiv.appendChild(listItemDivSummary);
    var listItempSummary = document.createElement("p");        
    listItemDivSummary.appendChild(listItempSummary);
    //### End Summary Node ######################
	
	var numIterations =patScoresAllIter.length;
      //for each iteration
      for (var i = 0; i < numIterations; i++) {
        
        var patScoresthisiter = patScoresAllIter[i];
		var iterEl = document.createElement("p");
		iterEl.innerHTML = "Iteration " + (i+1);
		var numpat = document.createElement("p");
		numpat.innerHTML = patScoresthisiter.length + " patterns learned";
		numpat.className = "smallfont";
		iterEl.appendChild(numpat);
		thisSystemDiv.appendChild(iterEl);
		var listItemDivIter = document.createElement("div");
		thisSystemDiv.appendChild(listItemDivIter);
        listItemDivIter.setAttribute("style","height:auto");
		var listItempIter = document.createElement("p");        
		listItemDivIter.appendChild(listItempIter);
       
		//   var iterText = iterWordsScores.length + " instances learned";

       var patlistiter = document.createElement("ul");
       for(var j =0; j < patScoresthisiter.length; j++){
            pat = patScoresthisiter[j][0];
			createPatternListItem(patlistiter, pat, id, patScores, posWords[pat], negWords[pat], unlabWords[pat], thisListEntities, otherPatScores, otherListEntities);	
		}
    
       //listItempIter.innerHTML = iterText;
       listItempIter.appendChild(patlistiter);
       listItempIter.className="hoverText";
	}
   // var summaryText = "Number of entities extracted: " + numWord + "<br> ("+correctNum + " Correct, "+incorrectNum +" Incorrect, "+ unknown + " Unknown)";
    var summaryText = "<br>Number of patterns learned: " + Object.keys(patScores).length;
    summaryText += "<br>Number of iterations: " + numIterations;
    listItempSummary.innerHTML = summaryText;
    listItempSummary.className="hoverText";
}




