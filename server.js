var express = require("express"); 
var app = express();
var bodyParser = require("body-parser");
var path = require("path")
const https = require('https')

//Set options for accessing the Dad Jokes API
const options = {
  hostname: 'icanhazdadjoke.com',
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
}

// Set the Server Port
var PORT  = process.env.PORT || 8080

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', 'localhost/', port);
});


app.use(express.static(path.join(__dirname,"/build")));// Invoking our middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//GET DAD JOKE ENDPOINT
app.get('/getdadjoke', function (req, res) {

  var request = https.request(options, response => {
  console.log(`statusCode: ${response.statusCode}`)

    response.on('data', d => {

      //Convert data response object to string
      var dString = d.toString() 
      //Convert string to json object
      var dJSON =  JSON.parse(dString)

      console.log(d.toString())

      res.send(dJSON)
    })
    
  })

  request.on('error', error => {
    console.error(error)
  })

  request.end()
})

//GET STATUS ENDPOINT
app.get('/status', function (req, res) {
  res.send('APIs working...')
})

