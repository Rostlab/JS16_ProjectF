'use strict'

var express = require('express');
var path = require('path');
var compression = require('compression');
var d5 = require('./d5.js');
var d4 = require('./d4.js');

var app = express();

try {
  var json = require('../config/config.json');
  process.env.access_token_key = json.gotsent.twitter.access_token_key;
  process.env.access_token_secret = json.gotsent.twitter.access_token_secret;
  process.env.consumer_key = json.gotsent.twitter.consumer_key;
  process.env.consumer_secret = json.gotsent.twitter.consumer_secret;
} catch (ex) {
  console.log(ex);
}

app.use(compression());

app.use(express.static(path.join(__dirname, '../', 'build')));

app.use('/d5', d5);
app.use('/d4', d4);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
})

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
})
