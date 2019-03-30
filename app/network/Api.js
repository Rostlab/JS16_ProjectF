var request = require('superagent');
var Promise = require('es6-promise').Promise;

var baseUrl = process.env.__PROTOCOL__ + process.env.__API__ + ((process.env.__PORT__ !== undefined) ? ':' + process.env.__PORT__ : '') + process.env.__PREFIX__;
var baseUrlNew = process.env.__API_NEW_PROTOCOL__ + process.env.__API_NEW__ + ((process.env.__API_NEW_PORT__ !== undefined) ? ':' + process.env.__API_NEW_PORT__ : '') + process.env.__API_NEW_PREFIX__;

var Api = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            request
                .get(baseUrl + url)
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },
    getNew: function (url) {
        return new Promise(function (resolve, reject) {
            request
                .get(baseUrlNew + url)
                .end(function (err, res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },
};

module.exports = Api;