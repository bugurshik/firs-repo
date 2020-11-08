var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).type('text/plain')
  res.send('Home page')
});
router.get('/none', function(req, res, next) {
  res.status(200).type('text/plain')
  res.send('none page')
});
module.exports = router;
