/*eslint react/prop-types: 0*/
/*eslint react/prop-types: 0*/
/*eslint no-console: 0*/
/*eslint no-undef: 0*/
/*eslint no-unused-vars: 0*/


import React, {Component} from 'react';

import { Row, Col, ButtonToolbar, ButtonGroup,Button, Pagination } from 'react-bootstrap';

import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import CharacterThumbnail from '../../common/CharacterThumbnail/CharacterThumbnail.jsx';


class CharacterList extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>CharacterList:</h1>
        <Row>
          <Col md={8} mdOffset={2}>
            <div>{
              this.props.data.map(function (character) {
                return <CharacterThumbnail key={character._id} name={character.name} imageUrl={character.imageLink}/>;
              })
            }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
CharacterThumbnail.propTypes = { data: React.PropTypes.object.isRequired};

export default class CharacterListPage extends Component {
    constructor (props) {
      super(props);
      this.state = {
        data: Store.getCharacters().slice(0,19),
        activePage: 1
      };

      this._onChange = this._onChange.bind(this);
    }
    componentWillMount(){
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
        data: Store.getCharacters().slice(this.state.activePage*20-20,this.state.activePage*20-1)
      });
    }

    handleSelect(event, selectedEvent) {
      this.setState({
        data: Store.getCharacters().slice(selectedEvent.eventKey*20-20,selectedEvent.eventKey*20-1),
        activePage: selectedEvent.eventKey
      });
    }
    render(){
      console.log(Store.getCharacters().length);
      return (
        <div>
          <CharacterList data={this.state.data} />
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={Math.ceil(Store.getCharacters().length/20)}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect.bind(this)} />
        </div>
      );
    }
}
CharacterListPage.propTypes = { params: React.PropTypes.object };
