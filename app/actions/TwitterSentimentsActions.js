var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/SentimentAPI');

var TwitterSentimentsActions = {

    loadTopSentiments: function(count) {
        Api
            .get('d4/sentiment/top')
            .query({number: count})
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_TOP_CHARACTERS,
                    data: sentiments
                });
            });
    },
    loadFlopSentiments: function(count) {
        Api
            .get('d4/sentiment/worst')
            .query({number: count})
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_FLOP_CHARACTERS,
                    data: sentiments
                });
            });
    },
    loadControversialSentiments: function(count,startDate,endDate) {
        Api
            .get('d5/sentiment/controversial')
            .query({number: count})
            .query({startDate: startDate})
            .query({endDate: endDate})
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_CONTROVERSIAL_CHARACTERS,
                    data: sentiments
                });
            });
    },
    loadMostDiscussedSentiments: function(count) {
        Api
            .get('d4/sentiment/discussed')
            .query({number: count})
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_TALKED_ABOUT_CHARACTERS,
                    data: sentiments
                });
            });
    },
    loadCharacterSentiment: function(characterId) {
        Api
            .get('d4/character')
            .query({id: characterId})
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_CHARACTER_SENTIMENT,
                    data: sentiments
                });
            });
    }
    // ,
    // loadCharacterSentimentByTimeframe: function(name,startDate,endDate) {
    //     Api
    //         .get('d5/sentiment/')
    //         .query({name: name})
    //         .query({startDate: startDate})
    //         .query({endDate: endDate})
    //         .then(function (sentiments) {
    //             AppDispatcher.handleServerAction({
    //                 actionType: Constants.RECEIVE_TWITTER_CHARACTER_SENTIMENT,
    //                 data: sentiments
    //             });
    //         });
    // },
    // loadCharacterSentimentByEpisode: function(name,season,episode) {
    //     Api
    //         .get('d5/sentiment')
    //         .query({name: name})
    //         .query({season: season})
    //         .query({episode: episode})
    //         .then(function (sentiments) {
    //             AppDispatcher.handleServerAction({
    //                 actionType: Constants.RECEIVE_TWITTER_CHARACTER_SENTIMENT,
    //                 data: sentiments
    //             });
    //         });
    // }


};

module.exports = TwitterSentimentsActions;
