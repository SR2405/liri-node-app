require('dotenv').config();

var keys = require('./keys.js')
var fs = require("fs");
var axios = require("axios");

var movie = process.argv[2];

// keys.connect({
//     id: process.env.SPOTIFY_ID,
//     secret: process.env.SPOTIFY_SECRET
// })

axios.get("http://www.omdbapi.com/?t=" + movie.replace (" ", "+") + "  &y=&apikey=trilogy").then(
  function(response) {
    console.log("The movie title is: " + response.data.title);
  }
);
var spotify = new spotify(keys.spotify);

// spotify.search ({type:'track', query:'All Small Things'}, function(err,data){
//     if (err){
//         return console.log('Error:' + err);
//     }

//     console.log(data);
// });


axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")