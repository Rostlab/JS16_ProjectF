import React from 'react';
let {Component} = React;
import './Footer.css';
import Row from 'react-bootstrap/lib/Row';
import Column from 'react-bootstrap/lib/Col';

import $ from 'jquery';

export default class Footer extends Component {

  componentDidMount() {
    this.fetchVersion();
  }

  fetchVersion() {
    $.ajax({
      url: "https://api.github.com/repos/Rostlab/JS16_ProjectF/tags",
      type: "GET",
      crossDomain: true,
      success: function (response) {
        $('.build-version').text(response[0].name);
      }
    });
  }

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
                  <a href="https://www.facebook.com/aSongOfIceAndData" target="_blank">Facebook</a>
                </p>
                <p>
                  <a href="https://twitter.com/asoiad" target="_blank">Twitter</a>
                </p>
                <p>
                  <a href="https://plus.google.com/116097558064950719723/about" target="_blank">Google Plus</a>
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
                  <a href="https://www.tum.de/">TUM</a>
                </p>
              </Column>
            </Row>
          </div>
        </footer>
    );
  }
}
