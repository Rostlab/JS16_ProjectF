var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api')

var CharactersPlodActions = {

    loadCharactersPlodByCount: function(count) {
        var charactersPlod = [];
        Api
            .get('plod/byCount/' + count)
            .then(function (charactersPlod) {
              return charactersPlod
            }).then(function(charactersPlod){
                for(var characterPlod in charactersPlod){
                    Api
                        .get('characters/byId/' + characterPlod._id )
                        .then(function(character){
                            characterPlod.merge(character);
                            characterPlod.push(characterPlod);
                            AppDispatcher.handleServerAction({
                                actionType: Constants.RECEIVE_CHARACTERS_PLOD_BY_COUNT,
                                data: charactersPlod
                            });
                        });
                }
            });
    },
    loadCharacterPlodByName: function(name){
        Api
            .get('characters/' + name + '?strict=true')
            .then(function (character) {
                return character;
            }).then(function(character){
                Api
                    .get('plod/byId/' + character._id)
                    .then(function (characterPlod) {
                        character.merge(characterPlod);
                        AppDispatcher.handleServerAction({
                            actionType: Constants.RECEIVE_CHARACTER_PLOD_BY_NAME,
                            data: character
                        });
                    });
            });
    }
};

module.exports = CharactersPlodActions;
