var request = require('superagent');
var Promise = require('es6-promise').Promise;

var protocol = (process.env.NODE_ENV === 'development') ? 'http://' : process.env.__PROTOCOL__;
var port = (process.env.NODE_ENV === 'development') ? ':8080' : '';
var api = (process.env.NODE_ENV === 'development') ? 'localhost' : process.env.__API__;

var baseUrl = protocol + api + port + '/';

var Api = {
  get: function (url, query) {
    return new Promise(function (resolve, reject) {
      request
        .get(baseUrl + url)
        .query(query)
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

module.exports = Api;