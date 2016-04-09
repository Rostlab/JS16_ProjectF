var request = require('superagent');
var Promise = require('es6-promise').Promise;

var protocol = (process.env.NODE_ENV === 'development') ? 'http://' : process.env.__PROTOCOL__;
var port = (process.env.NODE_ENV === 'development') ? ':8080' : '';

var baseUrl = protocol + document.location.hostname + port + '/'; /*eslint undef:0*/

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