/* D4 Integration */
const express = require('express');
const d4 = express();

const gotsent = require('gotsentimental');

var cfg;
try {
  cfg = require('../config/config.json').gotsent;
} catch (err) {
  console.log(err)
  cfg = {
    "mongodb": {
      "uri": process.env.MONGODB
    },
    "api": {
      "https": true,
      "host": "got-api.bruck.me",
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
const ctrData = require('./controllers/data');

gotsent.cfg.extend(cfg);
gotsent.init();

gotsent.update();

d4.use('/csv/:slug.csv', ctrData);
d4.use('/chart.css', gotsent.css.serve);
d4.use('/chart.js', gotsent.js.serve);

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

// update DB - this might take a few hours
// .then(function(res) {
//     // print some update stats
//     console.log(res);
//
//     // get top5 most popular characters
//     gotsent.mostDiscussed(20).then(function(res) {
//         res.forEach(function(character) {
//             console.log(character.name);
//         });
//     }, console.error);
//
//     // gracefully shut down
//     gotsent.shutdown();
// }, function(err) {
//     console.error(err);
//     gotsent.shutdown();
// });

// d4.use('/csv/:slug.csv', ctrData);
// d4.use('/chart.css', gotsent.css.serve);
// d4.use('/chart.js', gotsent.js.serve);
//
// // register routes
// d4.get('/', function(req, resp) {
//
//     // get top lists
//
//     // those are async funcs to we have to wait until the Promises are resolved.
//     // but we can do it in parallel and sync them with Promise.all:
//     var ps = [];
//     ps[0] = gotsent.mostPopular();
//     ps[1] = gotsent.mostHated();
//     ps[2] = gotsent.mostDiscussed();
//
//     // wait for all Promises to be resolved
//     Promise.all(ps).then(function(results) {
//         // use the results of all 3 Promises
//         resp.render("top", {
//             mostPopular:   results[0],
//             mostHated:     results[1],
//             mostDiscussed: results[2]
//         });
//     })
// });

// d4.get('/:slug', function(req, res) {
//     res.render("chart");
// });

module.exports = d4;
