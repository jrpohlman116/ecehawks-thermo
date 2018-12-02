var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var dateTimeRouter = require('./routes/editdatetime');
var setPointsRouter = require('./routes/setpoints');
var setPointTimeRouter = require('./routes/editsetpointtime');
var setPointTempRouter = require('./routes/editsetpointtemp');

var Gpio = require('onoff').Gpio;
var LED = new Gpio(21, 'out');
const sensor = require('ds18b20-raspi');
var tempInterval = new setInterval(getTempandLed, 1000);
var i =0;
var tempF = 0;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// app.get('/', function(req, res) {
//   res.render('index.ejs', {
//    title: 'Thermostat',
//    currentTemp: tempF,
//    status: 'ON'
//   });
//  });
app.use('/', indexRouter);
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
	i++;
}


module.exports = app;
