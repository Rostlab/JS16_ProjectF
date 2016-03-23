/* D5 Integration */
var express = require('express');
var d5 = express();

// var initPack = require('gotdailysentiment');
// var json = require('../config/config.json');
// console.log(json.gotdailysentiment);
// var gotdailysentiment = initPack.init(json.gotdailysentiment);

var dummyByName = {
  "characterName": "Jon Snow",
  "date": "2016-03-18T", //date of the tweets
  "posSum": 23,          //sum of the positive sentiment score on that given day
  "negSum": 21,          //sum of the negative sentiment score on that given day
  "posCount": 11,        //count of positive tweets that day
  "negCount": 5,         //sum of negative tweets that day
  "nullCount": 8         //sum of neutral tweets that day
};

var dummyByTopFlop = {
    "name": "Jon Snow",
    "posSum": 23,
    "negSum": 66,
    "posCount": 11,
    "negCount": 5,
    "nullCount": 8
};

var dummyByEpisode = {
    "name": "Jon Snow",
    "posSum": 23,
    "negSum": 21,
    "posCount": 11,
    "negCount": 5,
    "nullCount": 8
}

d5.get('/getSentimentForName', function (req, res) {
  if (!req.query.name || !req.query.date) { res.status(400).send('Bad Request'); }

  var patt = /\d{4}-\d{2}-\d{2}T/;
  if (!patt.test(req.query.date)) {res.status(400).send('Wrong Date Format');}

  //execute function
  // gotdailysentiment.getSentimentForName({name: req.query.name, date: req.query.date}, function(result) {
  //   res.json(result);
  // });
  res.json(dummyByName);
})

d5.get('/getSentimentForNameTimeframe', function (req, res) {
  if (!req.query.name || !req.query.startDate || !req.query.startDate) {
    res.status(400).send('Bad Request');
  }

  var patt = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (!patt.test(req.query.startDate) || !patt.test(req.query.endDate)) {
    res.status(400).send('Wrong Date Format');
  }

  //execute function
  // var param = {
  //   name: req.query.name,
  //   startDate: req.query.startDate,
  //   endDate: req.query.endDate,
  // }
  // gotdailysentiment.getSentimentForNameTimeframe(param, function(result) {
  //   res.json(result);
  // });
  res.json(dummyByName);
})

var getTopFlops = function(req,res,func){
  if (!req.query.number || !req.query.startDate || !req.query.startDate) {
    res.status(400).send('Bad Request');
  }

  var patt = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (!patt.test(req.query.startDate) || !patt.test(req.query.endDate)) {
    res.status(400).send('Wrong Date Format');
  }

  //execute function
  var param = {
    number: req.query.number,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  }
  func(param, function(result) {
    res.json(result);
  });
}

d5.get('/topSentiment', function (req, res) {
  //getTopFlops(res,rec,gotdailysentiment.topSentiment);
  res.json(dummyByTopFlop);
})

d5.get('/worstSentiment', function (req, res) {
  //getTopFlops(res,rec,gotdailysentiment.worstSentiment);
  res.json(dummyByTopFlop);
})

d5.get('/mostTalkedAbout', function (req, res) {
  //getTopFlops(res,rec,gotdailysentiment.mostTalkedAbout);
  res.json(dummyByTopFlop);
})

d5.get('/topControversial', function (req, res) {
  //getTopFlops(res,rec,gotdailysentiment.topControversial);
  res.json(dummyByTopFlop);
})
d5.get('/sentimentPerEpisode', function (req, res) {
  if (!req.query.name || !req.query.season || !req.query.episode) {
    res.status(400).send('Bad Request');
  }
  //
  // var patt = /\d{1}|\d{2}/;
  // if (!patt.test(req.query.season) || !patt.test(req.query.episode)) {
  //   res.status(400).send('Wrong Number Format');
  // }

  //execute function
  // var param = {
  //   name: req.query.name,
  //   startDate: req.query.startDate,
  //   endDate: req.query.endDate,
  // }
  // gotdailysentiment.getSentimentForNameTimeframe(param, function(result) {
  //   res.json(result);
  // });
  res.json(dummyByEpisode);
})

module.exports = d5;
