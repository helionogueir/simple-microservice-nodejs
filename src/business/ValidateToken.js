module.exports = class ValidateToken {

    verify(token) {
        try {
            let cfg = require(require('path').resolve('./config.json'));
            let jsonwebtoken = require("jsonwebtoken");
            let payload = jsonwebtoken.verify(
                token,
                cfg.jsonwebtoken.secretOrPrivateKey,
                cfg.jsonwebtoken.options
            );
            return (payload.publicOrAccessKey == cfg.jsonwebtoken.publicOrAccessKey) ? true : false;
        } catch (err) {
            return false;
        }
    }

};