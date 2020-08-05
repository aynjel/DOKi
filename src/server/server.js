var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var cors = require("cors");

var https = require("https");

var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

app.get("/posts", function (req, res) {
  console.log("posts!");

  // call api
  //MD000175
  //02/08/1954

 //req.send "http://10.128.18.75:8088/api/Login/Get?drcode=MD000175&birthday=02%2F08%2F1954"


//==================================
//const https = require('http');

https.get('https://swapi.dev/api/people/1', (res) => {
  let data = '';

  // A chunk of data has been recieved.
  res.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  res.on('end', () => {
    //console.log(JSON.parse(data).explanation);
    console.log(data);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
//==================================

  return res;
});

app.listen(process.env.PORT || 8085);
