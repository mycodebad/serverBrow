let fs = require('fs');

module.exports = function(){
    let read = (path)=>{
        return new Promise((resolve, reject)=>{
            fs.readFile(path,( err, data)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(JSON.parse(data));
                }                
            });
        })        
    }

    let update = (path,data)=>{
        return new Promise((resolve, reject)=>{
            fs.readFile(path,( err, result)=>{
                if(err){
                    reject(err);
                }else{
                    let table = JSON.parse(result);
                    table.unshift(data)
                    fs.writeFile(path,JSON.stringify(table),'utf8');
                    resolve(table);
                }                
            });
        })        
    }

    return {
        read:read,
        update:update
    }
} 