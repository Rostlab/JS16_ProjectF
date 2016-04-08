var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api');

var CharactersPlodActions = {

    loadCharactersPlodByCount: function(count) {
        var charactersPlod = [];
        Api
            .get('plod/byCount/' + count)
            .then(function (response) {
              return response.data;
            }).then(function(charactersPlodResponse){
                for(var characterPlod of charactersPlodResponse){
                    Api
                        .get('characters/' + characterPlod.character + "?strict=true" )
                        .then(function(response){
                            var character = response.data;
                            var characterWithPlod = Object.assign(character,characterPlod);
                            charactersPlod.push(characterWithPlod);
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
            .then(function (response) {
                return response;
            }).then(function(response){
                var character = response.data;
                Api
                    .get('plod/bySlug/' + character.slug)
                    .then(function(response) {
                        var characterPlod = response.data[0];
                        var characterWithPlod = Object.assign(character,characterPlod);
                        AppDispatcher.handleServerAction({
                            actionType: Constants.RECEIVE_CHARACTER_PLOD_BY_NAME,
                            data: characterWithPlod
                        });
                    });
            });
    },
    loadCharactersPlodByName: function(names){
        var charactersPlod = [];
        for(var name of names){
            Api
                .get('characters/' + name + '?strict=true')
                .then(function (response) {
                    return response.data;
                }).then(function(character){
                    Api
                      .get('plod/bySlug/' + character.slug)
                      .then(function (response) {
                        var characterPlod = response.data.find(function (ele) {
                          return ele.algorithm === "gotplod" && ele.characterSlug === character.slug;
                        });
                        var characterWithPlod = Object.assign(character,characterPlod);
                        charactersPlod.push(characterWithPlod);
                        AppDispatcher.handleServerAction({
                            actionType: Constants.RECEIVE_CHARACTERS_PLOD_BY_NAME,
                            data: charactersPlod
                        });
                      });
                });
        }
    }
};

module.exports = CharactersPlodActions;
