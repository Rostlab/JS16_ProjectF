/* D5 Integration */
'use strict';
const express = require('express');
let d5 = express();

const initPack = require('gotdailysentiment');

const apiURL = process.env.PROTOCOL + process.env.API + process.env.PREFIXDIR;

let json;
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
      "airDateURL": apiURL + "/episodes/find?token=" + process.env.api_token_A,
      "characterNamesURL": apiURL + "/characters/",
      "sentimentSave": apiURL + "/sentiment?token=" + process.env.api_token_A,
      "sentimentGetChar": apiURL + "/sentiment/find?token=" + process.env.api_token_A,
      "sentimentGetAll": apiURL + "/sentiment/byTimeRange?beginDate=startdate&endDate=enddate"
    },

    "automation" : {
      "minutes" : 12
    }
  };
}
let gotdailysentiment = initPack.init(json);

const reqByName = function(req, res){
  var patt = /\d{4}-\d{2}-\d{2}/;
  if (!patt.test(req.query.date)) {res.status(400).send('Wrong Date Format');}

  // execute function
  gotdailysentiment.getSentimentForName({character: req.query.name, date: req.query.date}, function(result, err) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  });
};

const reqByNameTimeline = function(req, res) {
  const patt = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  if (!patt.test(req.query.startDate) || !patt.test(req.query.endDate)) {
    res.status(400).send('Wrong Date Format');
  }

  //execute function
  const param = {
    character: req.query.name,
    startDate: req.query.startDate,
    endDate: req.query.endDate
  };
  gotdailysentiment.getSentimentForNameTimeframe(param, function(result,err) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  });
};

const reqPerEpisode = function(req, res) {
  const patt = /\d{1}|\d{2}/;
  if (!patt.test(req.query.season) || !patt.test(req.query.episode)) {
    res.status(400).send('Wrong Number Format');
  }

  // execute function
  const param = {
    character: req.query.name,
    startDate: req.query.startDate,
    endDate: req.query.endDate
  };
  gotdailysentiment.getSentimentForNameTimeframe(param, function(result,err) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  });
};

d5.get('/sentiment', function (req, res) {
  if (req.query.name && req.query.date) {
    reqByName(req, res);
  } else if (req.query.name  && req.query.startDate && req.query.endDate) {
    reqByNameTimeline(req, res);
  } else if (req.query.name && req.query.season && req.query.episode){
    reqPerEpisode(req, res);
  } else {
    res.status(400).send('Bad Request');
  }
});

d5.get('/sentiment/:rank', function (req,res) {
  if (req.query.number && req.query.startDate && req.query.startDate) {
    const patt = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

    //execute function
    const param = {
      number: req.query.number,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    if (!patt.test(req.query.startDate) || !patt.test(req.query.endDate)) {
      res.status(400).send('Please provide a start and an end date');
    }
    if (req.params.rank == "top") {
      gotdailysentiment.topSentiment(param, function(result,err) {
        if (err) {
          res.sendStatus(404);
        } else {
          res.json(result);
        }
      });
    } else if (req.params.rank == "worst") {
      gotdailysentiment.worstSentiment(param, function(result, err) {
        if (err) {
          res.sendStatus(404);
        } else {
          res.json(result);
        }
      });
    } else if (req.params.rank == "talked") {
      gotdailysentiment.mostTalkedAbout(param, function(result, err) {
        if (err) {
          res.sendStatus(404);
        } else {
          res.json(result);
        }
      });
    } else if (req.params.rank == "controversial") {
      gotdailysentiment.topControversial(param, function(result, err) {
        if (err) {
          res.sendStatus(404);
        } else {
          res.json(result);
        }
      });
    } else {
      res.status(400).send('Bad Request');
    }
  } else {
    res.status(400).send('Bad Request');
  }
});

d5.get('/runListen', function (req,res) {
  if (!req.query.name || !req.query.duration) {
    res.status(400).send('Please proviede name and duration');
  }
  gotdailysentiment.runTwitterStreaming(req.query.name,req.query.duration, function(result,err) {
    if (err) {
      res.sendStatus(404);
    } else {
      res.json(result);
    }
  })
});

module.exports = d5;
