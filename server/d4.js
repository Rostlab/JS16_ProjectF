/* D4 Integration */
const express = require('express');
const d4 = express();

const gotsent = require('gotsentimental');

const cfg = require('../config/config.json');
const ctrData = require('./controllers/data');

gotsent.cfg.extend(cfg.gotsent);
gotsent.init();
// gotsent.update();

//gotsent.update();
d4.use('/csv/:slug.csv', ctrData);
d4.use('/chart.css', gotsent.css.serve);
d4.use('/chart.js', gotsent.js.serve);

// register routes
d4.get('/', function(req, resp) {

    // get top lists

    // those are async funcs to we have to wait until the Promises are resolved.
    // but we can do it in parallel and sync them with Promise.all:
    var ps = [];
    ps[0] = gotsent.mostPopular();
    ps[1] = gotsent.mostHated();
    ps[2] = gotsent.mostDiscussed();

    // wait for all Promises to be resolved
    Promise.all(ps).then(function(results) {
        // use the results of all 3 Promises
        resp.render("top", {
            mostPopular:   results[0],
            mostHated:     results[1],
            mostDiscussed: results[2]
        });
    })
});

// d4.get('/:slug', function(req, res) {
//     res.render("chart");
// });

module.exports = d4;
