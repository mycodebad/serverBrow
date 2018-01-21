var express = require('express'),
    router = express.Router();
var path = require('path');

module.exports=function(app,options){

    var io = require('socket.io')(8888);
    var pathRoute = options.pathRoute ? options.pathRoute : '/_console';
    var _console= console ? console : options.log;

    _console.info = function () {
        var stack = new Error().stack;
        var fileNumber = stack.split("\n")[2].split("/").length;
        var file = stack.split("\n")[2].split("/")[fileNumber - 1].split(')')[0];
        var sendObj={};
        console.log(file);
        console.log(arguments);
        sendObj[file]=arguments;
        io.sockets.emit('console', sendObj)
    };

    _console.error = function (stack) {
        console.log(stack);
        io.sockets.emit('error', stack)
    };

    var request= {
        skip: _skip
    };

    router.get('/',function (req,res) {
        res.render('../node_modules/console-serv-brow/index.ejs');
    });

    function _skip (req, res, data){
        var request={
            body:   Object.keys(req.body).length==0 ?   null : req.body,
            params: Object.keys(req.params).length==0 ? null : req.params,
            query:  Object.keys(req.query).length==0 ?  null : req.query
        };

        io.sockets.emit('response',{
            status:res.statusCode,
            host:req.header('host'),
            method:req.method,
            request:request,
            response:data,
            url:req.protocol + '://' + req.get('host') + req.originalUrl
        });
        return false;
    }

    function _logErrors (err, req, res, next) {
        console.error(err.stack);
        next(err)
    }

    function _responseBody(req, res, next) {
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

    app.use(pathRoute,express.static(path.join(__dirname, '../console-serv-brow')));
    app.use(pathRoute,router);
    app.use(_responseBody);
    app.use(_logErrors);

    return{
        morgan:request
    };
};