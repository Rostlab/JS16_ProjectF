import React from 'react';
let {Component} = React;
import { Row,Col } from 'react-bootstrap';

import AntagonistsComp from '../../common/AntagonistsComp/AntagonistsComp.jsx';
import './Start.css';
import logo from './gotstatslogosmall.jpg';
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
        <Row className="stats-home">
           <Col xs={10} xsOffset={1} sm={5}>
            <img src={logo} className="start-logo" />
          </Col>
          <Col xs={10} xsOffset={0} sm={5}>
            <h1>Life, death and statistics in Westeros</h1>
            <p className="lead">While we all wait for the Winds of Winter to come out, we figured that it will be pretty cool
              to design some machine learning algorithm that will answer the question that is on every Game of Thrones’ fan mind - which character is likelier to die next?</p>
          </Col>
        </Row>
        <Row>
            <br />
            <Col md={8} mdPush={2}>
                <div className="homeBlog">
                  <div dangerouslySetInnerHTML={{ __html: HomepageBlog}} />
                </div>
            </Col>
        </Row>
      </div>
    );
  }
}
