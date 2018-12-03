var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');
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
var tempInterval = setInterval(getTempandLed, 1000);
var i = 0;
var tempF = 40;
var socket = require('socket.io')

var offset = 0;

var weekday = 0;
var weekend = 0;
var setpointNum = 0;   //set point number 1-4
var isActive = 0;    //onoff
var setpointTemp = 0;  //setpoint temp val
var setpointTime = 0;  //setpoint time val
var setpointMode = 0;  //auto heat or cool 


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
  firebase.database().ref('/year').update({
    year: n
  });
}

theyear();

function updateJSON(time) {
  let timeNum = new Number(time)
  var obj = {
    time: null
  }

  obj.time = timeNum;
  json = JSON.stringify(obj);
  fs.writeFileSync('ecehawks.json', json)

  console.log('json = ' + timeNum);
  firebase.database().ref('/').update({
    offset: timeNum
  })
}

function updateSetPoints() {


  let setTime = new Number(setpointTime); // Time in milliseconds
  let setpTemp = new Number(setpointTemp); // tmep in F
  let mode = new Number(setpointMode); // 0,1,2,3 => none,ac,heat,auto
  let is_active = new Number (isActive); // 0 or 1 

  if(weekday == 0){
    weekendday = '/weekend/';
  } else {
    weekendday = '/weekday/'
  }
  
  weekendday += setpointNum

  console.log('updating setpoints in appjs')
  console.log('weekendday = ' + weekendday + ' time = ' + setTime + ' temp = ' + setpointTemp + ' mode = ' + mode + ' isactive = ' + is_active);
  firebase.database().ref(weekendday).update({
    is_active: is_active,
    is_set: true,
    mode: mode,
    temp: setpTemp,
    time: setTime 
  })
  console.log("setpoints updated in appjs");

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
    offset = data.offsettime
    updateJSON(offset);
    io.sockets.emit('time', data);
  });

  socket.on('setpoint', function(data){
    weekday = data.weekday
    weekend = data.weekend
    setpointNum = data.setpointNum
    isActive = data.isActive
    setpointTemp = data.setpointTemp
    setpointTime = data.setpointTime
    setpointMode = data.setpointMode
    updateSetPoints();
  });



  socket.on('setpointday', function(data){
    isActive = data.isActive
    weekday = data.weekday
    weekend = data.weekend
    setpointNum = data.setpointNum
    console.log("in setpoint day")
  });

  socket.on('setpointtime', function(data){
    setpointTime = data.setpointTime
    console.log("in setpoint time")
  });

  socket.on('setpointtemp', function(data){
    setpointTemp = data.setpointTemp
    setpointMode = data.setpointMode
    console.log("in setpoint temp")
    updateSetPoints();
  });


});








app.get('/', function (req, res) {
  res.locals.tempF = tempF;
  var firebaseOffset
  var ref = firebase.database().ref('/').once('value').then(function(snapshot) {
    firebaseOffset = snapshot.child('offset').val();
  });
  
  res.locals.timeOffset = firebaseOffset;
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

