var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('scheduler', { title: 'Set Points' });
});

module.exports = router;
