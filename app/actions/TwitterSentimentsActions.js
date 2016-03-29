var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/SentimentAPI');

var TwitterSentimentsActions = {

    loadTopSentiments: function(count,startDate,endDate) {
        Api
            .get('d5/sentiment/top')
            .query({number: count})
            .query({startDate: startDate})
            .query({endDate: endDate})
            .then(function (sentiments) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_TOP_CHARACTERS,
                    data: sentiments
                });
            });
    },
    loadFlopSentiments: function(count,startDate,endDate) {
        Api
            .get('d5/sentiment/worst')
            .query({number: count})
            .query({startDate: startDate})
            .query({endDate: endDate})
            .then(function (sentiments) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_FLOP_CHARACTERS,
                    data: sentiments
                });
            });
    },
    loadTopControversial: function(count,startDate,endDate) {
        Api
            .get('d5/sentiment/controversial')
            .query({number: count})
            .query({startDate: startDate})
            .query({endDate: endDate})
            .then(function (sentiments) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_CONTROVERSIAL_CHARACTERS,
                    data: sentiments
                });
            });
    },
    loadMostTalkedAbout: function(count,startDate,endDate) {
        Api
            .get('d5/sentiment/talked')
            .query({number: count})
            .query({startDate: startDate})
            .query({endDate: endDate})
            .then(function (sentiments) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_TALKED_ABOUT_CHARACTERS,
                    data: sentiments
                });
            });
    },
    loadChatacterSentiment: function(name,date) {
        Api
            .get('d5/sentiment')
            .query({name: name})
            .query({date: date})
            .then(function (sentiments) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_CHARACTER_SENTIMENT,
                    data: sentiments
                });
            });
    },
    loadCharacterSentimentByTimeframe: function(name,startDate,endDate) {
        Api
            .get('d5/sentiment/')
            .query({name: name})
            .query({startDate: startDate})
            .query({endDate: endDate})
            .then(function (sentiments) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_CHARACTER_SENTIMENT,
                    data: sentiments
                });
            });
    },
    loadCharacterSentimentByEpisode: function(name,season,episode) {
        Api
            .get('d5/sentiment')
            .query({name: name})
            .query({season: season})
            .query({episode: episode})
            .then(function (sentiments) {
                // Dispatch an action containing the categories.
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_CHARACTER_SENTIMENT,
                    data: sentiments
                });
            });
    }


};

module.exports = TwitterSentimentsActions;
