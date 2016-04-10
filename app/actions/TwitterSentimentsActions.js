var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var Api = require('../network/SentimentsApi');

var TwitterSentimentsActions = {

    loadTopSentiments: function(count) {
        Api
            .get('d4/sentiment/top',{number: count})
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_TOP_SENTIMENTS,
                    data: sentiments
                });
            });
    },
    loadFlopSentiments: function(count) {
        Api
            .get('d4/sentiment/worst',{number: count})
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_FLOP_SENTIMENTS,
                    data: sentiments
                });
            });
    },
    loadMostDiscussedSentiments: function(count) {
        Api
            .get('d4/sentiment/discussed', {number: count})
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_DISCUSSED_SENTIMENTS,
                    data: sentiments
                });
            });
    },
    loadCharacterSentiment: function(characterId) {
        Api
            .get('d4/character/' + characterId)
            .then(function (sentiments) {
                AppDispatcher.handleServerAction({
                    actionType: Constants.RECEIVE_TWITTER_CHARACTER_SENTIMENT,
                    data: sentiments
                });
            });
    },

    loadControversialSentiments: function(count,startDate,endDate) {
    Api
      .get('d5/sentiment/controversial',{
        number: count,
        startDate: startDate,
        endDate: endDate
      })
      .then(function (sentiments) {
        AppDispatcher.handleServerAction({
          actionType: Constants.RECEIVE_TWITTER_CONTROVERSIAL_SENTIMENTS,
          data: sentiments
        });
      });
    },
    loadTopSentiments_d5: function(count,startDate,endDate) {
      Api
        .get('d5/sentiment/top',{
          number: count,
          startDate: startDate,
          endDate: endDate})
        .then(function (sentiments) {
          AppDispatcher.handleServerAction({
            actionType: Constants.RECEIVE_TWITTER_TOP_SENTIMENTS_D5,
            data: sentiments
          });
        });
    },
    loadFlopSentiments_d5: function(count,startDate,endDate) {
      Api
        .get('d5/sentiment/worst',{
          number: count,
          startDate: startDate,
          endDate: endDate
        })
        .then(function (sentiments) {
          AppDispatcher.handleServerAction({
            actionType: Constants.RECEIVE_TWITTER_FLOP_SENTIMENTS_D5,
            data: sentiments
          });
        });
    },
    loadMostDiscussedSentiments_d5: function(count,startDate,endDate) {
      Api
        .get('d5/sentiment/talked', {
          number: count,
          startDate: startDate,
          endDate: endDate
        })
        .then(function (sentiments) {
          AppDispatcher.handleServerAction({
            actionType: Constants.RECEIVE_TWITTER_DISCUSSED_SENTIMENTS_D5,
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
