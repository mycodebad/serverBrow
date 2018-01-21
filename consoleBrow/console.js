module.exports=function(eventEmitter){    
    let _console = console;
    let logs = console.log;
    let info = console.info;
    let error = console.error;    
    let group = {};
        
    _console.info = (...args)=>{    
        let stack = new Error().stack;
        let path = regex(stack);    
        emitLog(path,'info',args);       
        info.apply(_console,args);
    }

    _console.log = (...args)=>{
        let stack = new Error().stack;    
        let path = regex(stack);  
        emitLog(path,'log',args);                     
        logs.apply(_console,args);
    }

    _console.error = (stack)=>{  
        let file = JSON.stringify(stack.split("\n")[1]);
        let path = file.slice(8,file.length-1);                              
        let viewPath = `\n===>>> ${path}`;      
        console.warn('\x1b[31m%s\x1b[32m',viewPath);                
        console.warn('\x1b[33m%s\x1b[32m',stack);
        eventEmitter.emit('log',{
            type:'error',
            line:path,
            data:stack
        });
    }

    _console.groupKey = (...args)=>{
        let key = args[0];
        let data = args.slice(1,args.length);
        let stack = new Error().stack;            
        group[key] = group[key] ? group[key] : [];        
        let path = regex(stack);
        group[key].push({
            type:'group',
            group:key,
            line:path,
            data:data
        })
    }

    _console.groupKeyEnd = (...args)=>{
        let key = args[0];  
        let data = args.slice(1,args.length);        
        let stack = new Error().stack;                  
        let path = regex(stack);
        if(group[key]){
            group[key].push({
                type:'group',
                group:key,
                line:path,
                data:data
            })
            eventEmitter.emit('group',{
                type:"group",
                group:key,
                line:path,
                data:group[key]
            });
            console.warn('\x1b[35m%s\x1b[33m',`<==== \tGroup "${key}" \t====>`);            
            group[key].forEach((val)=>{
                let viewPath = `\n=> ${val.line}`;                          
                console.warn('\x1b[36m%s\x1b[32m',viewPath);
                console.warn('\x1b[32m%s\x1b[32m',val.data);                
            });
            console.warn('\x1b[35m%s\x1b[33m',`<==== \tEnd Group "${key}" \t====>`);                        
            delete group[key];
        }
    }
    

    function regex(stack){    
        let regExp = /\(([^)]+)\)/;              
        let pathFile = stack.split("\n")[2];
        let reg = regExp.exec(pathFile);
        let path;        
        if(reg){
            path=reg[1];
        }else{
            let file = JSON.stringify(pathFile);
            path = file.slice(8,file.length-1);
        }            
        return path;        
    }

    function emitLog(path,key,args){
        let viewPath = `\n===>>> ${path}`;                          
        console.warn('\x1b[36m%s\x1b[32m',viewPath);
        eventEmitter.emit('log',{
            type:key,
            line:path,
            data:args
        });
    }
};