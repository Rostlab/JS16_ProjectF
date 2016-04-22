import React from 'react';
let {Component} = React;

import d3 from 'd3';
import $ from 'jquery';

import { Link } from 'react-router';

import {Image, Row, Col, Grid} from 'react-bootstrap';

import './BigBattle.css';
import tombstone from '../../public/Characters/rip_tombstone.png';

export default class BigBattle extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    $('head').append('<link rel="stylesheet" type="text/css" href="/d4/chart.css">');
    let name1 = this.props.name1.replace(/ /g,'_');
    let name2 = this.props.name2.replace(/ /g,'_');
    $.getScript("/d4/chart.js",function(){
      var chart1 = new characterChart(d3.select("#chart1"), "/d4/csv/" + name1 + ".csv"); /*eslint no-undef:0*/
      var chart2 = new characterChart(d3.select("#chart2"), "/d4/csv/" + name2 + ".csv"); /*eslint no-undef:0*/
      d3.select(window).on('resize', function () {
        chart1.resize(); chart2.resize();
      });/*eslint no-undef:0*/
    });
   }

   render() {
    return (
      <Grid>
        <Row className="big-battle">
          <Col xs={6}>
            <div className="antagonistImageContainer">
              <Link to={'/characters/' + this.props.name1}>
                <Image className="antagonistImage" src={this.props.img1} alt={"Image of " + this.props.name1}  />
              </Link>
              <img className="antagonistTombstone" src={tombstone} />
              <p className="antagonistTombstonePlod">{parseInt(this.props.plod1)}%</p>
              <p className="copyRight">© 2016 Home Box Office, Inc. / Sky All rights reserved.</p>
            </div>
          </Col>
          <Col xs={6}>
            <div className="antagonistImageContainer">
              <Link to={'/characters/' + this.props.name2}>
                <Image className="antagonistImage" src={this.props.img2} alt={"Image of " + this.props.name2}  />
              </Link>
              <img className="antagonistTombstone" src={tombstone} />
              <p className="antagonistTombstonePlod">{parseInt(this.props.plod2)}%</p>
              <p className="copyRight">© 2016 Home Box Office, Inc. / Sky All rights reserved.</p>
            </div>
          </Col>
        </Row>
        <Row className="big-battle-info">
          <Col xs={6}>
            <h3 className="center">
              <Link to={'/characters/' + this.props.name1}>{this.props.name1}</Link>
            </h3>
          </Col>
          <Col xs={6}>
            <h3 className="center">
              <Link to={'/characters/' + this.props.name2}>{this.props.name2}</Link>
            </h3>
          </Col>
        </Row>
        <br />
        <p>The tombstone shows our <strong>predicted likelihood of death</strong>. Read how we calculate the score <a href="/machine-learning-algorithm-predicts-death-game-of-thrones">here</a>!</p>
        <br />
        <Row className="big-battle-info">
          <h3 className="center">Twitter Sentiments</h3>
          <Col xs={12} md={6}>
            <Link to={'/characters/' + this.props.name1}><h4 className="big-battle-name">{this.props.name1}</h4></Link>
            <svg id="chart1" width="100%" height="400"></svg>
          </Col>
          <Col xs={12} md={6}>
            <Link to={'/characters/' + this.props.name2}><h4 className="big-battle-name">{this.props.name2}</h4></Link>
            <svg id="chart2" width="100%" height="400"></svg>
          </Col>
        </Row>
      </Grid>
    );
  }
}

BigBattle.propTypes = {
  name1: React.PropTypes.string.isRequired,
  name2: React.PropTypes.string.isRequired,
  img1: React.PropTypes.string,
  img2: React.PropTypes.string,
  plod1: React.PropTypes.number.isRequired,
  plod2: React.PropTypes.number.isRequired
};
