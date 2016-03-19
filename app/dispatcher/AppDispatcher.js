var assign = require('object-assign');
var Flux = require('flux');

var AppDispatcher = assign(new Flux.Dispatcher(),{

    handleViewAction: function(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    },
    handleServerAction: function(action) {
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action
        });
    }

});

module.exports = AppDispatcher;