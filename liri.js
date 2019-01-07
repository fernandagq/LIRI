require("dotenv").config();
var band="node liri.js concert-this <artist/band name here>" ;
var song="node liri.js spotify-this-song <song name here>";
var movie="node liri.js movie-this <movie name here>" ;

var doThis = "node liri.js do-what-it-says";

var keys = require("./keys.js");

var input= process.argv[2];

var choice= process.argv[3];

function songInfo(){


var Spotify = require('node-spotify-api');


var spotify = new Spotify(keys.spotify);


spotify.search({ type: 'track', query: input }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});
};


var axios = require("axios");

function movieInfo() {

    var movieName = process.argv[2];


    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    axios.get(queryUrl).then(
        function (response) {

            console.log("Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country where movie was produced: " + response.data.Country);
            console.log("Language of the Movie: " + response.data.Language);
            console.log("Move Plot: " + response.data.Plot);
            console.log("Actors " + response.data.Actors);
        }
    );

};


// Band Request Function
function bandInfo() {

    var artist = process.argv[2];

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


    axios.get(queryUrl).then(function (response) {
            
            console.log(response.data[0].venue.name);
        }
    );
}
    

if (input===band){
    bandInfo();
}else if (input===song){
    songInfo();

}else if (input===movie){
    movieInfo();
}