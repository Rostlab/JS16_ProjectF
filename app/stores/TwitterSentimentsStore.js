var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var _topSentiments = [];
var _flopSentiments = [];
var _mostDiscussedSentiments = [];
var _topControversialSentiments = [];
var _characterSentiment = {};

var _topSentiments_d5 = [];
var _flopSentiments_d5 = [];
var _mostDiscussedSentiments_d5 = [];

function setTopSentiments(data) {
    _topSentiments = data;
}
function setFlopSentiments(data) {
    _flopSentiments = data;
}
function setMostDiscussedSentiments(data) {
    _mostDiscussedSentiments = data;
}
function setTopControversialSentiments(data) {
    _topControversialSentiments = data;
}

function setCharacterSentiment(data) {
    _characterSentiment = data;
}
function setTopSentiments_d5(data) {
    _topSentiments_d5 = data;
}
function setFlopSentiments_d5(data) {
    _flopSentiments_d5 = data;
}
function setMostDiscussedSentiments_d5(data) {
    _mostDiscussedSentiments_d5 = data;
}



// Merge our store with Node's Event Emitter
var TwitterSentimentsStore = assign({}, EventEmitter.prototype, {

    getTopSentiments: function() {
        return _topSentiments;
    },

    getFlopSentiments: function() {
        return _flopSentiments;
    },

    getMostDiscussedSentiments: function() {
        return _mostDiscussedSentiments;
    },

    getTopControversialSentiments: function() {
        return _topControversialSentiments;
    },

    getTopSentiments_d5: function() {
        return _topSentiments_d5;
    },

    getFlopSentiments_d5: function() {
        return _flopSentiments_d5;
    },

    getMostDiscussedSentiments_d5: function() {
        return _mostDiscussedSentiments_d5;
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
        case Constants.RECEIVE_TWITTER_TOP_SENTIMENTS_D5:
            setTopSentiments_d5(action.data);
            break;
        case Constants.RECEIVE_TWITTER_FLOP_SENTIMENTS_D5:
            setFlopSentiments_d5(action.data);
            break;
        case Constants.RECEIVE_TWITTER_DISCUSSED_SENTIMENTS_D5:
            setMostDiscussedSentiments_d5(action.data);
            break;
        case Constants.RECEIVE_TWITTER_FLOP_SENTIMENTS:
            setFlopSentiments(action.data);
            break;
        case Constants.RECEIVE_TWITTER_TOP_SENTIMENTS:
            setTopSentiments(action.data);
            break;
        case Constants.RECEIVE_TWITTER_DISCUSSED_SENTIMENTS:
            setMostDiscussedSentiments(action.data);
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
