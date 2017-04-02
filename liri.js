var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');

var command = process.argv[2];
var input = process.argv[3];

switch(command){
	case "do-what-it-says":
		whatItSays();
		break;
	case "movie-this":
		if (input == ""){
			input = 'Mr. Nobody';
			movieRequest(input);
		}else {
			movieRequest(input);
		}
		break;
	case "my-tweets":
		twitterTweets();
		break;
	case "spotify-this-song":
		if (input == ""){
			input = 'The Sign';
			spotifySong(input);
		}else {
			spotifySong(input);
		}
		
		break;
	default:
		notFound();
		break;
}

//function if user enters wrong command
function notFound() {
	console.log('command not valid try:');
	console.log("'my-tweets'");
	console.log("'spotify-this-song'");
	console.log("'movie-this'");
}

//fucntion to log user commands to a log.txt file
function logCommand() {
	fs.appendFile('log.txt', command + " " + input + ", " , 'utf8', function (err) {
	if (err){
		console.log('there was an error writing the file');
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
	request('http://www.omdbapi.com/?t=' + title, function (error, response, body) {
		var movie =JSON.parse(body);

		if(error){
			console.log(error);
		} 
		if (movie.Response === "False"){
			console.log(movie.Error);
		} else{
			console.log('Title: ' + movie.Title);
			console.log('Year: ' + movie.Year);
			console.log('imdb rating: ' + movie.imdbRating);
			console.log('Country: ' + movie.Country);
			console.log('Language: ' + movie.Language);
			console.log('Plot: ' + movie.Plot);
			console.log('Actors: ' + movie.Actors);
			console.log('Metascore: ' + movie.Metascore);
			console.log('Poster: ' + movie.Poster);
		}


	});
}

//spotify function that returns track info 
function spotifySong(song) {
	spotify.search({type: 'track', query: song}, function (err, data) {
		if(err){
			console.log('Error occured: ' + err);
		}
		var track = data.tracks.items[0];

		console.log("Artist: " + track.artists[0].name);
		console.log("Track: " + track.name);
		console.log("Album: " + track.album.name);
		console.log("Preview: " + track.preview_url)
	});
}

//twitter request that returns your last 20 tweets
function twitterTweets(tweets){
	var client = new Twitter({
		consumer_key: '6Y0caylI9I2iigN5mfWkpUP3L',
		consumer_secret: '0TNqOKIhnYPA3RAaV0VNHPD4LUo352Uaf0Cfwqy8mq20vYTzP6',
	    access_token_key: '75499248-hpsYH6SxOrFEMxxliDtqb7ton1hIX1g99A8yFCg1Y',
	    access_token_secret: 'vjpD3SdF6kXmJzOzXAmEjOneeDXIGoTwob3lUxUHlG4kT'
	});


	var params = {screen_name: 'HUBBA_DUBS'};
	client.get('statuses/user_timeline', params, function (error, tweets, response) {
		if(!error){
			console.log(tweets);
		}
	});
}

