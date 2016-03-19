import React from 'react';
let {Component} = React;
//import 	'./MapComp.css';

export default class MapComp extends Component {
  componentDidMount() {
    gotmap("#map", {timeline:"#timeline"}); /*eslint no-undef: 0 */
  }
  render() {
    return (
      <div className="map-wrapper">
        <div id="map">
        </div>
        <div id="sidebar">
          <form id="filter">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for..." />
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
