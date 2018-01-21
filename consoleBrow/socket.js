let socket = require('socket.io');
let file = require('./adminFiles')();

module.exports = function (eventEmitter){    
    let io = socket(8888);    
    eventEmitter.on('log',(data)=>{            
        data.id = Date.now();
        io.sockets.emit('log', data);        
    });

    eventEmitter.on('middleware',(data)=>{        
        io.sockets.emit('middleware', data);
    });

    eventEmitter.on('group',(data)=>{        
        io.sockets.emit('group', data);
    });

}