module.exports = class Express {

    display(req, res) {
        try {
            let HttpCode = require('hnhttpstatuscode');
            let SeekUserByRequest = require(require('path').resolve('./src/controller/SeekUserByRequest'));
            let token = (undefined !== req.headers['authorization']) ? req.headers['authorization'] : null;
            let id = (undefined !== req.params.id) ? req.params.id : null;
            (new SeekUserByRequest()).seek(token, id, (code, data) => {
                let response = HttpCode.get(code);
                response.data = data;
                res.statusCode = code;
                res.send(response);
            });
        } catch (err) {
            let HttpCode = require('hnhttpstatuscode');
            let response = HttpCode.get(400);
            response.message += ` (${err.toString()})`;
            response.data = new Object();
            res.statusCode = 400;
            res.send(response);
        }
    }
}