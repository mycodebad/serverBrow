let EventEmitter = require('events').EventEmitter;
let console = require('./console');
let socket = require('./socket');
let middleware = require('./middleware');

module.exports = function(app){
    let eventEmitter = new EventEmitter();
    middleware(app,eventEmitter);
    console(eventEmitter);
    socket(eventEmitter);
}