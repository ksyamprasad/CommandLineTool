
var Request = require("request");
var Parser = require("json-parser");

this.getDefinition = function(word)
{
	var url = "http://api.wordnik.com:80/v4/word.json/"+word+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";
	  
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
		
			var response = Parser.parse(res.body,null,true);
			console.log(response.length);
			for(var index=0; index<response.length;index++) { 
				console.log(response[index].text);
			}
		});
};