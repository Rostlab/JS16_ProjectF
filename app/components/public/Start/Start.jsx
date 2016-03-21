import React from 'react';
let {Component} = React;
import { Row } from 'react-bootstrap';

import Stats from '../../common/Stats/Stats.jsx';
import './Start.css';
import TwitterComp from '../../common/TwitterComp/TwitterComp.jsx';

export default class Start extends Component {
  render() {
    return (
      <div className="home">
        <Row fluid>
          <div className="header-image"></div>
        </Row>
        <Stats/>
        <Row fluid>
          <div className="twitter">
            <TwitterComp widgetID='711756872454373377' height='600'/>
          </div>
        </Row>
      </div>
    );
  }
}
