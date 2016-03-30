
import React, {Component} from 'react';

import { Row, Col, Pagination, Input} from 'react-bootstrap';
import { DropdownButton, MenuItem} from 'react-bootstrap';
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
    var found = "";
    if(this.props.loaded == false) {
      found = "Loading ...";
    } else if (this.props.data.length === 0) {
      found = "Nothing found, please search something else";
    }
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
CharacterList.propTypes = { loaded: React.PropTypes.bool.isRequired};

export default class CharacterListPage extends Component {
    constructor (props) {
      super(props);
      let page = 1;
      if( this.props.location.query.page != undefined ) {
        page = parseInt(this.props.location.query.page);
      }

      let sortText, sort;
      if( this.props.location.query.sort != undefined && this.props.location.query.order != undefined  ) {
        if (this.props.location.query.sort == 'name' && this.props.location.query.order == '1') {
          sortText =  "Name A to Z";
          sort = {field: "name", type: 1};
        } else if (this.props.location.query.sort == 'name' && this.props.location.query.order == '-1') {
          sortText =  "Name Z to A";
          sort = {field: "name", type: -1};
        } else {
          sortText =  "Popularity";
          sort = {field: "pageRank", type: -1};
        }
      } else {
        sortText =  "Popularity";
        sort = {field: "pageRank", type: -1};
      }
      this.state = {
        data: Store.getCharacters(page,sort, {'value': ''}),
        activePage: page,
        filter: {'value': ''},
        loaded: false,
        sortText: sortText,
        sort: sort,
        text_changed: false
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
        data: Store.getCharacters(this.state.activePage, this.state.sort, this.state.filter),
        loaded: true
      });
    }
    pushHistory(newPage,newSort) {
      let search = '?search=' + this.refs.input.getValue();
      let page = '&page=';
      page  += (newPage == undefined) ? this.state.activePage : newPage;
      let sort = '&sort=';
      sort += (newSort == undefined) ? this.state.sort.field : newSort.field;
      let order = '&order=';
      order += (newSort == undefined) ? this.state.sort.type : newSort.type;

      let query = search + page + sort + order;
      browserHistory.push({
        pathname: '/characters/',
        search: query
      });
    }

    handleSelectPage(event, selectedEvent) { // Event triggered by page change
      this.setState({
        data: Store.getCharacters(selectedEvent.eventKey, this.state.sort, this.state.filter),
        activePage: selectedEvent.eventKey
      });
      this.pushHistory(selectedEvent.eventKey);
    }

    handleSelectSort(event, eventKey) { // Event triggered by sort change
      let sort;
      if(eventKey == 1) {
        sort = {field: "pageRank", type: -1};
        this.setState({
          data: Store.getCharacters(1,sort, this.state.filter),
          sort: sort,
          activePage: 1,
          sortText: "Popularity"
        });
      } else if(eventKey == 2) {
        sort = {field: "name", type: 1};
        this.setState({
          data: Store.getCharacters(1,sort, this.state.filter),
          sort: sort,
          activePage: 1,
          sortText: "Name A to Z"
        });
      } else if(eventKey == 3) {
        sort = {field: "name", type: -1};
        this.setState({
          data: Store.getCharacters(1,sort, this.state.filter),
          sort: sort,
          activePage: 1,
          sortText: "Name Z to A"
        });
      }
      this.pushHistory(undefined,sort);
    }

    handleChange() { // Event triggered by search input
      let filter = {'value': this.refs.input.getValue()};
      if (!this.state.text_changed) { // On page load loading
        this.setState({
          text_changed: true,
          data: Store.getCharacters(this.state.activePage, this.state.sort, filter),
          filter: {'value': this.refs.input.getValue()}
        });
        return;
      }

      this.setState({
        data: Store.getCharacters(this.state.activePage, this.state.sort, filter),
        filter: {'value': this.refs.input.getValue()},
        activePage: 1
      });

      this.pushHistory();
    }

    render() {
      return (
        <div>
          <Row className="inputbar">
            <Col md={7} mdOffset={2}>
              <Input value={this.props.location.query.search} className="character-search" ref="input" type="text" placeholder="Search for character" onChange={this.handleChange.bind(this)} />
            </Col>
            <Col md={1}>
              <DropdownButton className="sortButton" onSelect={this.handleSelectSort.bind(this)} title={this.state.sortText} id="dropdown-size-medium">
                <MenuItem eventKey="1">Popularity</MenuItem>
                <MenuItem eventKey="2">Name A to Z</MenuItem>
                <MenuItem eventKey="3">Name Z to A</MenuItem>
              </DropdownButton>
            </Col>
          </Row>
          <div className="center">
            <Pagination
              boundaryLinks={true}
              ellipsis
              maxButtons={3}
              items={Math.ceil(Store.getCharactersCount(this.state.filter)/20)}
              activePage={this.state.activePage}
              onSelect={this.handleSelectPage.bind(this)} />
            </div>
          <CharacterList data={this.state.data} loaded={this.state.loaded}/>
        </div>

      );
    }
}
CharacterListPage.propTypes = { location: React.PropTypes.object};
