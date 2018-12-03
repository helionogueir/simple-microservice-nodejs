let jsonwebtoken = require("jsonwebtoken");
let cfg = require(require('path').resolve('./config.json'));
let payload = new Object({
    exp: Math.floor(Date.now() / 1000) + 60,
    publicOrAccessKey: cfg.jsonwebtoken.publicOrAccessKey
});
delete cfg.jsonwebtoken.options.clockTolerance;
console.info('Authorization: ' + jsonwebtoken.sign(payload, cfg.jsonwebtoken.secretOrPrivateKey, cfg.jsonwebtoken.options));