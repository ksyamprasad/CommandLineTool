
var Request = require("request");
var Parser = require("json-parser");
var config = require("../config.js");

this.fetchUrl = function(url,callback)
{
	var response;
	console.log("in fetch url:"+url);
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

this.getDefinition = function(word)
{
	var url = "http://api.wordnik.com:80/v4/word.json/"+word+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=" + config.api_key;
	
	this.fetchUrl(url, function(response){
		for(var index=0; index<response.length;index++) { 
			console.log(response[index].text);
			if(index == 1){
				break;
			}
		}
	});
};

this.getSynonyms = function(word)
{
	var url = "http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		for(var index=0; index<response.words.length;index++) { 
			console.log(response.words[index]);
		}
	});
};

this.getAntonyms = function(word)
{
	var url = "http://api.wordnik.com:80/v4/word.json/" + word + "/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		for(var index=0; index<response.length;index++) { 
			console.log(response[index].text);
			if(index == 1){
				break;
			}
		}
	});
};

this.getExample = function(word)
{
	var url = "http://api.wordnik.com:80/v4/word.json/" + word + "/topExample?useCanonical=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		for(var index=0; index<response.words.length;index++) { 
			console.log(response.words[index]);
		}
	});
};
this.getFullDIctionary = function(word)
{
	var url = "http://api.wordnik.com:80/v4/word.json/"+word+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		for(var index=0; index<response.length;index++) { 
			console.log(response[index].text);
			if(index == 1){
				break;
			}
		}
	});
};

this.getWordOfTheDay = function(word)
{
	var date = new Date();
	
	var dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
	
	var url = "http://api.wordnik.com:80/v4/words.json/wordOfTheDay?date=" + dateString + "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
	this.fetchUrl(url, function(response){
		for(var index=0; index<response.length;index++) { 
			console.log(response[index].text);
			if(index == 1){
				break;
			}
		}
	});
};