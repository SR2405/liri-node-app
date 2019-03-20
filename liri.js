require('dotenv').config();

var keys = require('./keys.js')
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");

var movie = "";
var userInput = process.argv;

var parameter = process.argv[3];

// console.log(userInput);

for (var i= 2;i<process.argv.length;i++){

    if(i===2){
        movie += process.argv[i];
    } 

    else {
        movie += "+" + process.argv[i];

    }

}

// console.log(movie);
// keys.connect({
//     id: process.env.SPOTIFY_ID,
//     secret: process.env.SPOTIFY_SECRET
// })


axios.get("http://www.omdbapi.com/?t=" + movie + "  &y=&apikey=trilogy").then(
  function(response) {
    //   console.log(response.data);
    // console.log("The movie title is: " + response.data.Title);
    //response.data."pull what info you need - capital letters where needed"
  }
);

var spotify = new Spotify(keys.spotify);


spotify.search ({type:'track', query: parameter}, function(err,data){
    if (err){
        return console.log('Error:' + err);
    }

    // console.log(data.tracks.items[0].album.name);
    for (var i=0;i<data.tracks.items.length;i++){

            // console.log(data.tracks.items[i].album.name);
            console.log("this is the Artist:" + data.tracks.items[i].artists[i].name);
            console.log("this is the Album:" + data.tracks.items[i].album.name);
            console.log( "this is the preview URL:" + data.tracks.items[i].preview_url);



    }
});


// axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")