import React from 'react';
let {Component} = React;
import './BigBattle.css';
import {Image, Row, Col} from 'react-bootstrap';

export default class BigBattle extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <h1 className="text-center">Who will be the next eliminated?</h1>
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
            <span>{this.props.name1}<br/>PLOD: 70%</span>
          </Col>
          <Col xs={6}>
            <span>{this.props.name2}<br/>PLOD: 73%</span>
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