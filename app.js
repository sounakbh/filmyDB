var express = require("express");
var app = express();
var request = require("request");

//Setting up view engine
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get('/' , function(req, res) {
	res.render('search');
});

app.get('/results', function(req, res) {
	//res.send("It works!");
	var query = req.query.search;
	request("http://omdbapi.com/?s="+query+"&apikey=thewdb", function(error, response, body) {
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("results", {data: data});
		}
		else{
			console.log(error);
		}
	})
});

app.get('/movie/:movieID', function(req, res) {
	let movieID = req.params.movieID;
	request("http://omdbapi.com/?i="+movieID+"&apikey=thewdb", function(error, response, body){
		if(!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render("movie", {data: data});
		}
		else {
			console.log(error);
		}
	});
});

app.get('/about', function(req, res) {
	res.render('about');
});


app.listen(3000, process.env.IP, function() {
	console.log("Movie App has started");
});