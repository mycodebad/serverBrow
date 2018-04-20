var express = require('express');
var router = express.Router();
let external = require('./external');

/* GET home page. */
let cons = require('../consoleBrow/test');
router.get('/', function(req, res, next) {
  console.groupKey('index',"Adrian Pedro");
  // console.log('asdfasdf');
  // console.log('pppppp');
  // console.log('2222222');
  // cons();
  console.groupKey('index',"Zelada Torrez");
  console.groupKeyEnd('index');
  // result('hola Adios'); 

  // setTimeout(()=>{
  //   console.groupKey('index',"Imilla","Pascual","Negrito");
  //   // console.groupKeyEnd('index');        
  //   external();
  // },3000)
  res.render('index', { title: 'Express' });  
});

router.get('/data', function(req, res, next) {
  console.log('error alguno');
  console.groupKey('data',"Arnol");
  console.groupKey('data',"Arnol");
  console.groupKey('data',"Arnol");
  console.groupKey('data',"Arnol");
  console.groupKey('data',"Arnol");
  console.groupKey('data',"Arnol");
  console.groupKey('data',"Arnol");
  console.groupKeyEnd('data');
  res.json({
    name:'Adrian',
    lastName:'Zelada Torrez'
  })
})

module.exports = router;

function result(t){
  console.log(t);
  console.log('adsasdasda')
  console.groupKey('index',"ChiCho");  
}
