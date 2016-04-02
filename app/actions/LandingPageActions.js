var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api')

var LandingPageActions = {

    loadPlodCharacters: function(count) {
        Api
            .get('plod/byCount/' + count)
            .then(function (characters) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_PLOD_CHARACTERS,
                    data: characters
                });
            });
    }
};

module.exports = LandingPageActions;
