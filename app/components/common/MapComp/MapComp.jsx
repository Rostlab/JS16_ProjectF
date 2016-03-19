import React from 'react';
let {Component} = React;
//import 	'./MapComp.css';

export default class MapComp extends Component {
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
              <ul id="filter-dropdown" className="dropdown-menu">
            <li className="dropdown-header">Nothing found</li>
            </ul>
          </div>
          </form>
          <hr />
          <div id="characters">
          </div>
        </div>

        <div id="timeline">
          <div id="episode-slider"></div>
          <p id="epsisodes"></p>
        </div>

        <div className="modal fade" id="dynModal" tabIndex="-1" role="dialog" aria-labelledby="dynModalLabel">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h3 className="modal-title" id="dynModalLabel"></h3>
              </div>
              <div className="modal-body"></div>
              <div className="modal-footer">
                <div className="pull-left classes"></div>
                <a href="#" className="btn btn-warning wikilink" target="_blank">Show in Wiki</a>
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
