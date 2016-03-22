
import React, {Component} from 'react';

import { Row, Col, Pagination, Input } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import CharacterThumbnail from '../../common/CharacterThumbnail/CharacterThumbnail.jsx';

import './CharacterList.css';

class CharacterList extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    var found = this.props.data.length === 0 ? "Nothing found, please search something else" : "";
    console.log(found); /*eslint no-console:0,no-undef:0*/
    return (
      <div>
        <Row>
          <Col md={8} mdOffset={2}>
            <div> {
                      this.props.data.map(function (character) {
                        return <CharacterThumbnail key={character._id} name={character.name} imageUrl={character.imageLink}/>;
                      })
                  }
            </div>
          </Col>
          <div className="center">
            <h3>{ found }</h3>
          </div>
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
        activePage: 1,
        filter: {'value': ''}
      };
      this._onChange = this._onChange.bind(this);
    }

    componentWillMount(){
      Store.addChangeListener(this._onChange);
    }

    componentDidMount(){
      Actions.loadCharacters();
      this.handleChange();
    }

    componentWillUnmount(){
      Store.removeChangeListener(this._onChange);
    }

    _onChange() {
      this.setState({
        data: Store.getCharacters(this.state.activePage, {}, this.state.filter)
      });
    }

    handleSelect(event, selectedEvent) { // Event triggered by page change
      this.setState({
        data: Store.getCharacters(selectedEvent.eventKey, {}, this.state.filter),
        activePage: selectedEvent.eventKey
      });
      browserHistory.push({
        pathname: '/characters/',
        search: '?search=' + this.refs.input.getValue() + '&page=' + selectedEvent.eventKey
      });
    }

    handleChange() { // Event triggered by search input
      let filter = {'value': this.refs.input.getValue()};
      this.setState({
        data: Store.getCharacters(this.state.activePage, {}, filter),
        filter: {'value': this.refs.input.getValue()},
        activePage: this.state.activePage
      });
      browserHistory.push({
        pathname: '/characters/',
        search: '?search=' + this.refs.input.getValue() + '&page=' + this.state.activePage}
      );
    }
    render(){
      return (
        <div>
          <Row>
            <Col md={6} mdOffset={3}>
              <Input value={this.props.location.query.search} className="character-search" ref="input" type="text" placeholder="Search for character" onChange={this.handleChange.bind(this)} />
            </Col>
          </Row>
          <CharacterList data={this.state.data} />
          <div className="center">
            <Pagination
              maxButtons={3}
              ellipsis={false}
              boundaryLinks
              items={Math.ceil(Store.getCharactersCount(this.state.filter)/20)}
              activePage={this.state.activePage}
              onSelect={this.handleSelect.bind(this)} />
            </div>
        </div>

      );
    }
}
CharacterListPage.propTypes = { location: React.PropTypes.object};
