var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api');
var Store = require('../stores/CharactersStore');
import { browserHistory } from 'react-router';

var CharactersActions = {

    loadCharacters: function() {
        if(Store.getCharacters().length >= 1){
            AppDispatcher.handleViewAction({
                actionType: Constants.SEND_CHARACTERS,
                data: null
            });
        } else {
            Api.get('characters')
                .then(function (characters) {
                    return characters;
                }).then(function (characters){
                    Api
                        .get('plod/byAlgorithm/gotplod')
                        .then(function(response){
                            var plods = response.data;
                            var charactersWithPlod = characters.map(function(character) {
                                var characterPlod = plods.find(function(element){return element.character == character.name;});
                                return Object.assign(character, characterPlod);
                            });
                            AppDispatcher.handleServerAction({
                                actionType: Constants.RECEIVE_CHARACTERS,
                                data: charactersWithPlod
                            });
                        });
                });

        }
    },
    loadCharacter: function(name) {
        var that = this;

        Api.get('characters/' + name + '?strict=true').then(function (response) {
            return response;
        }).then(function(response){
            // backwards compatible
            var character = response.data;
            character.show = {};
            character.book = response.data;
            let characterSlug = character.slug.replace(/(\([a-z_A-z]*\))/g, ''); // temp fix for #371

            Api.getNew('show/characters/bySlug/' + characterSlug).then(function(response) {
                character.show = response;
                that.loadCharacterGetPLOD(character, characterSlug);
            }, function(failed) {
                that.loadCharacterGetPLOD(character, characterSlug);
            });
        }, function(failed) {
            browserHistory.push('/404');
        });
    },
    loadCharacterGetPLOD: function(character, characterSlug) {
        Api.get('plod/bySlug/' + characterSlug).then(function(response) {
            var characterPlod = {
            gotplod: response.data.find(function(ele) {
                return ele.algorithm === "gotplod" && ele.characterSlug.toLowerCase().replace(/(\()|(\))|(_)$/g, '') == character.slug.toLowerCase().replace(/(\()|(\))|(_)$/g, '');  // temp fix for #371
            }),
            gotarffplod: response.data.find(function(ele) {
                return ele.algorithm === "gotarffplod" && ele.characterSlug.toLowerCase().replace(/(\()|(\))|(_)$/g, '') == character.slug.toLowerCase().replace(/(\()|(\))|(_)$/g, '');  // temp fix for #371
            }),
            plodByYearShow: [  
                0.9717749357223511,
                0.9695066809654236,
                0.8499769568443298,
                0.8442375063896179,
                0.6798079013824463,
                0.5141540169715881,
                0.2688676118850708,
                0.1835961639881134,
                0.13041914999485016,
                0.09906404465436935,
                0.10297475755214691,
                0.08037181198596954,
                0.05791579931974411,
                0.052614640444517136,
                0.043281372636556625,
                0.027195557951927185,
                0.011960308998823166,
                0.016034841537475586,
                0.010835045017302036,
                0.008172146044671535,
                0.0058854552917182446],
            plodByYearBook: [
                0.9317991137504578, 
                0.9363328814506531, 
                0.8987686038017273, 
                0.8911411166191101, 
                0.8380193710327148, 
                0.7753075957298279, 
                0.7744981646537781, 
                0.7060483694076538, 
                0.7386547923088074, 
                0.6854392290115356, 
                0.6751900315284729, 
                0.6463751792907715, 
                0.6025092005729675, 
                0.6186366677284241, 
                0.5859835743904114, 
                0.6088321208953857,
                0.5746617913246155,
                0.5777051448822021,
                0.5879756808280945,
                0.5665242075920105, 
                0.5662319660186768]
            };

            var characterWithPlod = Object.assign(character, characterPlod);

            AppDispatcher.handleServerAction({
                actionType: Constants.RECEIVE_CHARACTER,
                data: characterWithPlod
            });
        });
    }
};

module.exports = CharactersActions;
