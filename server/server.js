'use strict';

var express = require('express');
var path = require('path');
var compression = require('compression');
var d5 = require('./d5.js');
var d4 = require('./d4.js');
var wikirequest = require('./wikirequest.js');

var app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, '../build')));

app.use('/d5', d5);
app.use('/d4', d4);
app.use('/wikirequest', wikirequest);


var webpack = require('webpack');



var isDev = process.env.NODE_ENV === 'development';
var isProd = process.env.NODE_ENV === 'production';

if (isDev) {
    var config = require('../configWebpack/dev.js');
  var compiler = webpack(config);
  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  });

  app.use(this.middleware = devMiddleware);

  app.use(require('webpack-hot-middleware')(compiler));

  app.get('*', function(req, res) {
    /*eslint-disable */
    var index = this.middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html'));
    /*eslint-enable */
    res.end(index);
  }.bind(this));
}

if (isProd) {
  app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
   });
}

var log = isDev ? 'Development' : '';
log += isProd ? 'Production' : '';
var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log(log + ' Express server running at localhost:' + PORT);
});
