import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
let {Component} = React;
require.context("./img", false, /^\.\/.*\.jpg$/); /*eslint no-undef:0*/

import BigBattle from '../BigBattle/BigBattle.jsx';
import json from 'json!./antagonists.json';
import MapComp from '../MapComp/MapComp.jsx';

export default class AntagonistsComp extends Component {
  render() {
  let  randompair = Math.floor(Math.random() * json.length);
  let name1 = json[randompair][0];
  let name2 = json[randompair][1];
  let img1 = '/static/images/'+json[randompair][0].replace(/ /g,'_')+'.jpg';
  let img2 = '/static/images/'+json[randompair][1].replace(/ /g,'_')+'.jpg';
  return (
    <div>
      <Grid>
        <Row>
          <Col>
            <h1 className="text-center">Who will be the next eliminated?</h1>
            <BigBattle name1={name1} name2={name2} img1={img1} img2={img2} />
            <p><em>PLOD</em> is the <strong>likelihood of death</strong> of a character. Learn more about how we calculate this score <a href="/machine-learning-algorithm-predict-death-game-of-thrones">here</a>.</p>

            <br />
            <h3>{name1}'s and {name2}'s location-history on a map:</h3>
            <MapComp character={[name1, name2]}/>
          </Col>
        </Row>
      </Grid>
    </div>
    );
  }
}
