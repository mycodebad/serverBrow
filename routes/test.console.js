var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/log-single', function(req, res, next) {
//   Test console 
  console.log('Libertando América');  

  res.json({
      status:'Test Console.log string'
  });
});

router.get('/log-object',function(req,res,next){
    console.log({
        "checked": false,
        "dimensions": {
          "width": 5,
          "height": 10
        },
        "id": 1,
        "name": "A green door",
        "price": 12.5,
        "tags": [
          "home",
          "green"
        ]
      });

    console.log('data1')
    console.log('data2')

    res.json({
        status:'Test Console.log Object'
    });
});

router.get('/log-array',function(req, res, next){
    console.log([
        {
            "$id": "/properties/checked", 
            "type": "boolean", 
            "title": "The Checked Schema", 
            "description": "An explanation about the purpose of this instance.", 
            "default": false, 
            "examples": [
                false
            ]
        },
        {
            "$id": "/properties/checked", 
            "type": "boolean", 
            "title": "The Checked Schema", 
            "description": "An explanation about the purpose of this instance.", 
            "default": false, 
            "examples": [
                false
            ]
        }
      ]);
    res.json({
        status:'Test Console.log Array'
    });
});

router.get('/log-multiple',function(req, res, next){
    
    console.log("The Beatles", {
        "$id": "/properties/checked", 
        "type": "boolean", 
        "title": "The Checked Schema", 
        "description": "An explanation about the purpose of this instance.", 
        "default": false, 
        "examples": [
            false
        ]
    },[
        "home",
        "green"
      ]);
    res.json({
        status:'Test Console.log multiple'             
    });
});

router.get('/group',function(req, res, next){
    let number = req.query.number ? req.query.number : 8;    
    let reg = /^\d+$/;    
    if(reg.test(number)){
        let result=fact(number,number-1);
        console.groupKeyEnd('fact',result);
        res.json({
            status:'Test Console.group',        
            result:result
        });
    }else{
        res.json({
            status:'Necesito un Numero Natural',        
            error:true
        });

    }
    
});


router.get('/error', function(req, res, next) {  
  let a=1,b,c;
  c=a+b.c;
  res.send('respond with a resource');
});

function fact(n,m){    
    if(m==0){
        return n;
    }else{
        console.groupKey('fact',`${n} x ${m}= ${n*m}` );
        return fact(n*m,m-1)
    }
} 

module.exports = router;
