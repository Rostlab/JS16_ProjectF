/* D4 Integration */
var express = require('express');
var d4 = express();

var gotsent = require('gotsentimental');

const cfg = require('../config/config.json');

gotsent.cfg.extend(cfg.gotsent);
gotsent.init();


d4.use('/csv/:slug.csv', ctrData);
d4.use('/chart.css', gotsent.css.serve);
d4.use('/chart.js', gotsent.js.serve);

module.export = d4;
