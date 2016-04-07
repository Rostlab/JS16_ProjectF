var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var  _charactersPlod = [];
var _charactersPlodByName = [];
var _characterPlodByName = {};

function setCharactersPlod(data) {
    _charactersPlod = data;
}

function setCharactersPlodByName(data){
    _charactersPlodByName = data;
}

function setCharacterPlodByName(data){
    _characterPlodByName = data;
}

var CharactersPlodStore = assign({}, EventEmitter.prototype, {

    getCharactersPlod: function() {
        return _charactersPlod;
    },
    getCharactersPlodByName: function() {
        return _charactersPlodByName;
    },

    getCharacterPlodByName: function() {
        return _characterPlodByName;
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
            setCharacterPlodByName(action.data);
            break;
        case Constants.RECEIVE_CHARACTERS_PLOD_BY_NAME:
            setCharactersPlodByName(action.data);
            break;
        default:
            return true;
    }

    CharactersPlodStore.emitChange();
});

module.exports = CharactersPlodStore;
