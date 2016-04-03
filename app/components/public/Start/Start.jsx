import React from 'react';
let {Component} = React;
import { Row,Col } from 'react-bootstrap';

import AntagonistsComp from '../../common/AntagonistsComp/AntagonistsComp.jsx';
import './Start.css';

import HomepageBlog from '../../../../static/home-blog.md';

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
        <Row>
            <br />
            <Col md={8} mdPush={2}>
                <div className="homeBlog">
                    <HomepageBlog/>
                </div>
            </Col>
        </Row>
      </div>
    );
  }
}
