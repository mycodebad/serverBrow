const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = (nameDb)=>{
    const adapter = new FileSync(nameDb || 'logsDb.json');
    const db = low(adapter);

    db.defaults({ logs: [],middleware: []})
    .write();

    let write=(data)=>{
        db.get('logs')
            .unshift(data)
            .write();
    }
    let middleware=(data)=>{
        db.get('middleware')
            .unshift(data)
            .write();
    }

    return {
        write:write,
        middleware:middleware
    }
}