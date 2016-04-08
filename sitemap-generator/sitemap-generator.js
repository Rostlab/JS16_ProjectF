/*
    Use this helper script to generate a sitemap.xml representing the sites structure.
 */
var SITE_URL = 'https://got.show';
var CHARACTER_CHANGE_FREQUENCY = 'weekly';

var fsp = require('fs-promise');
var https = require("https");

var characters = require('./characters.json');


function _getXmlForCharacter(character) {
    var priority = character.pageRank / 350;
    return '<url><loc>' + SITE_URL + '/characters/' + encodeURIComponent(character.name) +
        '</loc><changefreq>' + CHARACTER_CHANGE_FREQUENCY + '</changefreq><priority>' + priority + '</priority></url>';
}

function generateCharactersXml(characters) {
    var xmlCharacters = characters.map(function(character){
        console.log(character.name);
        return _getXmlForCharacter(character);
    }).reduce(function(a, b){
        return a + "\n" + b;
    });
    return xmlCharacters;
}

var characterXml = generateCharactersXml(characters);

// Open the template.xml and write the character-urls to their placeholder.
fsp.readFile('template.xml', {encoding:'utf8'})
    .then(function(templateContent){
        return templateContent.replace('{{characters}}', characterXml);
    })
    .then(function(content){
        fsp.writeFile('../sitemap.xml', content)
            .then(function(){
                console.log('SUCCESS. Checkout sitemap.xml');
        })
    });