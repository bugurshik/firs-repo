var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
//router.get('/cool', function(req, res, next) {
 // res.render('home1.ejs');
//});
router.get('/cool', function(req, res, next) {
  res.render('index', { title: 'Cool' });
});
router.get('/',function(req,res){
  res.sendFile(path.dirname(__dirname)+'/views/index.html');
});
/*
router.get('/page/:id', function(req, res, next) {
  res.send('index' + req.params.id);
});
*/
module.exports = router;
