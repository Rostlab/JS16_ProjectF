import React from 'react';
let {Component} = React;

import MapComp from '../../common/MapComp/MapComp.jsx';
import Header from '../../app/Header/Header.jsx';

import './Map.css';

export default class Map extends Component {
  render() {
    return (
      <div className="mapPage">
        <Header />
        <MapComp
          pagex={this.props.location.pathname}
          character={this.props.location.query.character}
          begintimeline={this.props.location.query.begin_time_line}
          endtimeline={this.props.location.query.end_time_line}/>
      </div>
    );
  }
}
Map.propTypes = { location: React.PropTypes.object };
