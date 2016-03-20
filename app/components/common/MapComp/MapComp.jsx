import React from 'react';
let {Component} = React;
//import './gotmap.css';
import 	'./MapComp.css';

import map from "gotmap";
import "jquery-ui";

export default class MapComp extends Component {
  componentDidMount() {
    map.init();
    jQuery(function() {
      var mymap = gotmap('#map', {
        'characterBox':'#characters',
        'timeline':'#timeline',
        'filter':'#filter input',
        'characterDataSource':'https://raw.githubusercontent.com/Rostlab/JS16_ProjectC_Group10/develop/data/characters.js',
        'episodeDataSource':'https://raw.githubusercontent.com/Rostlab/JS16_ProjectC_Group10/develop/data/episodes.js',
        'cityDataSource':'https://raw.githubusercontent.com/Rostlab/JS16_ProjectC_Group10/develop/data/cities.js',
        'realmDataSource':'https://raw.githubusercontent.com/Rostlab/JS16_ProjectC_Group10/develop/data/realms.js'
      });/*eslint no-undef: 0, no-unused-vars: 0 */
    });

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
