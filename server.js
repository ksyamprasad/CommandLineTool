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

console.log("Hey! Please input any one of the following:");

console.log("\t 1.'def <word>'  for definition of a word");
console.log("\t 2.'syn <word>'  for synonyms of a word");
console.log("\t 3.'ant <word>'  for antonyms of a word");
console.log("\t 4.'ex <word>'   for example usage of a word");
console.log("\t 5.'dict <word>' or '<word>' for the above details of a word");
console.log("\t 6.'wod' 		for word of the day");
console.log("\t 7.'play' 		to play a word game.");
console.log("\t 8.'quit' 		to quit from here");

process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", function (text) {
	
	var entered_text = text;
	entered_text = entered_text.split(" ");
	for(var i=0; i<entered_text.length;i++){
		entered_text[i] = entered_text[i].trim();
	}
  
	if (text.trim() === 'quit') {
		done();
	}
  
	switch(entered_text[0])
	{
	  	case "def" : 
	  		WordDetails.getDefinition(entered_text[1],function(result){
	  			console.log("Want to continue [Y/N]:");
	  		});
	  		break;
		case "syn" : 
			WordDetails.getSynonyms(entered_text[1],function(result){
				console.log("Want to continue [Y/N]:");
			});
			break;
		case "ant" : 
			WordDetails.getAntonyms(entered_text[1],function(result){
				console.log("Want to continue [Y/N]:");
			});
			break;
		case "ex" : 
			WordDetails.getExample(entered_text[1],function(result){
				console.log("Want to continue [Y/N]:");
			});
			break;
		case "dict" : 
			WordDetails.getFullDIctionary(entered_text[1]);
			break;
		case "wod" : 
			WordDetails.getWordOfTheDay();
			break;
		case "play" : 
			WordDetails.play();
			break;
		default : 
	  		WordDetails.getFullDIctionary(entered_text[0]);
			break;
	}
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}