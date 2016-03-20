import React from 'react';
let {Component} = React;
import { Row } from 'react-bootstrap';

import Stats from '../../common/Stats/Stats.jsx';
//import MapComp from '../../common/MapComp/MapComp.jsx';
import './Start.css';

export default class Start extends Component {
  render() {
    return (
      <div className="home">
        <Row fluid>
          <div className="header-image"></div>
        </Row>
        Start
        <Stats/>
        <Row>
        </Row>
      </div>
    );
  }
}
