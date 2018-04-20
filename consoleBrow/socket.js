let socket = require('socket.io');
let file = require('./adminFiles')();

module.exports = function (eventEmitter){    
    let io = socket(8888);
    file.read('log.json').then((data)=>{
        console.warn("data");
        console.warn(data);        
    }).catch((e)=>{
        console.warn("error");
        console.warn(e);  
    })    

    eventEmitter.on('log',(data)=>{            
        // data.id = Date.now();
        // io.sockets.emit('log', data);     
        file.update('log.json',data).then((d)=>{
            console.warn("data");
            console.warn(d);  
            data.id = Date.now();
            io.sockets.emit('log', data);          
        }).catch((e)=>{
            console.warn("error");
            console.warn(e);  
        })      
    });

    eventEmitter.on('middleware',(data)=>{        
        io.sockets.emit('middleware', data);
    });

    eventEmitter.on('group',(data)=>{        
        io.sockets.emit('group', data);
    });

}