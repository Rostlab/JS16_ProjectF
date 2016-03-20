var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api')

var LandingPageActions = {

    loadPlodCharacters: function(count) {
        Api
            .get('characters/plod/' + count)
            .then(function (characters) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_CHARACTERS,
                    data: characters
                });
            });
    }
};

module.exports = LandingPageActions;
