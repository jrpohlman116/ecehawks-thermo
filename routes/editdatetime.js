var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('editdatetime', { title: 'Edit Date/Time', data: '55'});
});

module.exports = router;
