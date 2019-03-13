
import React, {Component} from 'react';
import window from 'global/window';
import document from 'global/document';

import { Row, Col, Pagination, Input} from 'react-bootstrap';
import { DropdownButton, MenuItem} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import CharacterList from '../../common/CharacterList/CharacterList';

import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';

import './CharacterListPage.css';

const popularity = {
  sortText: "Popularity",
  sort: {field: "pageRank", type: -1}
};

const AtoZ = {
  sortText:  "Name A to Z",
  sort: {field: "name", type: 1}
};

const ZtoA = {
  sortText:  "Name Z to A",
  sort: {field: "name", type: -1}
};

const plodAsc = {
  sortText: "Survival chance",
  sort: {field: "plod", type: 1}
};

const plodDesc = {
  sortText: "Death chance",
  sort: {field: "plod", type: -1}
};

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
          sortText =  AtoZ.sortText;
          sort = AtoZ.sort;
        } else if (this.props.location.query.sort == 'name' && this.props.location.query.order == '-1') {
          sortText =  ZtoA.sortText;
          sort = ZtoA.sort;
        } else if (this.props.location.query.sort == 'plod' && this.props.location.query.order == '1') {
          sortText =  plodAsc.sortText;
          sort = plodAsc.sort;
        } else if (this.props.location.query.sort == 'plod' && this.props.location.query.order == '-1') {
          sortText =  plodDesc.sortText;
          sort = plodDesc.sort;
        } else {
          sortText =  popularity.sortText;
          sort = popularity.sort;
        }
      } else {
        sortText =  popularity.sortText;
        sort = popularity.sort;
      }
      this.state = {
        data: Store.getCharacters(page,sort, {'value': ''}),
        activePage: page,
        filter: {'value': ''},
        loaded: false,
        sortText: sortText,
        sort: sort,
        text_changed: false,
        infiniteScrolling: true
      };

      this._onChange = this._onChange.bind(this);
    }

    componentWillMount(){
      Store.addChangeListener(this._onChange);
    }

    componentDidMount(){
      window.addEventListener('scroll', this.handleScroll.bind(this));
      Actions.loadCharacters();
      this.handleChange();
    }

    componentWillUnmount(){
      window.removeEventListener('scroll', this.handleScroll.bind(this));
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

    toggleInfiniteScrolling() {
      this.setState({
        infiniteScrolling: !this.state.infiniteScrolling
      });
    }

    handleScroll() {
      if (document.getElementById('loadMoreButton') && this.state.infiniteScrolling && this.checkLoadMoreIsVisible()) {
        this.handleLoadMore();
      }
    }

    checkLoadMoreIsVisible() {
      let loadMoreElem = document.getElementById('loadMoreButton');
      let loadMoreBoundingRect = loadMoreElem.getBoundingClientRect();

      if (loadMoreBoundingRect.top < window.innerHeight - 50) {
        return true;
      }
      
      return false;
    }

    handleLoadMore() {
      let newPage = this.state.activePage + 1;

      this.setState({
        data: [...this.state.data, ...Store.getCharacters(newPage, this.state.sort, this.state.filter)],
        activePage: newPage
      });

      this.pushHistory(newPage);
    }

    handleSelectSort(event, eventKey) { // Event triggered by sort change
      let sort;
      if(eventKey == 1) {
        sort = popularity.sort;
        this.setState({
          data: Store.getCharacters(1,sort, this.state.filter),
          sort: sort,
          activePage: 1,
          sortText: popularity.sortText
        });
      } else if(eventKey == 2) {
        sort = AtoZ.sort;
        this.setState({
          data: Store.getCharacters(1,sort, this.state.filter),
          sort: sort,
          activePage: 1,
          sortText: AtoZ.sortText
        });
      } else if(eventKey == 3) {
        sort = ZtoA.sort;
        this.setState({
          data: Store.getCharacters(1,sort, this.state.filter),
          sort: sort,
          activePage: 1,
          sortText: ZtoA.sortText
        });
      } else if(eventKey == 4) {
        sort = plodDesc.sort;
        this.setState({
          data: Store.getCharacters(1,sort, this.state.filter),
          sort: sort,
          activePage: 1,
          sortText: plodDesc.sortText
        });
      } else if(eventKey == 5) {
        sort = plodAsc.sort;
        this.setState({
          data: Store.getCharacters(1,sort, this.state.filter),
          sort: sort,
          activePage: 1,
          sortText: plodAsc.sortText
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
            <Col md={6} mdOffset={2}>
              <Input value={this.props.location.query.search} className="character-search" ref="input" type="text" placeholder="Search for character" onChange={this.handleChange.bind(this)} />
            </Col>
            <Col md={2} className="sortCol">
              <DropdownButton className="sortButton" onSelect={this.handleSelectSort.bind(this)} title={this.state.sortText} id="dropdown-size-medium">
                <MenuItem eventKey="1">{popularity.sortText}</MenuItem>
                <MenuItem eventKey="2">{AtoZ.sortText}</MenuItem>
                <MenuItem eventKey="3">{ZtoA.sortText}</MenuItem>
                <MenuItem eventKey="4">{plodDesc.sortText}</MenuItem>
                <MenuItem eventKey="5">{plodAsc.sortText}</MenuItem>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col md={8} mdOffset={2}>
              <div className="center">
                <label id="toggleInfiniteScrolling">
                  <input type="checkbox" defaultChecked={true} onClick={this.toggleInfiniteScrolling.bind(this)} />
                  &nbsp;Infinite Scrolling
                </label>
                <Pagination
                  boundaryLinks={true}
                  ellipsis
                  maxButtons={3}
                  items={Math.ceil(Store.getCharactersCount(this.state.filter,this.state.sort)/20)}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelectPage.bind(this)} />
              </div>
            </Col>
          </Row>
          <CharacterList data={this.state.data} loaded={this.state.loaded}/>
          <div className="center">
            <a role="button" id="loadMoreButton" onClick={this.handleLoadMore.bind(this)}>
              Load More
            </a>
          </div>
          <div className="center">
            <Pagination
              boundaryLinks={true}
              ellipsis
              maxButtons={3}
              items={Math.ceil(Store.getCharactersCount(this.state.filter,this.state.sort)/20)}
              activePage={this.state.activePage}
              onSelect={this.handleSelectPage.bind(this)} />
          </div>
        </div>

      );
    }
}
CharacterListPage.propTypes = { location: React.PropTypes.object};
