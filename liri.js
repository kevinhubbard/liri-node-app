var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');

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

function notFound() {
	console.log('command not valid try:');
	console.log("'my-tweets'");
	console.log("'spotify-this-song'");
	console.log("'movie-this'");
}


function whatItSays() {

	fs.readFile('random.txt', 'utf8', function (err, data) {
	if(err){
		console.log(err);
	} else{
		spotifySong(data);		
	}
});
	
}

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

function twitterTweets(tweets){
	console.log('your last 20 tweets will go here');
}

function logCommand() {
	fs.appendFile('log.txt', command + " " + input + ", " , 'utf8', function (err) {
	if (err){
		console.log('there was an error writing the file');
	}
});
	
}

logCommand();