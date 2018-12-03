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
var LED = new Gpio(21, 'out');
const sensor = require('ds18b20-raspi');
var firebase = require("firebase/app");
var tempInterval = new setInterval(getTempandLed, 1000);
var i =0;
var tempF = 0;

var app = express();
var myFirebaseRef = new firebase("https://ecehawks-thermo.firebaseio.com/");
var server = app.listen(3000, function(){
  console.log('listening for requests');
});

// const PORT = process.env.PORT || 3000;

// var wss = new SocketServer({ port: 3001 });

// wss.on('connection', (ws) => {
//   console.log("Connected")
//   ws.on('close', () => console.log('Disconnected'))
// });




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.get('/', function(req, res) {
  res.locals.tempF = tempF;
  res.render('index.ejs');

});
app.use('/editdatetime', dateTimeRouter);
app.use('/setpoints', setPointsRouter);
app.use('/setpoints/edit/time', setPointTimeRouter);
app.use('/setpoints/edit/temp', setPointTempRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function getTempandLed(){
	if(i % 2 == 0){
		LED.writeSync(0);
	}
	else{
		LED.writeSync(1);
  }
  tempF = sensor.readSimpleF(1);
  tempF = Math.round(tempF)
  myFirebaseRef.set({
	  temp_F: tempF
  });
  i++;
}


module.exports = app;

