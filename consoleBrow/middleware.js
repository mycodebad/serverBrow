var express = require('express'),
    router = express.Router();
var path = require('path');
require('./console');
module.exports=function(app,eventEmitter){     
    let _skip=(req, res, data)=>{
        var request={
            body:   Object.keys(req.body).length==0 ?   null : req.body,
            params: Object.keys(req.params).length==0 ? null : req.params,
            query:  Object.keys(req.query).length==0 ?  null : req.query
        };

        eventEmitter.emit('middleware',{
            status:res.statusCode,
            headers:req.headers,
            host:req.header('host'),
            method:req.method,
            request:request,
            response:data,
            url:req.protocol + '://' + req.get('host') + req.originalUrl
        });        
    } 

    let _responseBody=(req, res, next)=>{
        var oldJson = res.json;
        var oldRender = res.render;
        
        res.json= function(data){
            _skip(req,res,data);
            oldJson.apply(res, arguments);
        };

        res.render = function(view,data){
            _skip(req,res,data);
            oldRender.apply(res, arguments);
        };
        next();
    }
    
    app.use(_responseBody);    
};