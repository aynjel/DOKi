var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var methodOverride = require("method-override");
var cors = require("cors");

//var https = require("https");
//const request = require('request');

var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

app.get("/posts", function (req, res) {
  console.log("posts!");
  //let r;

  // call api
  //MD000175
  //02/08/1954

 //req.send "http://10.128.18.75:8088/api/Login/Get?drcode=MD000175&birthday=02%2F08%2F1954"
 // https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY


//==================================
  const http = require('http');

  http.get('http://10.128.18.75:8088/api/Login/Get?drcode=MD000175&birthday=02%2F08%2F1954', (response) => {
    let data = '';

      // A chunk of data has been recieved.
      response.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      response.on('end', () => {
        console.log(data);
        //console.log(JSON.parse(data).explanation);

        //res.send(response);
        //res.json(response).send();
        res.send(data);
        
      });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
//==================================

});

app.listen(process.env.PORT || 8085);

// // using Request
// const request = require('request');

// //request({url: 'http://example.com', proxy: 'https://host:port'}, (error, response, body) => {

// request({url: 'http://10.128.18.75:8088/api/Login/Get?drcode=MD000175&birthday=02%2F08%2F1954', proxy: 'http://localhost:8085'}, { json: true }, (err, response, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });
// console.log(response);
  
//   res.send(response);
