var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _characters = [];

function setCharacters(characters) {
    _characters = characters;
}

// Merge our store with Node's Event Emitter
var CharactersStore = assign({}, EventEmitter.prototype, {

    getCharacters: function() {
        return _characters;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});

CharactersStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case Constants.RECEIVE_CHARACTERS:
            setCharacters(action.data);
            break;
        default:
            return true;
    }

    CharactersStore.emitChange();

    return true;
});

module.exports = CharactersStore;