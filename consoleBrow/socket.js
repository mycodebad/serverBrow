let socket = require('socket.io');
let admFile = require('./adminFiles');

module.exports = function (eventEmitter,nameDb){    
    let io = socket(8888);
    let file = new admFile(nameDb);

    eventEmitter.on('log',(data)=>{                    
        // _writeFile('log', data);        
        _writeFile('all', data);        
    });

    eventEmitter.on('middleware',(data)=>{              
        _writeFile('middleware', data);
    });

    eventEmitter.on('group',(data)=>{             
        // _writeFile('group', data);
        _writeFile('all', data);
    });

    io.on('connection',(socket)=>{

        socket.on('rangedate',(range)=>{            
            let results= file.rangeDate('logs',range.initial,range.ending);
            results.forEach(element => {     
                let emitKey =   element.type=='error' ? 'log':element.type;
                io.sockets.emit(emitKey, element);            
            });
        });        

        socket.on('list',(pagination)=>{            
            let data= file.list('logs',pagination);
            io.sockets.emit('list-pagination', data);                  
        });                
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