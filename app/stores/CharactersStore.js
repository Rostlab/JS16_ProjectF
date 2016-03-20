var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _characters = [];
var _character = {};

function setCharacters(characters) {
    _characters = characters;
}
function setCharacter(data) {
    _character = data.data;
    console.log(data.data);
}

// Merge our store with Node's Event Emitter
var CharactersStore = assign({}, EventEmitter.prototype, {

    getCharacters: function() {
        return _characters;
    },

    getCharacter: function() {
        return _character;
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
        case Constants.RECEIVE_CHARACTER:
            setCharacter(action.data);
            break;
        default:
            return true;
    }

    CharactersStore.emitChange();
});

module.exports = CharactersStore;
