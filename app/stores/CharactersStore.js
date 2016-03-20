var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var firstBy = require('thenby');

var _characters = [];
var _character = {};

function setCharacters(characters) {
    _characters = characters;
}
function setCharacter(data) {
    _character = data.data[0];
}

function sortCharacters(charaters,sort){
    if(sort){
        return charaters.sort(firstBy(sort["field"],sort.type));
    }
    return charaters;
}
function filterCharacters(characters,filter){
    if(filter){
        return characters.filter(function(element){
            return element.name.toLowerCase().indexOf(filter.value.toLowerCase()) >= 0;
        });
    }
    return characters;
}
// Merge our store with Node's Event Emitter
var CharactersStore = assign({}, EventEmitter.prototype, {

    getCharacters: function(page, sort, filter) {
        // sort = {field: Constants.SORT_FIELD_NAME, type: Constants.SORT_TYPE_ASC};
        // filter = {field: Constants.FILTER_FIELD_NAME ,value: "LyRI"};
        if(!page){
            page = 0
        }
        var start = page * 20;
        var end = start + 20;
        var filteredCharacters = filterCharacters(_characters,filter);
        var sortedCharacters = sortCharacters(filteredCharacters,sort);
        return sortedCharacters.slice(start,end);
    },

    getCharactersCount: function(){
        return _characters.length;
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
        case Constants.SEND_CHARACTERS:
            break;
        default:
            return true;
    }
    CharactersStore.emitChange();
});

module.exports = CharactersStore;
