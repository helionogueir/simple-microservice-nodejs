module.exports = class SeekUserByRequest {

    seek(token, id, next) {
        try {
            // Token
            let ValidateToken = require(require('path').resolve('./src/business/ValidateToken'));
            if ((new ValidateToken()).verify(token)) {
                // Database
                let Database = require(require('path').resolve('./src/driver/Database'));
                let database = new Database();
                // User
                let SeekUserById = require(require('path').resolve('./src/business/SeekUserById'));
                let seekUserById = new SeekUserById(database);
                // Execute
                seekUserById.seek(id, function (user) {
                    try {
                        database.close();
                        if (null !== user) {
                            console.info(user);
                            console.info("\n");
                            next(200, user);
                        } else {
                            next(204, {});
                        }
                    } catch (err) {
                        throw err;
                    }
                });
            } else {
                next(401, {});
            }
        } catch (err) {
            throw err;
        }
    }

};