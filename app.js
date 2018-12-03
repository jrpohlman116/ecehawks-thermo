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
var i =0;
var tempF = 40;
var socket = require('socket.io')

var app = express();
var server = app.listen(3000, function(){
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
      console.log("IM IN THE STATUS LISTENER")
  });

  socket.on('set', function(data){
      settemp = data.stemp
  });


});




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
  //message out to all sockets connected the temp
  tempF = sensor.readSimpleF(1);
  tempF = Math.round(tempF);

  io.sockets.emit('temp', tempF);

  console.log('heat = ' + heat + 'ac = ' + ac + 'auto = ' + auto);


  if(heat != 0){
    if(settemp >= tempF){
      LEDred.writeSync(0);
      LEDblue.writeSync(0);      
    }
    else{
      LEDred.writeSync(1);
      LEDblue.writeSync(0);      
    }
  }
  else if(ac != 0){
    if(settemp <= tempF){
      LEDblue.writeSync(0);
      LEDred.writeSync(0);      
    }
    else{
      LEDblue.writeSync(1);
      LEDred.writeSync(0);      
    }
  }
  else if(auto != 0){
    if(settemp > tempF){
      LEDred.writeSync(1);
      LEDblue.writeSync(0);
    }
    else if(settemp == tempF){
      LEDred.writeSync(0);
      LEDblue.writeSync(0);
    }
    else{
      LEDred.writeSync(0);
      LEDblue.writeSync(1);
    }
  }

}


module.exports = app;

