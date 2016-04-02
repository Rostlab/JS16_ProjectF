import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
let {Component} = React;
require.context("./img", false, /^\.\/.*\.jpg$/); /*eslint no-undef:0*/

import BigBattle from '../BigBattle/BigBattle.jsx';
import json from 'json!./antagonists.json';

export default class AntagonistsComp extends Component {
  render() {
  let  randompair = Math.floor(Math.random() * json.length);
  let name1 = json[randompair][0];
  let name2 = json[randompair][1];
  let img1 = '/assets/static/images/'+json[randompair][0].replace(/ /g,'_')+'.jpg';
  let img2 = '/assets/static/images/'+json[randompair][1].replace(/ /g,'_')+'.jpg';
  return (
    <div>
      <Grid>
        <Row>
          <Col>
            <BigBattle name1={name1} name2={name2} img1={img1} img2={img2} />
          </Col>
        </Row>
      </Grid>
    </div>
    );
  }
}
