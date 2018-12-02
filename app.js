var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var url = require('url');
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var HeatLED = new Gpio(21, 'out'); //use GPIO pin 4 as output
var CoolingLED = new Gpio(20, 'out'); //use GPIO pin 4 as output
//var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  var path = url.parse(req.url).pathname; // pathname = '/MyApp'
  switch (path) {
    case '/':
      fs.readFile(__dirname + '/views/index.ejs', function(err, data) { //read file index.html in public folder
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
          return res.end("404 Not Found");
        } 
        res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
        res.write(data); //write data from index.html
        return res.end();
      });
      break;
    case '/setpoint':
      fs.readFile(__dirname + '/views/scheduler.ejs', function(err, data) { //read file index.html in public folder
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
          return res.end("404 Not Found");
        } 
        res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
        res.write(data); //write data from index.html
        return res.end();
      });
      break;
    case '/setpoint/':
      fs.readFile(__dirname + '/views/scheduler.ejs', function(err, data) { //read file index.html in public folder
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
          return res.end("404 Not Found");
        } 
        res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
        res.write(data); //write data from index.html
        return res.end();
      });
    break;
    default:
        res.writeHead(404);
        res.write('Route not defined');
        res.end();
}
  
}


io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
/*   pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    lightvalue = value;
    socket.emit('light', lightvalue); //send button status to client
  }); */
  socket.on('heat', function(data) { //get light switch status from client
    lightvalue = data;
    if (lightvalue != HeatLED.readSync()) { //only change LED if status has changed
      HeatLED.writeSync(lightvalue); //turn LED on or off
    }
  });
  socket.on('ac', function(data) { //get light switch status from client
    lightvalue = data;
    if (lightvalue != CoolingLED.readSync()) { //only change LED if status has changed
      HeatLED.writeSync(lightvalue); //turn LED on or off
    }
  });
});

process.on('SIGINT', function () { //on ctrl+c
  HeatLED.writeSync(0); // Turn LED off
  HeatLED.unexport(); // Unexport LED GPIO to free resources
  //pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});
