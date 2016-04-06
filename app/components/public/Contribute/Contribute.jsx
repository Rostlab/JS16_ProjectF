import React from 'react';
let {Component} = React;
import Row from 'react-bootstrap/lib/Row';
import Column from 'react-bootstrap/lib/Col';

import ContributeText from '../../../../static/contribute.md';

export default class Contribute extends Component {
  render() {
    return (
        <Row>
          <Column md={8} mdPush={2}>
            <ContributeText />
          </Column>
        </Row>
    );
  }
}
