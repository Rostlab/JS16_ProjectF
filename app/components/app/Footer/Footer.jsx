import React from 'react';
let {Component} = React;
import './Footer.css';
import Row from 'react-bootstrap/lib/Row';
import Column from 'react-bootstrap/lib/Col';

export default class Footer extends Component {
  render() {
    return (
        <footer>
          <div className="container">
            <Row>
              <Column md={4}>
                <h4>About</h4>
                <hr />
                <p>
                  We provide you with a lot of interesting Game of Thrones data.
                </p>
              </Column>
              <Column md={4}>
                <h4>Social</h4>
                <hr />
                <p>
                  <a href="#">Facebook</a>
                </p>
                <p>
                  <a href="#">Twitter</a>
                </p>
                <p>
                  <a href="#">Google Plus</a>
                </p>
              </Column>
              <Column md={4}>
                <h4>Legal</h4>
                <hr />
                <p>
                  <a href="#">Feedback</a>
                </p>
                <p>
                  <a href="#">Imprint</a>
                </p>
                <p>
                  <a href="#">Privacy</a>
                </p>
                <p>
                  <a href="#">TUM</a>
                </p>
              </Column>
            </Row>
          </div>
        </footer>
    );
  }
}
