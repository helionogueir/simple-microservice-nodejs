module.exports = class Database {

    constructor() {
        try {
            this._dbal = null;
            this._connect();
            Object.freeze(this);
        } catch (err) {
            throw err;
        }
        return this;
    }

    get dbal() {
        return this._connect();
    }

    _connect() {
        try {
            if (null === this._dbal) {
                let cfg = require(require('path').resolve('./config.json'));
                let knex = require('knex');
                this._dbal = new knex({
                    client: cfg.dsn.driver,
                    acquireConnectionTimeout: cfg.dsn.timeout,
                    connection: {
                        host: cfg.dsn.host.read,
                        user: cfg.dsn.username,
                        password: cfg.dsn.password,
                        database: cfg.dsn.dbname,
                        charset: cfg.dsn.charset,
                        port: cfg.dsn.port
                    }
                });
            }
        } catch (err) {
            throw err;
        }
        return this._dbal;
    }

    close() {
        try {
            if (null !== this._dbal) {
                this._dbal.destroy();
            }
        } catch (err) {
            throw err;
        }
    }

};