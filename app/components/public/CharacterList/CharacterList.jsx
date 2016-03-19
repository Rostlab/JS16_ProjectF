/*eslint no-undef: 2*/
/*eslint no-console: 2*/


import React from 'react';
let {Component} = React;
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';

export default class CharacterList extends Component {

  constructor (props) {
    super(props);
    this.state = {characters: Store.getCharacters()};

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount (){
    Store.addChangeListener(this._onChange);
  }

  componentDidMount(){
    Actions.loadCharacters();
  }

  componentWillUnmount(){
    Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    // here Store.getCharacters() return the filled list of characters  and the state should be updated and update the view.
    // but the state behaves weird and view isnt updated

    this.setState({
      characters: Store.getCharacters()
    });
  }

  render() {
    return (
      <div>
        <h1>CharacterList {this.state.characters.length}</h1>
        <div>{
          this.state.characters.map(function (character) {
            return <div key={character._id}>{character.name}</div>;
          })
        }
        </div>
      </div>
    );
  }
}
