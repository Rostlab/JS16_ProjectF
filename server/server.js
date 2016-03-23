'use strict'

var express = require('express');
var path = require('path');
var compression = require('compression');
var json = require('../config/config.json');
var d5 = require('./d5.js');
//var d4 = require('./d4.js');

var app = express();

app.use(compression());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/d5', d5);
//app.use(d4);



app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT);
})
