module.exports = function () {
    try {
        let uri = `/${process.env.npm_package_name}/user/v${process.env.npm_package_version}/id/:id`
        let os = require("os");
        let express = require("express");
        let app = new express();
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
            next();
        });
        app.get(uri, (req, res) => {
            try {
                let Express = require(require('path').resolve('./src/view/Express'));
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Content-Type", "application/json");
                (new Express()).display(req, res);
            } catch (err) {
                let HttpCode = require('hnhttpstatuscode');
                let response = HttpCode.get(500);
                response.message += ` (${err.toString()})`;
                response.data = new Object();
                res.send(response);
            }
        });
        return app.listen(80, function () {
            try {
                let networkInterfaces = os.networkInterfaces();
                console.info(Date() + " | Server Start");
                console.info(`URI | http://${networkInterfaces.eth0[0].address}${uri}`);
            } catch (err) {
                console.error(err);
                process.exit();
            }
        });
    } catch (err) {
        console.error(err);
        process.exit();
    }
}();