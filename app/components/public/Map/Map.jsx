import React from 'react';
let {Component} = React;

import MapComp from '../../common/MapComp/MapComp.jsx';

export default class Map extends Component {
  render() {
    return (
      <div>
        <h1>Map</h1>

        <MapComp />
      </div>
    );
  }
}
