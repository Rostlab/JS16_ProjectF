import React from 'react';
let {Component} = React;

import { Row, Col } from 'react-bootstrap';

import Store from '../../../stores/LandingPageStore';
import Actions from '../../../actions/LandingPageActions';

import CharacterThumbnail from '../CharacterThumbnail/CharacterThumbnail.jsx';

export default class Stats extends Component {

  constructor (props) {
    super(props);
    this.state = {characters: Store.getPlodCharacters()};
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount (){
    Store.addChangeListener(this._onChange);
  }

  componentDidMount(){
    Actions.loadPlodCharacters(3);
  }

  componentWillUnmount(){
    Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      characters: Store.getPlodCharacters()
    });
  }

  render() {
  return (
      <div>
        <Row className="home-plod">
          <Col md={8} mdOffset={3}>
            <div>{
              this.state.characters.map(function (character) {
                return <CharacterThumbnail key={character._id} id={character._id} name={character.name} imageUrl={character.imageLink}/>;
              })
            }
            </div>
          </Col>
            <h1>Characters most likely to die</h1>
        </Row>
      </div>
    );
  }
}
