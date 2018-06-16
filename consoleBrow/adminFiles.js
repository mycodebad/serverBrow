const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const crypto = require("crypto");

function instanceDB(nameDb){
    this.adapter = new FileSync(nameDb || 'logsDb.json');
    this.db = low(this.adapter);

    this.db
        .defaults({ logs: [],middleware: []})
        .write();

    this.write=(data)=>{
        data.id = crypto.randomBytes(16).toString("hex");
        data.createdAt = Date.now();
        this.db.get('logs')
            .unshift(data)
            .write();
    }
    
    this.middleware=(data)=>{
        data.id = crypto.randomBytes(16).toString("hex");
        data.createdAt = Date.now();
        this.db.get('middleware')
            .unshift(data)
            .write();
    }

    this.list=(key,pagination)=>{
        this.db._.mixin({
            list:(array)=>{        
                console.warn(pagination)
                let page = ((pagination.page) * pagination.limit);
                let results = array.slice(page,page+pagination.limit);    
                let totalPages = 0;
                
                if((array.length%pagination.limit)==0){                    
                    totalPages = (array.length/pagination.limit);
                }else{
                    totalPages = (array.length/pagination.limit);
                    totalPages = Math.floor(totalPages);                    
                    totalPages = totalPages+1; 
                }            
                return {
                    results:results,
                    total_logs:array.length,
                    total_pages:totalPages,
                    // total_res:array.length%pagination.limit,
                    page:pagination.page,
                    limit:pagination.limit
                }
            }
        });
    
        if(pagination.type){
            if(pagination.type.toLowerCase()=='all'){
                return this.db
                    .get(key)
                    .list()
                    .value();
            }else{
                console.warn(pagination.type)
                return this.db
                    .get(key)
                    .filter({type:pagination.type.toLowerCase()})                    
                    .list()
                    .value();
            }        
        }else{
            return this.db
                .get(key)
                .list()
                .value();
        }
        
    }

    this.rangeDate=(key,initial,ending)=>{
        this.db._.mixin({
            rangeDate:(array)=>{
                let results = array.filter((val)=>{
                    return ((initial < val.createdAt)&&( val.createdAt < ending))
                });
                return results.reverse();
            }
        });
    
        return this.db
            .get(key)
            .rangeDate()
            .value();
    }
}

module.exports=instanceDB;