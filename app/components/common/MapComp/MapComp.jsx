import React from 'react';
let {Component} = React;
import { browserHistory } from 'react-router';

import 	'./MapComp.css';

import map from "gotmap";
import "jquery-ui";

export default class MapComp extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    map.init();
  }

  componentDidMount() {
    this.initMap();
  }

  initMap(){
    let config = {
      'characterBox':'#characters',
      'timeline':'#timeline',
      'filter':'#filter input',
      'characterDetails': function (modal, character) {
        browserHistory.push('/characters/'+ character.name);
        $("body").removeClass("modal-open");
        $(".gotmap-modal").remove();
        $(".modal-backdrop").remove();
      },
      'characterDataSource':'https://raw.githubusercontent.com/Rostlab/JS16_ProjectC_Group10/develop/data/characters.js',
      'episodeDataSource':'https://raw.githubusercontent.com/Rostlab/JS16_ProjectC_Group10/develop/data/episodes.js',
      'cityDataSource':'https://raw.githubusercontent.com/Rostlab/JS16_ProjectC_Group10/develop/data/cities.js',
      'realmDataSource':'https://raw.githubusercontent.com/Rostlab/JS16_ProjectC_Group10/develop/data/realms.js'
    };
    var mymap = gotmap('#map', config); /*eslint no-undef:0*/

    var range = this.parseRange();
    mymap.updateMap(range);
    for (let i of this.props.character) {
      setTimeout(function (){ /*eslint no-undef:0*/
        let character = mymap.searchCharacter(i.toLowerCase());
        mymap.addCharacter(character[0]);
      },5000);
    }
  }

  parseRange(){
    let patt = /s([0-9])e([0-9])/i;
    let begin = this.props.begintimeline;
    if (patt.test(begin)) {
      begin = patt.exec(begin)[1]-1 + patt.exec(begin)[2];
    } else { begin = 1; }
    let end = this.props.endtimeline;
    if (patt.test(end)) {
      end = patt.exec(end)[1]-1 +  patt.exec(end)[2];
    } else { end = 2; }
    return [parseInt(begin),parseInt(end)];
  }

  render() {
      return (
      <div className="map-wrapper">
        <div id="map">
        </div>
        <div id="sidebar">
          <form id="filter">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..."></input>
              <i className="glyphicon glyphicon-search form-control-feedback"></i>
            </div>
          </form>
        <hr />
        <div id="characters"></div>
        </div>
        <div id="timeline"></div>
      </div>
    );
  }
}
MapComp.propTypes = { character: React.PropTypes.array };
MapComp.propTypes = { location: React.PropTypes.object };
MapComp.propTypes = { begintimeline: React.PropTypes.string };
MapComp.propTypes = { endtimeline: React.PropTypes.string };
