var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _topSentiments = [];
var _flopSentiments = [];
var _mostTalkedAboutSentiments = [];
var _topControversialSentiments = [];
var _characterSentiment = {}

function setTopSentiments(data) {
    _topSentiments = data;
}
function setFlopSentiments(data) {
    _flopSentiments = data;
}
function setMostTalkedAboutSentiments(data) {
    _mostTalkedAboutSentiments = data;
}
function setTopControversialSentiments(data) {
    _topControversialSentiments = data;
}

function setCharacterSentiment(data) {
    _characterSentiment = data;
}


// Merge our store with Node's Event Emitter
var TwitterSentimentsStore = assign({}, EventEmitter.prototype, {

    getTopSentiments: function() {
        return _topSentiments;
    },

    getFlopSentiments: function() {
        return _flopSentiments;
    },

    getMostTalkedAboutSentiments: function() {
        return _mostTalkedAboutSentiments;
    },

    getTopControversialSentiments: function() {
        return _topControversialSentiments;
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
        case Constants.RECEIVE_TWITTER_CONTROVERSIAL_SENTIMENTS:
            setTopControversialSentiments(action.data);
            break;
        case Constants.RECEIVE_TWITTER_FLOP_SENTIMENTS:
            setFlopSentiments(action.data);
            break;
        case Constants.RECEIVE_TWITTER_TOP_SENTIMENTS:
            setTopSentiments(action.data);
            break;
        case Constants.RECEIVE_TWITTER_TALKED_ABOUT_SENTIMENTS:
            setMostTalkedAboutSentiments(action.data);
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
