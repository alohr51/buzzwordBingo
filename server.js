// Startup Express App
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Configure html template engine
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

var buzzwords = ["High-Value","Cloud","Scalability","Bluemix","PaaS","Big Data", "REST","SaaS","Watson","Git","Liberty","Node.js", "Asynchronous",
              "Multi-Threaded", "Virtualization", "Analytics", "Internet of Things", "DevOps", "Mobile", "Innovation", "Framework", "buildpack", "Runtime", "boilerplate",
              "Services","Integration", "Security" ];

// socket.io listen for messages
io.on('connection', function(socket) {  
  socket.on('init', function() {        
    socket.emit('init', buzzwords);        
  });

});

//Fisher-Yates (Knuth) Shuffle
function randomize(array){
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

  // Pick a remaining element...
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;

  // And swap it with the current element.
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
  }

  return array;
}

// handle HTTP GET request to the "/" URL
app.get('/', function(req, res) {
  res.render('index.html');
});

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
server.listen(port, host);
console.log('App started on port ' + port);