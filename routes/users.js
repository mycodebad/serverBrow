var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  // console.log('sssss')
  res.send('respond with a resource');
});

router.get('/error', function(req, res, next) {
  // console.log('sssss')
  let a=1,b,c;
  c=a+b.c;
  res.send('respond with a resource');
});

module.exports = router;
