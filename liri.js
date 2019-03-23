require("dotenv").config();

var keys = require("./keys.js")
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");

var movie = process.argv[3];
// var userInput = process.argv;

var song = process.argv[3];
var artist = process.argv[3];


if (process.argv[2] === "movie-this" && movie === undefined) {
  movie = "Mr Nobody";
  console.log(movie);

}


axios.get("http://www.omdbapi.com/?t=" + movie + "  &y=&plot=short&apikey=trilogy").then(
  function (response) {
    //To look into the full arrary and see how to pull info do the below:
    // console.log(response);
    if (process.argv[2] === "movie-this") {


      console.log("Realease Year: " + response.data.Year);
      console.log("The movie title is: " + response.data.Title);
      console.log("The movie rating is: " + response.data.imdbRating);
      console.log("The movie plot is: " + response.data.Plot);
      console.log("The movie languages are: " + response.data.Language);
      console.log("The actors are: " + response.data.Actors);
      console.log("The movie country is: " + response.data.Country);
      console.log("The Rotten Tomato rating is: " + response.data.Ratings[1].Value);

    }

  
  })





var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "spotify-this-song" && song === undefined){
  song = "The Sing";
  console.log(song);
}

spotify.search({ type: "track", query: song }, function (err, data) {
  if (err) {
    return console.log("Error:" + err);
  }

  // console.log(data.tracks.items[0].album.name);
  for (var i = 0; i < data.tracks.items.length; i++) {

    if (process.argv[2] === "spotify-this-song") {

      // add if / else  to add "The Sign" if no value is provided
      // SHOW THE BELOW
      console.log("this is the Artist:" + data.tracks.items[i].artists[i].name);
      console.log("this is the Album:" + data.tracks.items[i].album.name);
      console.log("this is the preview URL:" + data.tracks.items[i].preview_url);
      console.log("the name of the song is:" + data.tracks.items[i].name);
    }

    else if (process.argv[2] === "spotify-this-song" && song === "") {
      song = "The Sign"
      console.log("this is the Artist:" + data.tracks.items[i].artists[i].name);
      console.log("this is the Album:" + data.tracks.items[i].album.name);
      console.log("this is the preview URL:" + data.tracks.items[i].preview_url);
      console.log("the name of the song is:" + data.tracks.items[i].name);

    }

    // else{
    //   //move on
    // }

  }
})

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(

  function (response) {
    // console.log(response.data);
    if (process.argv[2] === "concert-this") {
      console.log("This is the Name of the Venue: " + response.data[1].venue.name);
      console.log("This is the location: " + response.data[1].venue.country);
      //   //this needs to be formatted as MM/DD/YYY
      console.log("Date of the Event: " + response.data[2].datetime);

    }
    // else {
    //   //move on
    // }

  });

// FS Part Show

fs.readFile("./random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }

  if (process.argv[2]=== "do-what-it-says"){
    console.log(data);

    var dataArr = data.split(",");
    console.log(dataArr);

  }

});
