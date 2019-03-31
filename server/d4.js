/* D4 Integration */
'use strict';
const express = require('express');
const fs = require ('fs');
const path = require ('path');

const gotsent = require('gotsentimental');


const d4 = express();

let cfg;
try {
  cfg = require('../config/config.json').gotsent;
} catch (err) {
  console.log(err);
  cfg = {
    "mongodb": {
      "uri": process.env.MONGODB
    },
    "api": {
      "https": true,
      "host": "api.got.show",
      "prefix": "/api/"
    },
    "twitter": {
      "access_token": process.env.access_token,
      "access_token_secret": process.env.access_token_secret,
      "consumer_key": process.env.consumer_key,
      "consumer_secret": process.env.consumer_secret
    }
  }
}

gotsent.cfg.extend(cfg);

gotsent.init();
// gotsent.startUpdateLoop();

d4.get('/chart.css', function(req,res) {
    res.sendFile(gotsent.css);

});
d4.get('/chart.js', function(req,res) {
    res.sendFile(gotsent.js);
  fs.readdir(path.join(__dirname, '/../csv'), function(err, files) {
    console.log(files);
  });
});

const oneHour = 3600000;
d4.use('/csv', express.static(path.join(__dirname, '/../csv'), { maxAge: oneHour }));
console.log(__dirname);

d4.get('/sentiment/:rank', function (req,res) {
  if (req.params.rank == "top") {
    gotsent.mostPopular(parseInt(req.query.number)).then(function(result){
      res.json(result);
    }, function () {
      res.status(400).send('Bad Request');
    });
  } else if(req.params.rank == "worst") {
    gotsent.mostHated(parseInt(req.query.number)).then(function(result){
      res.json(result);
    }, function () {
      res.status(400).send('Bad Request');
    });
  } else if(req.params.rank == "discussed"){
    gotsent.mostDiscussed(parseInt(req.query.number)).then(function(result){
      res.json(result);
    }, function () {
      res.status(400).send('Bad Request');
    });
  } else {
    res.status(400).send('Bad Request');
  }
});

d4.get('/character', function (req,res) {
  res.status(400).send('Please send an ID!');
});

d4.get('/character/:id', function (req,res) {
  gotsent.character(req.params.id).then(function(result){
    res.json(result);
  }, function () {
    res.status(400).send('Bad Request');
  });
});

module.exports = d4;
