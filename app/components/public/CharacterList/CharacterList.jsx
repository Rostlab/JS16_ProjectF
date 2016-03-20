import React, {Component} from 'react';

import { Row, Col, Pagination } from 'react-bootstrap';

import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import CharacterThumbnail from '../../common/CharacterThumbnail/CharacterThumbnail.jsx';

import './CharacterList.css';

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
                return <CharacterThumbnail key={character._id} id={character._id} name={character.name} imageUrl={character.imageLink}/>;
              })
            }
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
CharacterList.propTypes = { data: React.PropTypes.array.isRequired};

export default class CharacterListPage extends Component {
    constructor (props) {
      super(props);
      this.state = {
        data: Store.getCharacters(1),
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
        data: Store.getCharacters(this.state.activePage)
      });
    }

    handleSelect(event, selectedEvent) {
      this.setState({
        data: Store.getCharacters(selectedEvent.eventKey),
        activePage: selectedEvent.eventKey
      });
    }
    render(){
      return (
        <div>
          <CharacterList data={this.state.data} />
          <div className="center">
            <Pagination
              maxButtons={3}
              ellipsis={false}
              boundaryLinks
              items={Math.ceil(Store.getCharactersCount()/20)}
              activePage={this.state.activePage}
              onSelect={this.handleSelect.bind(this)} />
            </div>
        </div>

      );
    }
}
