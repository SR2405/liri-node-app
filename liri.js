require("dotenv").config();

var keys = require("./keys.js")
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment")
var spotify = new Spotify(keys.spotify);

var movie = process.argv[3];
var song = process.argv[3];
var artist = process.argv[3];
var command = process.argv[2];


//Movie
function getMovie (movieName){

  axios.get("http://www.omdbapi.com/?t=" + movieName + "  &y=&plot=short&apikey=trilogy").then(
    function (response) {
        console.log("======================================");
        console.log("Realease Year: " + response.data.Year);
        console.log("The movie title is: " + response.data.Title);
        console.log("The movie rating is: " + response.data.imdbRating);
        console.log("The movie plot is: " + response.data.Plot);
        console.log("The movie languages are: " + response.data.Language);
        console.log("The actors are: " + response.data.Actors);
        console.log("The movie country is: " + response.data.Country);
        console.log("The Rotten Tomato rating is: " + response.data.Ratings[1].Value);  
  
    });
};

//Spotify
function getSongFromSpotify(songName) {

  spotify.search({ type: "track", query: songName }, function (err, data) {
    if (err) {
      return console.log("Error:" + err);
    }

    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log("======================================");
      console.log("This is the Artist: " + data.tracks.items[i].artists[0].name);
      console.log("This is the Album: " + data.tracks.items[i].album.name);
      console.log("This is the preview URL: " + data.tracks.items[i].preview_url);
      console.log("This is the song: " + data.tracks.items[i].name);

    }

  })

};

//Concert
function getConcert (artist){
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(

    function (response) {
    
        for (var i = 0; i< response.data.length; i++){
        console.log("======================================");
        console.log("This is the Name of the Venue: " + response.data[i].venue.name);
        console.log("This is the location: " + response.data[i].venue.country);
        console.log("Date of the Event: " + moment(response.data[i].datetime).format('DD-MMMM-YYYY'));

        }

    });
};

  // FS Part Show
function readFile(){
  fs.readFile("./random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    for(var i=0; i< dataArr.length ;i++){
        if(i % 2 === 0){
          // console.log(dataArr[i] + " " + dataArr[i + 1])
          compareCommand(dataArr[i],dataArr[i+1]);
        }
    }
  });

};
function compareCommand( whatFunction, searchItem){
switch(whatFunction){
  case "spotify-this-song":
  if (searchItem === undefined) {
    searchItem= "The Sign";
  }
      
      getSongFromSpotify(searchItem); 
  break;

  case "movie-this":
    if ( searchItem === undefined){
      searchItem = "Mr Nobody";
    }
    getMovie(searchItem);
  break;

  case "concert-this":
    getConcert(searchItem);
  break;

  case "do-what-it-says":
      readFile();

  break;

  default:
  break;
  }

};

compareCommand(command,process.argv[3]);

// require("dotenv").config();

// var keys = require("./keys.js")
// var fs = require("fs");
// var axios = require("axios");
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);

// var movie = process.argv[3];
// var song = process.argv[3];
// var artist = process.argv[3];
// var command = process.argv[2];


// function getMovie(movieName) {

//   axios.get("http://www.omdbapi.com/?t=" + movieName + "  &y=&plot=short&apikey=trilogy").then(
//     function (response) {
//       console.log("======================================");
//       console.log("Realease Year: " + response.data.Year);
//       console.log("The movie title is: " + response.data.Title);
//       console.log("The movie rating is: " + response.data.imdbRating);
//       console.log("The movie plot is: " + response.data.Plot);
//       console.log("The movie languages are: " + response.data.Language);
//       console.log("The actors are: " + response.data.Actors);
//       console.log("The movie country is: " + response.data.Country);
//       console.log("The Rotten Tomato rating is: " + response.data.Ratings[1].Value);
//     });
// };
// function getSongFromSpotify(songName) {

//   spotify.search({ type: "track", query: songName }, function (err, data) {
//     if (err) {
//       return console.log("Error:" + err);
//     }
//     for (var i = 0; i < data.tracks.items.length; i++) {
//       console.log("======================================");

//       console.log("This is the Artist: " + data.tracks.items[i].artists[0].name);
//       console.log("This is the Album: " + data.tracks.items[i].album.name);
//       console.log("This is the preview URL: " + data.tracks.items[i].preview_url);
//       console.log("This is the song: " + data.tracks.items[i].name);
//     }
//   })
// };
// function getConcert(artist) {
//   axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(

//     function (response) {

//       for (var i = 0; i < response.data.length; i++) {
//         console.log("======================================");
//         console.log("This is the Name of the Venue: " + response.data[i].venue.name);
//         console.log("This is the location: " + response.data[i].venue.country);
//         //this needs to be formatted as MM/DD/YYY
//         console.log("Date of the Event: " + response.data[i].datetime);
//       }
//     });
// };
// function readFile(){
//   fs.readFile("./random.txt", "utf8", function (error, data) {
  
//     if (error) {
//       return console.log(error);
//     }
//       var dataArr = data.split(",");

//       for(var i = 0; i < dataArr.length; i++){
//         if(i % 2 === 0){
//           console.log(dataArr[i] + "  " + dataArr[i + 1])
//           compareCommand(dataArr[i], dataArr[i + 1]);
//         }
//       }
//   });
// }
// function compareCommand(whatFunction, searchingFor){
//   switch (whatFunction) {
//     case "movie-this":
//       if (searchingFor === undefined) {
//         searchingFor = "Mr Nobody";
//       };
//       getMovie(searchingFor);
//       break;

//     case "spotify-this-song":
//       if (searchingFor === undefined) {
//         searchingFor = "The Sign";
//       };
//       getSongFromSpotify(searchingFor);
//       break;

//     case "concert-this":
//       getConcert(searchingFor);
//       break;

//     case "do-what-it-says":
//       readFile();
//       break;

//     default:
//       break;
//   }
// }

// compareCommand(command, process.argv[3]);

 