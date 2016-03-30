/* D5 Integration */
var express = require('express');
var d5 = express();

var initPack = require('gotdailysentiment');

var json;
try {
  json = require('../config/config.json').gotdailysentiment;
} catch (err) {
  console.log(err);
  json = {
    "twitter" : {
      "consumer_key": process.env.consumer_key,
      "consumer_secret": process.env.consumer_secret,
      "access_token_key": process.env.access_token_key,
      "access_token_secret": process.env.access_token_secret
    },

    "database" : {
      "airDateURL": "https://api.got.show/api/episodes/find?token=<TOKEN>",
      "characterNamesURL": "https://api.got.show/api/characters/",
      "sentimentSave": "https://api.got.show/api/sentiment?token=<TOKEN>",
      "sentimentGetChar": "https://api.got.show/api/sentiment/find?token=<TOKEN>",
      "sentimentGetAll": "https://api.got.show/api/sentiment/byTimeRange?beginDate=startdate&endDate=enddate"
    },

    "automation" : {
      "minutes" : 12
    }
  };
}
//gotdailysentiment = initPack.init(json);

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

const reqByName = function(req, res){
  var patt = /\d{4}-\d{2}-\d{2}T/;
  if (!patt.test(req.query.date)) {res.status(400).send('Wrong Date Format');}

  /*// execute function
  gotdailysentiment.getSentimentForName({name: req.query.name, date: req.query.date}, function(result) {
    res.json(result);
  });*/
  res.json(dummyByName);
}

const reqByNameTimeline = function(req, res) {
  var patt = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (!patt.test(req.query.startDate) || !patt.test(req.query.endDate)) {
    res.status(400).send('Wrong Date Format');
  }

 /* //execute function
  var param = {
    name: req.query.name,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  }
  gotdailysentiment.getSentimentForNameTimeframe(param, function(result) {
    res.json(result);
  });*/
  res.json(dummyByName);
}

const reqPerEpisode = function(req, res) {
  var patt = /\d{1}|\d{2}/;
  if (!patt.test(req.query.season) || !patt.test(req.query.episode)) {
    res.status(400).send('Wrong Number Format');
  }

  // execute function
  /*var param = {
    name: req.query.name,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  }
  gotdailysentiment.getSentimentForNameTimeframe(param, function(result) {
    res.json(result);
  });*/
  res.json(dummyByEpisode);
}

d5.get('/sentiment', function (req, res) {
  if (req.query.name && req.query.date) {
    reqByName(req, res);
  } else if (req.query.name  && req.query.startDate && req.query.endDate) {
    reqByNameTimeline(req, res);
  } else if (req.query.name, req.query.season, req.query.episode){
    reqPerEpisode(req, res);
  } else {
    res.status(400).send('Bad Request');
  }
})

d5.get('/sentiment/:rank', function (req,res) {
  if (req.query.number && req.query.startDate && req.query.startDate) {
    var patt = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

    //execute function
    var param = {
      number: req.query.number,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    }

    if (!patt.test(req.query.startDate) || !patt.test(req.query.endDate)) {
      res.status(400).send('Wrong Date Format');
    }
    if (req.params.rank == "top") {
      // gotdailysentiment.topSentiment(param, function(result) { res.json(result); });
      res.json(dummyByTopFlop);
    } else if (req.params.rank == "worst") {
      // gotdailysentiment.worstSentiment(param, function(result) { res.json(result); });
      res.json(dummyByTopFlop);
    } else if (req.params.rank == "talked") {
      // gotdailysentiment.mostTalkedAbout(param, function(result) { res.json(result); });
      res.json(dummyByTopFlop);
    } else if (req.params.rank == "controversial") {
      // gotdailysentiment.topControversial(param, function(result) { res.json(result); });
      res.json(dummyByTopFlop);
    } else {
      res.status(400).send('Bad Request');
    }
  } else {
    res.status(400).send('Bad Request');
  }
});

module.exports = d5;
