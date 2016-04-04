/* ToDo */
const express = require('express');
let request = require("request");

const wikirequest = express();

wikirequest.get('/', function (req,res) {
    res.status(500).send('no city provided');
});

wikirequest.get('/:query', function (req,res) {
    const link = 'http://awoiaf.westeros.org/index.php/'+req.params.query;
    request(link, function(error, response, body) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.status(200).send(body);
        }
    });
});

module.exports = wikirequest;
