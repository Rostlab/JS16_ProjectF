/*eslint no-undef: 2*/
/*eslint no-console: 2*/


import React from 'react';
let {Component} = React;

import { Row, Col } from 'react-bootstrap';

import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import CharacterThumbnail from '../../common/CharacterThumbnail/CharacterThumbnail.jsx';


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
    this.setState({
      characters: Store.getCharacters()
    });
  }

  render() {
    return (
      <div>
        <h1>CharacterList ({this.state.characters.length})</h1>
        <Row>
          <Col md={8} mdOffset={2}>
            <div>
              { this.state.characters.map(function (character) {
                return <CharacterThumbnail id={character._id} name={character.name} imageUrl={character.imageLink}/>;
              })
            }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
