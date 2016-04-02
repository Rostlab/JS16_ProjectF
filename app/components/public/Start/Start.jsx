import React from 'react';
let {Component} = React;
import { Row,Col } from 'react-bootstrap';

import AntagonistsComp from '../../common/AntagonistsComp/AntagonistsComp.jsx';
import Stats from '../../common/Stats/Stats.jsx';
import './Start.css';

import StartText from '../../app/Static/start.md';

export default class Start extends Component {
  render() {
    return (
      <div className="home">
        <Row fluid>
          <Col>
            <div className="header-image" />
          </Col>
        </Row>
        <Row>
          <Col>
            <AntagonistsComp />
          </Col>
        </Row>
        <StartText />
        <Stats/>
      </div>
    );
  }
}
