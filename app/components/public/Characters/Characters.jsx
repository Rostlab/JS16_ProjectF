import React from 'react';
let {Component} = React;
import './Character.css';
import { Grid, Row, Col, Image, Panel } from 'react-bootstrap';

export default class Character extends Component {

  render() {
    return (
    <div>
      <div fluid>asd</div>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={12} md={4}>
              <Image className="character-photo" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=profile%20picture%20&w=350&h=350" />
            </Col>
          <Col xs={6} md={8}>
            <div fluid>
              <Panel header="city">
              ...
              </Panel><Panel header="city">
              ...
              </Panel><Panel header="age">
              ...
              </Panel><Panel header="...">
              ...
              </Panel><Panel header="...">
              ...
              </Panel>
            </div>
          </Col>
        </Row>
		</Grid>
	</div>
    );
  }
}
