var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api')

var CharactersActions = {

    loadCharacters: function() {
        Api
            .get('https://got-api.bruck.me/api/characters')
            .then(function (characters) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleViewAction({
                    actionType: Constants.RECEIVE_CHARACTERS,
                    data: characters
                });
            });

    }

};

module.exports = CharactersActions;
