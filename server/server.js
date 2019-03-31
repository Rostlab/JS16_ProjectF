'use strict';

const express = require('express');
const path = require('path');
const compression = require('compression');
// const d5 = require('./d5.js');
// const d4 = require('./d4.js');
const wikirequest = require('./wikirequest.js');

const app = express();

app.use(compression());

app.get('/sitemap.xml', function(req,res) {
  res.sendFile(path.join(__dirname, '../sitemap.xml'))
});

// app.use('/d5', d5);
// app.use('/d4', d4);
app.use('/wikirequest', wikirequest);

app.use(express.static(path.join(__dirname, '../static')));

app.use(express.static(path.join(__dirname, '../build')));

const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

if (isDev) {
  let config = require('../configWebpack/dev.js');
  let compiler = webpack(config);
  let devMiddleware = require('webpack-dev-middleware')(compiler, {
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

let log = isDev ? 'Development' : '';
log += isProd ? 'Production' : '';
const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log(log + ' Express server running at localhost:' + PORT);
});
