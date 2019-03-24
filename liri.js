require("dotenv").config();

var keys = require("./keys.js")
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");

var movie = process.argv[3];
// var userInput = process.argv;

var song = process.argv[3];
var artist = process.argv[3];

var command = process.argv[2];


function getMovie (movieName){

  axios.get("http://www.omdbapi.com/?t=" + movie + "  &y=&plot=short&apikey=trilogy").then(
    function (response) {
      //To look into the full arrary and see how to pull info do the below:
      // console.log(response);
      if (command === "movie-this") {
  
        console.log("======================================");
  
        console.log("Realease Year: " + response.data.Year);
        console.log("The movie title is: " + response.data.Title);
        console.log("The movie rating is: " + response.data.imdbRating);
        console.log("The movie plot is: " + response.data.Plot);
        console.log("The movie languages are: " + response.data.Language);
        console.log("The actors are: " + response.data.Actors);
        console.log("The movie country is: " + response.data.Country);
        console.log("The Rotten Tomato rating is: " + response.data.Ratings[1].Value);
  
      };
  
  
    });
};

if (command === "movie-this") {
    if (movie === undefined){
      movie = "Mr Nobody";
    }
    getMovie(movie);
};


// axios.get("http://www.omdbapi.com/?t=" + movie + "  &y=&plot=short&apikey=trilogy").then(
//   function (response) {
//     //To look into the full arrary and see how to pull info do the below:
//     // console.log(response);
//     if (command === "movie-this") {

//       console.log("======================================");

//       console.log("Realease Year: " + response.data.Year);
//       console.log("The movie title is: " + response.data.Title);
//       console.log("The movie rating is: " + response.data.imdbRating);
//       console.log("The movie plot is: " + response.data.Plot);
//       console.log("The movie languages are: " + response.data.Language);
//       console.log("The actors are: " + response.data.Actors);
//       console.log("The movie country is: " + response.data.Country);
//       console.log("The Rotten Tomato rating is: " + response.data.Ratings[1].Value);

//     }


//   })



var spotify = new Spotify(keys.spotify);

function getSongFromSpotify(songName) {

  spotify.search({ type: "track", query: songName }, function (err, data) {
    if (err) {
      return console.log("Error:" + err);
    }

    // console.log(data.tracks.items[0].album.name);
    for (var i = 0; i < data.tracks.items.length; i++) {

      // add if / else  to add "The Sign" if no value is provided
      // SHOW THE BELOW
      console.log("======================================");

      console.log("This is the Artist: " + data.tracks.items[i].artists[0].name);
      console.log("This is the Album: " + data.tracks.items[i].album.name);
      console.log("This is the preview URL: " + data.tracks.items[i].preview_url);
      console.log("This is the song: " + data.tracks.items[i].name);


    }
  })


};


if (command === "spotify-this-song") {

  if (song === undefined) {
    song = "The Sign";
    // console.log(song);
  }

  getSongFromSpotify(song);
};


function getConcert (artist){


  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(

    function (response) {
      // console.log(response.data);
        console.log("======================================");

        console.log("This is the Name of the Venue: " + response.data[1].venue.name);
        console.log("This is the location: " + response.data[1].venue.country);
        //   //this needs to be formatted as MM/DD/YYY
        console.log("Date of the Event: " + response.data[2].datetime);

      
      

    });
};

if (command === "concert-this"){
getConcert(artist);
};

  

  // FS Part Show

  fs.readFile("./random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    if (command === "do-what-it-says") {
      // console.log(data);

      var dataArr = data.split(",");
      // console.log(dataArr[1]);
      // console.log(dataArr[3]);
            console.log(dataArr[5]);




      // getSongFromSpotify(dataArr[1]);
      // getMovie(dataArr[3]);
      getConcert(dataArr[5]);

    }

  });
