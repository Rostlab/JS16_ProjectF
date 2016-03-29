var request = require('superagent');
var Promise = require('es6-promise').Promise;

var baseUrl = 'localhost:8080/';

var SentimentAPI = {
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
    }
};

module.exports = SentimentAPI;