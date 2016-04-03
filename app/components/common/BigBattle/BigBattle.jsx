import React from 'react';
let {Component} = React;
import d3 from 'd3';
import $ from 'jquery';
import './BigBattle.css';
import {Image, Row, Col} from 'react-bootstrap';

export default class BigBattle extends Component {
  constructor(props){
    super(props);
  }
  render() {
    $('head').append('<link rel="stylesheet" type="text/css" href="/d4/chart.css">');
    let name1 = this.props.name1.replace(/ /g,'_');
    let name2 = this.props.name2.replace(/ /g,'_');
    $.getScript("/d4/chart.js",function(){
      var chart1 = new characterChart(d3.select("#chart1"), "/d4/csv/" + name1 + ".csv"); /*eslint no-undef:0*/
      d3.select(window).on('resize', chart1.resize);/*eslint no-undef:0*/
      var chart2 = new characterChart(d3.select("#chart2"), "/d4/csv/" + name2 + ".csv"); /*eslint no-undef:0*/
      d3.select(window).on('resize', chart2.resize);/*eslint no-undef:0*/
    });
    return (
      <div>
        <Row className="big-battle">
          <Col xs={6}>
            <Image src={this.props.img1} alt={"Image of " + this.props.name1}  />
          </Col>
          <Col xs={6}>
            <Image src={this.props.img2} alt={"Image of " + this.props.name2} />
          </Col>
        </Row>
        <Row className="big-battle-info">
          <Col xs={6}>
            <h3>{this.props.name1}</h3>
            <p>PLOD: 70%</p>
            <svg id="chart1" width="100%" height="400"></svg>
          </Col>
          <Col xs={6}>
            <h3>{this.props.name2}</h3>
            <p>PLOD: 50%</p>
            <svg id="chart2" width="100%" height="400"></svg>
          </Col>
        </Row>
      </div>
    );
  }
}

BigBattle.propTypes = {
  name1: React.PropTypes.string.isRequired,
  name2: React.PropTypes.string.isRequired,
  img1: React.PropTypes.string,
  img2: React.PropTypes.string
};