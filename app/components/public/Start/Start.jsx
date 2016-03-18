import React from 'react';
let {Component} = React;
import { Row } from 'react-bootstrap';

export default class Start extends Component {
  render() {
    return (
      <div className="home">
        <Row fluid>
          <div className="header-image"></div>
        </Row>
        Start
      </div>
    );
  }
}
