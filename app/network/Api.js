var request = require('superagent');
var Promise = require('es6-promise').Promise;

var baseUrl = 'https://got-api.bruck.me/api/'

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
    }
    // ,
    // post: function (url,object) {
    //     return new Promise(function (resolve, reject) {
    //         request
    //             .post(baseUrl + url)
    //             .send(object)
    //             .end(function (err, res) {
    //                 if (res.status === 404) {
    //                     reject();
    //                 } else {
    //                     resolve(JSON.parse(res.text));
    //                 }
    //             });
    //     });
    // }
};

module.exports = Api;