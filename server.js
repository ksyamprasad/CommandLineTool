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

var isPlaying = false;
var playWord;
var hintCount = 0;
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
	else if (text.trim() === "Y" || text.trim() == "y"){
		WordDetails.displayMenu();
	}
	else if(this.isPlaying == true && entered_text[0] == playWord){
		this.isPlaying = false;
		console.log("You entered correct one.");
		console.log("Wanna play again [Y?N]?");
	}
	else if(this.isPlaying == true && entered_text[0] == 'hint'){
		this.hintCount = this.hintCount + 1;
		//var wordLength  = playWord.length;
		console.log("first letter of the word is:"+this.playWord.charAt(0));
		console.log("last letter of the word is:"+this.playWord.charAt(this.playWord.length-1));
		console.log("hint count:"+this.hintCount);
		if(hintCount == 1){
			getWordDetails.provideHint(playWord);
		}
		if(hintCount == 2){
			this.hintCount = 0;
			console.log("Sorry, No more hints.");
			console.log("The word is:"+playWord);
			wordDetails.getFullDIctionary(playWord,function(result){
				console.log("Want to continue [Y/N]:");
			});
			this.isPlaying = false;
		}
	}
	else if(this.isPlaying == true && entered_text[0] != playWord){
		console.log("incorrect please try again by looking at the details above or enter 'hint'(two times only) to get some help or enter 'quit' to exit from game.");
	}
	else{
		var self = this;
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
				WordDetails.getFullDIctionary(entered_text[1],function(result){
					console.log("Want to continue [Y/N]:");
				});
				break;
			case "wod" : 
				WordDetails.getWordOfTheDay(function(result){
					console.log("Want to continue [Y/N]:");
				});
				break;
			case "play" : 
				WordDetails.play(function(result){
					self.isPlaying = true;
					self.playWord = result;
					console.log("Enter the word:");
				});
				break;
			default : 
		  		WordDetails.getFullDIctionary(entered_text[0],function(result){
					console.log("Want to continue [Y/N]:");
				});
				break;
		}
	}
});

function done() {
  console.log('Now that process.stdin is paused, there is nothing more to do.');
  process.exit();
}