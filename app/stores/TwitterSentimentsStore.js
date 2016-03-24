var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _topCharacters = [];
var _flopCharacters = [];
var _mostTalkedAboutCharacters = [];
var _topControversialCharacters = [];
var _characterSentiment = {}

function setTopCharacters(data) {
    _topCharacters = data;
}
function setFlopCharacters(data) {
    _flopCharacters = data;
}
function setMostTalkedAboutCharacters(data) {
    _mostTalkedAboutCharacters = data;
}
function setTopControversialCharacters(data) {
    _topControversialCharacters = data;
}

function setCharacterSentiment(data) {
    _characterSentiment = data;
}


// Merge our store with Node's Event Emitter
var TwitterSentimentsStore = assign({}, EventEmitter.prototype, {

    getTopCharacters: function() {
        return _topCharacters;
    },

    getFlopCharacters: function() {
        return _flopCharacters;
    },

    getMostTalkedAboutCharacters: function() {
        return _mostTalkedAboutCharacters;
    },

    getTopControversialCharacters: function() {
        return _topControversialCharacters;
    },

    getCharacterSentiment: function() {
        return _characterSentiment;
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

TwitterSentimentsStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case Constants.RECEIVE_TWITTER_CONTROVERSIAL_CHARACTERS:
            setTopControversialCharacters(action.data);
            break;
        case Constants.RECEIVE_TWITTER_FLOP_CHARACTERS:
            setFlopCharacters(action.data);
            break;
        case Constants.RECEIVE_TWITTER_TOP_CHARACTERS:
            setTopCharacters(action.data);
            break;
        case Constants.RECEIVE_TWITTER_TALKED_ABOUT_CHARACTERS:
            setMostTalkedAboutCharacters(action.data);
            break;
        case Constants.RECEIVE_TWITTER_CHARACTER_SENTIMENT:
            setCharacterSentiment(action.data);
            break;
        default:
            return true;
    }

    TwitterSentimentsStore.emitChange();
});

module.exports = TwitterSentimentsStore;
