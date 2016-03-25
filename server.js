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

console.log("Hey! Please input any word as following:");

WordDetails.displayMenu();

process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", function (text) {
	
	var entered_text = text;
	entered_text = entered_text.split(" ");
	for(var i=0; i<entered_text.length;i++){
		entered_text[i] = entered_text[i].trim();
	}
  
	if (text.trim() === "quit" || text.trim() === "N" ||text.trim() === "n" ) {
		done();
	}
	if (text.trim() === "Y" || text.trim() == "y"){
		WordDetails.displayMenu();
	}
	else{
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
	}
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}