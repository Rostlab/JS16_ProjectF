import React from 'react';
let {Component} = React;
import request from 'superagent';
import d3 from 'd3';
import './BigBattle.css';
import {Image, Row, Col} from 'react-bootstrap';

export default class BigBattle extends Component {
  constructor(props){
    super(props);
  }
  render() {
    request
      .get('/d4/chart.js')
      .end(function(err,res) {
        eval(res.text);
      });
    var chart = new characterChart(d3.select("#chart"), "/csv/Bran_Stark.csv");
    d3.select(window).on('resize', chart.resize);
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
            <svg id="chart" width="100%" height="400"></svg>
          </Col>
          <Col xs={6}>
            <h3>{this.props.name2}</h3>
            <p>PLOD: 50%</p>
            <p>[Sentiment-Placeholder]</p>
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