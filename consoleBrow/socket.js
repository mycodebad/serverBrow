let socket = require('socket.io');
let admFile = require('./adminFiles');

module.exports = function (eventEmitter,nameDb){    
    let io = socket(8888);
    let file = new admFile(nameDb);

    eventEmitter.on('log',(data)=>{                    
        _writeFile('log', data);        
    });

    eventEmitter.on('middleware',(data)=>{              
        _writeFile('middleware', data);
    });

    eventEmitter.on('group',(data)=>{             
        _writeFile('group', data);
    });

    io.on('connection',(socket)=>{

        socket.on('rangedate',(range)=>{
            console.warn("rangedate")
            console.warn(range)
            let results= file.rangeDate('logs',range.initial,range.ending);
            results.forEach(element => {     
                let emitKey =   element.type=='error' ? 'log':element.type;
                io.sockets.emit(emitKey, element);            
            });
        });        

        socket.on('list',(pagination)=>{
            console.warn("list")
            console.warn(pagination)
            let data= file.list('logs',pagination);
            io.sockets.emit('list-pagination', data);
            // results.forEach(element => {     
            //     let emitKey =   element.type=='error' ? 'log':element.type;
            //     io.sockets.emit(emitKey, element);            
            // });
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
    // 1524274173200,1524274177000
    // io.on('rangedate',(range)=>{
    //     console.warn("rangedate")
    //     console.warn(data)
    //     let results= file.rangeDate('logs',range.initial,range.ending);
    //     results.forEach(element => {     
    //         let emitKey =   element.type=='error' ? 'log':element.type;
    //         io.sockets.emit(emitKey, element);            
    //     });
    // });

    // setTimeout(()=>{                
    //     let results= file.rangeDate('logs',1524274173200,1524274177000);
    //     results.forEach(element => {     
    //         let emitKey =   element.type=='error' ? 'log':element.type;
    //         io.sockets.emit(emitKey, element);            
    //     });
    // },4000);

}