var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var  _charactersPlod = [];
var _characterPlod = {};

function setCharactersPlod(data) {
    _charactersPlod = data;
}

function setCharacterPlod(data){
    _characterPlod = data;
}

var CharactersPlodStore = assign({}, EventEmitter.prototype, {

    getCharactersPlod: function() {
        return _charactersPlod;
    },
    getCharacterPlod: function() {
        return _characterPlod;
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

CharactersPlodStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case Constants.RECEIVE_CHARACTERS_PLOD_BY_COUNT:
            setCharactersPlod(action.data);
            break;
        case Constants.RECEIVE_CHARACTER_PLOD_BY_NAME:
            setCharacterPlod(action.data);
            break;
        default:
            return true;
    }

    CharactersPlodStore.emitChange();
});

module.exports = CharactersPlodStore;
