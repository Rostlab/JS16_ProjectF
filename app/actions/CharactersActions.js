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
        Api
            .get('characters/' + name + '?strict=true')
            .then(function (response) {
                return response;
            }).then(function(response){
                var character = response.data;
                let characterSlug = character.slug.replace(/(\([a-z_A-z]*\))/g, ''); // temp fix for #371
                Api
                    .get('plod/bySlug/' + characterSlug)
                    .then(function(response) {
                        var characterPlod = {
                          gotplod: response.data.find(function(ele) {
                            return ele.algorithm === "gotplod" && ele.characterSlug.toLowerCase().replace(/(\()|(\))|(_)$/g, '') == character.slug.toLowerCase().replace(/(\()|(\))|(_)$/g, '');  // temp fix for #371
                          }),
                          gotarffplod: response.data.find(function(ele) {
                            return ele.algorithm === "gotarffplod" && ele.characterSlug.toLowerCase().replace(/(\()|(\))|(_)$/g, '') == character.slug.toLowerCase().replace(/(\()|(\))|(_)$/g, '');  // temp fix for #371
                          })
                        };
                        var characterWithPlod = Object.assign(character,characterPlod);
                        AppDispatcher.handleServerAction({
                            actionType: Constants.RECEIVE_CHARACTER,
                            data: characterWithPlod
                        });
                    });
            },function(failed) {
                browserHistory.push('/404');
            });
    }
};

module.exports = CharactersActions;
