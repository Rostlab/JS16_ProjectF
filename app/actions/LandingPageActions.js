var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/Api')

var LandingPageActions = {

    loadPlodCharacters: function(count) {
        // TODO replace these lines with the actual call late since api now returns an error
        AppDispatcher.handleServerAction({
            actionType: Constants.RECEIVE_PLOD_CHARACTERS,
            data: {data: [{name : "PLOD1"},{name: "PLOD2"}]}
        });

        // Api
        //     .get('characters/plod/' + count)
        //     .then(function (characters) {
        //         // Dispatch an action containing the categories.
        //         AppDispatcher.handleServerAction({
        //             actionType: Constants.RECEIVE_CHARACTERS,
        //             data: characters
        //         });
        //     });
    }
};

module.exports = LandingPageActions;
