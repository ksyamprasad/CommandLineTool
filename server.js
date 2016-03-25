/*
	Project start point.
	@author syam prasad
 */
var express = require("express"),  
	app = express(), 
	config = require("./config.js");

var Request = require("request");
var Parser = require("json-parser");

var WordDetails = require("./wordDetails/getWordDetails.js");

app.listen(config.port);

console.log("Application is running at : " + config.url);

process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", function (text) {
  console.log(text);
  var entered_text = text;
  entered_text = entered_text.split(" ");
  for(var i=0; i<entered_text.length;i++){
	  console.log(entered_text[i]);
	  entered_text[i] = entered_text[i].trim();
  }
  
  if (text.trim() === 'quit') {
	  done();
  }
  
  switch(entered_text[0])
  {
  	case "def" : console.log("definition");
  		WordDetails.getDefinition(entered_text[1]);
		 break;
  	case "syn" : console.log("synonyms");
  		WordDetails.getSynonyms(entered_text[1]);
  		break;
  	case "ant" : console.log("antonynms");
  		WordDetails.getAntonyms(entered_text[1]);
		break;
  	case "ex"  : console.log("examples");
  		Wordetails.getExample(entered_text[1]);
		break;
  	case "dict" : console.log("details");
  		WordDetails.getFullDIctionary(entered_text[1]);
		break;
  	case ""    : console.log("word of day");
  		WordDetails.getWordOfTheDay(entered_text[1]);
		break;
  	case "play": console.log("play");
  		WordDetails.play(entered_text[1]);
		break;
  	default : console.log("details with out specifying");
  		WordDetails.getFullDIctionary(entered_text[1]);
		break;
  }
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}