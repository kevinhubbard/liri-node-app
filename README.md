# Introduction
LIRI-node-app (Language Interpretation and Recognition Interface) is a command line node app that takes in parameters and gives you back data

## Setup
1. Clone the repo
2. Run npm install to download dependencies

## Run the app
The app has 4 available functions
1. my-tweets {username}
	* Returns last 20 tweets of entered username
2. movie-this 'movie title'
	* Returns movie rating and plot
3. id-this-song 'song name'
	* Returns top 5 song titles, artists, and listeners
4. my-weather {zip code}
	* Returns weather for a given zip code


To run them, navigate to the directory and type: node liri {function} {parameter}

(If the movie title or song name has more than one word delimited by a space it must be put in quotes "" or '')