
var Request = require("request");
var Parser = require("json-parser");
var config = require("../config.js");
var async = require("async");

this.fetchUrl = function(url,callback)
{
	var response;
	
	Request({
		url: url,
		method: 'GET',
		/*data : {
			limit : 200,
			includeRelated : true,
			useCanonical : false,
			includeTags : false,
			api_key : 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
		}*/
		
	}, function(err, res, body) {	
		response = Parser.parse(res.body,null,true);
		callback(response);
	});
};

this.getDefinition = function(word,callback)
{
	var url = "http://api.wordnik.com:80/v4/word.json/"+word+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + config.api_key;
	
	this.fetchUrl(url, function(response){ 
		if(typeof response != undefined){
			if(response.length == 0){
				console.log("\nUnable to find definition of given word");
			}
			else{
				console.log("\nDefinition:");
				for(var index=0; index<response.length;index++) { 
					console.log("\t" + response[index].text);
					if(index == 1){
						break;
					}
				}
			}
			callback(null);
		}
		else{
			console.log("\nUnable to find definition of given word");
			callback(null);
		}
	});
};

this.getSynonyms = function(word,callback)
{
	var url = "http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		if(response.length != 0){
			if(response[0].words.length == 0){
				console.log("\nUnable to find synonyms of given word");
			}
			else{
				console.log("\nSynonyms:");
				for(var index=0; index<response[0].words.length;index++) { 
					console.log("\t" + response[0].words[index]);
				}
			}
			callback(null);
		}
		else{
			console.log("\nNo synonyms for given word");
			callback(null);
		}
	});
};

this.getAntonyms = function(word,callback)
{
	var url = "http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		if(response.length != 0){
			if(response[0].words.length == 0){
				console.log("\nUnable to find antonyms of given word");
			}
			else{
				console.log("\nAntonyms:");
				for(var index=0; index<response[0].words.length;index++) { 
					console.log("\t" + response[0].words[index]);
					if(index == 1){
						break;
					}
				}
			}
			callback(null);
		}
		else{
			console.log("\n No antonyms for given word");
			callback(null);
		}
	});	
};

this.getExample = function(word,callback)
{
	var url = "http://api.wordnik.com:80/v4/word.json/" + word + "/topExample?useCanonical=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		if(typeof response != undefined){
			if(response.length == 0){
				console.log("\nUnable to find details of given word");
			}
			else{
				console.log("\nExample:" + response.text);
			}
			callback(null);
		}
		else{
			console.log("\nUnable to find details of given word");
			callback(null);
		}
	});
};
this.getFullDIctionary = function(word,callback)
{
	var self = this;
	
	async.waterfall([
		function(callback){
			self.getDefinition(word,callback);
		},
		
		function(callback){
			self.getSynonyms(word,callback);
		},
		
		function(callback){
			self.getAntonyms(word,callback);
		},
		
		function(callback){
			self.getExample(word,callback);
		}
	], function(error, result){
		//console.log("error:"+error)
		callback(null);
	});
};

this.getWordOfTheDay = function(callback)
{
	var date = new Date();
	
	var dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
	
	var url = "http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=" + dateString + "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		console.log("\nWord of the Day:"+response.word);
		console.log("\nDescription:"+ response.note);
		var examplesOutPut = "\nExamples:";
		var examples = response.examples;
		for(var i=0;i<examples.length;i++)
		{
			examplesOutPut = examplesOutPut + i + "." + examples[i].text;
		}
		console.log(examplesOutPut);
		var definitionOutPut = "\nDefinitions:";
		var definitions = response.definitions;
		for(var i=0;i<definitions.length;i++)
		{
			definitionOutPut = definitionOutPut + i + "." + definitions[i].text;
		}
		console.log(definitionOutPut);
		callback(null);
	});
};

this.displayMenu = function()
{
	console.log("\t 1.'def <word>'  for definition of a word");
	console.log("\t 2.'syn <word>'  for synonyms of a word");
	console.log("\t 3.'ant <word>'  for antonyms of a word");
	console.log("\t 4.'ex <word>'   for example usage of a word");
	console.log("\t 5.'dict <word>' or '<word>' for the above details of a word");
	console.log("\t 6.'wod' 		for word of the day");
	console.log("\t 7.'play' 		to play a word game. Still in implementation");
	console.log("\t 8.'quit' 		to quit from here");
	
};

this.play = function(callback)
{
	var self = this;
	var url = "http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	
	console.log("Wanna play! guess the word based on its definition, synonyms/antonyms");
	
	this.fetchUrl(url, function(response){
		if(typeof response != undefined){
			//console.log(response.word);
			
			async.waterfall([
			         		function(callback){
			         			self.getDefinition(response.word,callback);
			         		},
			         		
			         		function(callback){
			         			self.getSynonyms(response.word,callback);
			         		},
			         		
			         		function(callback){
			         			self.getAntonyms(response.word,callback);
			         		}
			         	], function(error, result){
			         		//console.log("error:"+error)
			         		callback(response.word);
			         	});
		}
		else{
			console.log("\nUnable to play now.");
			callback(null);
		}
	});
};

this.provideHint = function(playingWord)
{
	var arrWord = playingWord.split("");
	var wordLength  = arrWord.length;

	for(var i = wordLength - 1; i > 0; i--) {
	    var j = Math.floor(Math.random() * (i + 1));
	    var tmp = a[i];
	    a[i] = a[j];
	    a[j] = tmp;
	}
	
	arrWord.join("");
	console.log("The jumble of the word is:"+arrWord);
};