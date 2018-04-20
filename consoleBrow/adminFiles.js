let fs = require('fs');
let path = require('path');
module.exports = function(){
    let lib  = `${path.join(path.dirname(fs.realpathSync(__filename)))}/`;
    console.log("lib");
    console.log(lib);    
    let read = (path)=>{
        return new Promise((resolve, reject)=>{
            fs.readFile(lib+path,{
                flag:'a+',
                encoding:'utf8'
            },( err, data)=>{
                if(err){
                    console.warn('eeeee')
                    reject(err);
                }else{
                    console.warn('daaa')
                    console.warn(data=='')
                    
                    resolve(data);
                }                
            });
        })        
    }

    let update = (path,data)=>{
        // return new Promise((resolve, reject)=>{
        //     fs.readFile(lib+path,'utf8',( err, result)=>{
        //         if(err){
        //             console.warn("errrrr");                
        //             reject(err);
        //         }else{
        //             console.warn("result");
        //             console.warn(result=='');                    
        //             let table = result=='' ? [] : JSON.parse(result);
        //             table.unshift(data)
        //             console.warn(table)
        //             fs.writeFile(path,JSON.stringify(table),'utf8',(error,data)=>{
        //                 if(error){
        //                     reject(error);
        //                 }else{
        //                     resolve(table);
        //                 }
        //             });                    
        //         }                
        //     });
        // })
        
        return new Promise((resolve, reject)=>{
            fs.readFile(lib+path,'utf8',( err, result)=>{
                if(err){
                    console.warn("errrrr");                
                    reject(err);
                }else{
                    console.warn("result");
                    console.warn(result);                    
                    let table = result=='' ? [] : JSON.parse(result);
                    table.unshift(data)
                    console.warn(table)
                    fs.writeFile(path,JSON.stringify(table),'utf8',(error,data)=>{
                        if(error){
                            reject(error);
                        }else{
                            resolve(table);
                        }
                    });                    
                }                
            });
        })
    }

    return {
        read:read,
        update:update
    }
} 