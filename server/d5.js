/* D5 Integration */
var express = require('express');
var d5 = express();

//var initPack = require('gotdailysentiment');
//console.log(json.gotdailysentiment);
//var gotdailysentiment = initPack.init(json.gotdailysentiment);

d5.get('/gotdailysentiment', function (req, res) {
  if (!req.query.name || !req.query.date) { res.status(400).send('Bad Request'); }

  var patt = /\d{4}-\d{2}-\d{2}T/;
  if (!patt.test(req.query.date)) {res.status(400).send('Wrong Date Format');}

  //execute function
  // gotdailysentiment.getSentimentForName({name: req.query.name, date: req.query.date}, function(result) {
  //   res.json(result);
  // });
  res.json({ gotdailysentiment: 1 });
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
  res.json({ getSentimentForNameTimeframe: 1 });
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
  res.json({ topSentiment: 1 });
})

d5.get('/worstSentiment', function (req, res) {
  //getTopFlops(res,rec,gotdailysentiment.worstSentiment);
  res.json({ worstSentiment: 1 });
})

d5.get('/mostTalkedAbout', function (req, res) {
  //getTopFlops(res,rec,gotdailysentiment.mostTalkedAbout);
  res.json({ mostTalkedAbout: 1 });
})

d5.get('/topControversial', function (req, res) {
  //getTopFlops(res,rec,gotdailysentiment.topControversial);
  res.json({ topControversial: 1 });
})
d5.get('/sentimentPerEpisode', function (req, res) {
  if (!req.query.name || !req.query.season || !req.query.episode) {
    res.status(400).send('Bad Request');
  }

  var patt = /\d{2}/;
  if (!patt.test(req.query.startDate) || !patt.test(req.query.endDate)) {
    res.status(400).send('Wrong Number Format');
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
  res.json({ sentimentPerEpisode: 1 });
})

module.exports = d5;
