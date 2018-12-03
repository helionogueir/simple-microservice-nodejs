module.exports = class ReadSqlFile {

    constructor() {
        return false;
        Object.freeze(this);
    }

    static read(filename) {
        try {
            let fs = require('fs');
            let path = require('path');
            return fs.readFileSync(path.resolve(`./src/query/${filename}.sql`), 'utf8');
        } catch (err) {
            throw err;
        }
    }

};