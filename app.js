var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const SocketServer = require('ws').Server;

var indexRouter = require('./routes/index');
var dateTimeRouter = require('./routes/editdatetime');
var setPointsRouter = require('./routes/setpoints');
var setPointTimeRouter = require('./routes/editsetpointtime');
var setPointTempRouter = require('./routes/editsetpointtemp');


var Gpio = require('onoff').Gpio;
var LEDred = new Gpio(21, 'out');
var LEDblue = new Gpio(20, 'out');

const sensor = require('ds18b20-raspi');
var tempInterval = new setInterval(getTempandLed, 1000);
var i = 0;
var tempF = 40;
var socket = require('socket.io')

var offset = 0;

// firebase shit
var firebase = require("firebase");
var config = {
  apiKey: "AIzaSyBDyKSNajDBOI9NlelS8D9LI7NkIP0oXxc",
  authDomain: "ecehawks.firebaseapp.com",
  databaseURL: "https://ecehawks.firebaseio.com",
};
firebase.initializeApp(config);

n = 2000

function theyear() {
  n = n + 1;
  firebase.database().ref('/').update({
    year: n
  });
}

theyear();

function updateJSON(time) {
  offset = new Date(time);
  console.log("updating json in appjs");
  firebase.database().ref('/datetime/').update({
    year: offset.getFullYear(),
    month: offset.getMonth(),
    day: offset.getDate(),
    hour: offset.getHours(),
    minute: offset.getMinutes()
  })
  console.log("it's done in appjs");

}

var app = express();
var server = app.listen(3000, function () {
  console.log('listening for requests on 3000');
});

var heat = 0;
var ac = 0;
var auto = 0;
var settemp = 60;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

var io = socket(server);
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);
  //io.sockets.emit('temp', tempF); 
  socket.on('status', function(data){
      heat = data.heat;
      ac = data.ac;
      auto = data.auto;
  });

  socket.on('set', function (data) {
    settemp = data.stemp

  });

  socket.on('time', function (data) {
    console.log("FUCK GIT")
    offset = data.offsettime
    updateJSON(offset);
    io.sockets.emit('time', data);
  });

});




app.get('/', function (req, res) {
  res.locals.tempF = tempF;
  res.render('index.ejs');
});
app.use('/editdatetime', dateTimeRouter);
app.use('/setpoints', setPointsRouter);
app.use('/setpoints/edit/time', setPointTimeRouter);
app.use('/setpoints/edit/temp', setPointTempRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function getTempandLed() {
  //message out to all sockets connected the temp
  tempF = sensor.readSimpleF(1);
  tempF = Math.round(tempF);
  var status = 'OFF';

  io.sockets.emit('temp', tempF);



  if(heat != 0){
    if(settemp >= tempF){
      LEDred.writeSync(1);
      LEDblue.writeSync(0);  
      status = 'Heat On';    
    }
    else{
      LEDred.writeSync(0);
      LEDblue.writeSync(0); 
      status = 'OFF';     
    }
  }

  if (ac != 0) {
    console.log("in ac");
    if (tempF > settemp) {
      LEDblue.writeSync(1);
      LEDred.writeSync(0);
      status = 'AC On';      
    }
    else {
      LEDblue.writeSync(0);
      LEDred.writeSync(0);
      status = 'OFF';      
    }
  }

  if (auto != 0) {
    if (settemp > tempF) {
      LEDred.writeSync(1);
      LEDblue.writeSync(0);
      status = 'Heat On';
    }
    else if (settemp == tempF) {
      LEDred.writeSync(0);
      LEDblue.writeSync(0);
      status = 'OFF';
    }
    else {
      LEDred.writeSync(0);
      LEDblue.writeSync(1);
      status = 'AC On';
    }
  }

  io.sockets.emit('hvac-status', status);
}


module.exports = app;

