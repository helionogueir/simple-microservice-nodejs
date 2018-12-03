module.exports = class SeekUserById {

    constructor(driver) {
        this._driver = driver;
        Object.freeze(this);
    }

    seek(id, next) {
        try {
            let File = require(require('path').resolve('./src/business/ReadSqlFile'));
            this._driver.dbal.raw(File.read('users'), {
                id: id
            }).asCallback(function (err, result) {
                if (err) throw err;
                if ((undefined != result[0]) && (result[0] instanceof Array) && result[0].length) {
                    result[0].forEach(row => {
                        if ((undefined !== row.id) && (undefined !== row.name)) {
                            next(row);
                        }
                    });
                } else {
                    next(null);
                }
            });
        } catch (err) {
            throw err;
        }
    }

};