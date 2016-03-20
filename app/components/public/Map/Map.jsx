import React from 'react';
let {Component} = React;

import MapComp from '../../common/MapComp/MapComp.jsx';
import Header from '../../app/Header/Header.jsx';

import './Map.css';

export default class Map extends Component {
  render() {
    return (
      <div>
        <Header />
        <MapComp />
      </div>
    );
  }
}
