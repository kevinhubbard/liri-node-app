var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var keys = require('./keys.js');

var command = process.argv[2];
var input = process.argv[3];

switch(command){
	case "do-what-it-says":
		whatItSays();
		break;
	case "movie-this":
		if(input == undefined){
			var title = 'Office+Space';
			movieRequest(title);
		} else {
			var key = input.replace(/ /g, '+');
			movieRequest(key);
		}
		break;
	case "my-tweets":
		if(input == undefined){
			input = 'BarackObama';
			twitterTweets(input);
		} else {
			twitterTweets(input);
		}
		break;
	case "id-this-song":
		if (input == undefined){
			input = 'Eclipse';
			idSong(input);
		}else {
			idSong(input);
		}
		break;
	case "my-weather":
		if(input == undefined){
			input = '10001'
			weather(input);
		} else {
			weather(input);
		}
		break;
	case "mountain-info":
		if(input == undefined){
			input = 'Killington Resort'
			mountain(input);
		} else {
			mountain(input);
		}
		break;
	default:
		notFound();
		break;
}

//function if user enters wrong command
function notFound() {
	console.log('\nCommand not valid try:' + "\n'my-tweets'" + "\n'id-this-song'" + "\n'movie-this'" + "\n'my-weather'");
}

//fucntion to log user commands to a log.txt file
function logCommand() {
	fs.appendFile('log.txt', command + " " + input + ", " , 'utf8', function (err) {
	if (err){
		console.log('There was an error writing the file');
	}
});
	
} logCommand();

//random function for do-what-it-says
function whatItSays() {

	fs.readFile('random.txt', 'utf8', function (err, data) {
		if(err){
			console.log(err);
		} else{
			spotifySong(data);		
		}
	});
}

//ombd movie request function 
function movieRequest(title) {
	var search = 'http://www.omdbapi.com/?t=' + title +'&apikey=fc38517e';
	request(search, function (error, response, body) {
		var movie = JSON.parse(body);

		if(error){
			console.log(error);
		} else{
			console.log('\nTitle: ' + movie.Title);
			console.log('Year: ' + movie.Year);
			console.log('Rated: ' + movie.Rated);
			console.log('Rotten tomatoes rating: ' + movie.Ratings[1].Value);
			console.log('Plot: ' + movie.Plot);
			
		}
	});
}

//spotify function that returns track info 
function idSong(song) {
	var track = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + song + '&api_key=75cf84fa3baa670809e72de33e192e20&limit=5&format=json';
	
	request(track, function(error, response, body){
		var trackList = JSON.parse(body);
		if(error){
			console.log(error);
		} else {
			var total = trackList.results.trackmatches.track;
			for (var i = 0; i < total.length; i++) {
				console.log('Track: ' + total[i].name + ', Artist: ' + total[i].artist + ', Listeners: ' + total[i].listeners);
			}
		}
	});
}

//twitter request that returns your last 20 tweets
function twitterTweets(username){
	
	var client = new Twitter({
		consumer_key: keys.twitterKeys.consumer_key,
		consumer_secret: keys.twitterKeys.consumer_secret,
	    access_token_key: keys.twitterKeys.access_token_key,
	    access_token_secret: keys.twitterKeys.access_token_secret
	});


	var params = {screen_name: username, count: '20'};
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		
		if(!error){
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
			}
		}
	});
}


function weather(location){
	var uri = 'http://api.openweathermap.org/data/2.5/weather?zip=' + location + '&units=imperial&APPID=a6b9b01e48e7d6bcf7c450f58774b963';
	
	request(uri, function(error, response, body){
		var res = JSON.parse(body);

		if(res.message === 'city not found'){
			console.log('\nCity not found. Try another zip.');
		} else {
			console.log('\nWeather for: ' + res.name);
			console.log('Currently: ' + res.weather[0].main);
			console.log('Description: ' + res.weather[0].description);
			console.log('Temperature: ' + res.main.temp +  ' \u00B0F');
			console.log('Wind Speed: ' + res.wind.speed + ' mph');
			console.log('Wind Direction: ' + res.wind.deg + ' degrees');
		}
	});
}



function mountain(mtn){
	var uri = 'https://mountain-api.herokuapp.com/';

	request(uri, function(error, response, body){
		var res = JSON.parse(body);
		var name = mtn;
		console.log(res.mountain[1]+name);
	});
}