import React from 'react';
let {Component} = React;
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';

export default class CharacterList extends Component {

  constructor (props) {
    super(props);
    this.state = {characters: Store.getCharacters()};
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
    this.setState({
      characters: Store.getCharacters()
    });
  }

  render() {
    return (
      <div>
        <h1>CharacterList</h1>
      </div>
    );
  }
}
