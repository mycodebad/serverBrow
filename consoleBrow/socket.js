let socket = require('socket.io');
let admFile = require('./adminFiles');

module.exports = function (eventEmitter,nameDb){    
    let io = socket(8888);
    let file = admFile(nameDb);

    eventEmitter.on('log',(data)=>{                    
        _writeFile('log', data);        
    });

    eventEmitter.on('middleware',(data)=>{              
        _writeFile('middleware', data);
    });

    eventEmitter.on('group',(data)=>{             
        _writeFile('group', data);
    });

    let _writeFile=(emitKey,data)=>{
        data.id = Date.now();
        if(emitKey=='middleware'){
            file.middleware(data);   
        }else{
            file.write(data);   
        }        
        io.sockets.emit(emitKey, data);
    }

}