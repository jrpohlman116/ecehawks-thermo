var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cayenne = require('cayennejs');

var indexRouter = require('./routes/index');
var dateTimeRouter = require('./routes/editdatetime');
var setPointsRouter = require('./routes/setpoints');
var setPointTimeRouter = require('./routes/editsetpointtime');
var setPointTempRouter = require('./routes/editsetpointtemp');


var app = express();

const port = process.env.PORT || 4000;
app.listen(port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

// Initiate MQTT API
const cayenneClient = new Cayenne.MQTT({
  username: "25e51420-f5d1-11e8-a254-e163efaadfe8",
  password: "a18088c00f74a59d3671ee73e4b8b1cb6f0f2ee4",
  clientId: "a093f6c0-f5d9-11e8-b82d-f12a91579eed"
});

cayenneClient.connect((err, mqttClient) => {
  // dashboard widget automatically detects datatype & unit
  cayenneClient.kelvinWrite(3, 65);

  // sending raw values without datatypes
  cayenneClient.rawWrite(4, 123);

  // subscribe to data channel for actions (actuators)
  cayenneClient.on("cmd9", function(data) {
    console.log(data);
  });

});

module.exports = app;
