let socket = require('socket.io');
let admFile = require('./adminFiles');
var path = require('path');

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
        
        socket.on('file',(data)=>{
            console.warn('file',data);
            if(!data.line){
                return false;
            }
            let limit = 3    
            let lineArray = data.line.split(':')
            let lineNumber = parseInt(lineArray[lineArray.length-2]);
            let line = lineArray.slice(0,lineArray.length-2).join();        
            let fileLoc = path.resolve(line);
            let start=lineNumber-limit,
                end=limit+lineNumber        
            let str='';
            let codeJson=[];
            let htmlTable = `<table style="white-space:pre;border-collapse: collapse;min-width:600px" border="0">
            <tr style="background:#2F333D;color:white;">
              <th style="border-right: 1px solid #dddddd;padding:7px 12px">#</th>
              <th style="padding:7px">Code</th>          
            </tr>
          `
    
            let lineByline = require('line-by-line'),
                lr = new lineByline(fileLoc),
                count =0;
    
            lr.on('error',(e)=>{
                console.warn("error");
                console.warn(e);
            })
    
            lr.on('line',(line)=>{
                count++;
                if((count>=start)&&(count<=end)){
                    str = `${str}\n${line}`;
                    htmlTable = `${htmlTable}<tr style="${count == lineNumber? 'background:#E5FFEF;':'background:#ffffff;'}">
                    <td style="border-right: 1px solid #dddddd;padding:4px;text-align: center">${count}</td>
                    <td style="padding:4px;">${line}</td>          
                  </tr>`

                  codeJson.push(
                    {
                        "numLine":count, // numero de linea
                        "textLine":line, // texto de la linea
                        "isThisLine":count == lineNumber // si es la linea que manda el console
                    }
                  )
                }            
            })
            
            lr.on('end',()=>{
                htmlTable = `${htmlTable}</table>`                         
                // res.json({
                //     codeHtml:htmlTable
                // });
                // console.log('emit ' ,htmlTable)
                io.sockets.emit('view-file',{
                    codeHtml:htmlTable,
                    codeJson:codeJson
                })
                // socket.emit('view-file',{
                //     codeHtml:htmlTable,
                //     codeJson:codeJson
                // })
            })
        })
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