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
                let page = ((pagination.page) * pagination.limit);
                let results = array.slice(page,page+pagination.limit);
                // console.warn(array);
                return {
                    results:results.reverse(),
                    total:array.length,
                    page:pagination.page,
                    limit:pagination.limit
                }
            }
        });
    
        return this.db
            .get(key)
            .list()
            .value();
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