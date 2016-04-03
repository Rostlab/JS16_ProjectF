import React from 'react';
let {Component} = React;
import { Row, Col } from 'react-bootstrap';

export default class Contribute extends Component {
  render() {
    return (
        <Row>
          <Column md={8} mdPush={2}>
            <h1>For Developers</h1>
            <p>We crawled a lot of data from primarly the <a href="awoiaf.westeros.org/index.php" target="_blank">AWOIAF wiki</a> but also other sources and we'd love to share our database with you guys!
              <br />Check out our <a href="https://api.got.show/doc/" target="_blank">API Reference here.</a>
            </p>
          </Column>
        </Row>
    );
  }
}
