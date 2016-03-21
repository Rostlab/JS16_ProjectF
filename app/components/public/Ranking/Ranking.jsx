import React from 'react';
let {Component} = React;
import {Grid, Row, Col, Image, Tabs, Tab, OverlayTrigger, Popover} from 'react-bootstrap';
import "./Ranking.css";
export default class Ranking extends Component {
  render() {
    return (
      <div>
		<Grid className="ranking">
			<h1 className="text-center">Who will be the next eliminated?</h1>
			<Row className="big-battle">
				<Col xs={6}>
				<Image src="https://placeholdit.imgix.net/~text?txtsize=33&txt=profile%20picture%20&w=350&h=150"/>
				</Col>
				<Col xs={6}>
				<Image src="https://placeholdit.imgix.net/~text?txtsize=33&txt=profile%20picture%20&w=350&h=150"/>
				</Col>
			</Row>
			<Row className="big-battle-info">
				<Col xs={6}>
				<span>character 1<br/>PLOD: 70%</span>
				</Col>
				<Col xs={6}>
				<span>character 2<br/>PLOD: 73%</span>
				</Col>
			</Row>

			<Row className="ranking-fields">
				<Col xs={12} sm={6}>
<OverlayTrigger trigger="hover" placement="top" overlay={<Popover title="Popover top"><strong>Holy guacamole!</strong> Check this info.</Popover>}>
<h3 className="text-center">Twitter top 5 loved</h3>
</OverlayTrigger>
<Tabs defaultActiveKey={1}>
    <Tab eventKey={1} title="Algorithm 1">
      <Row>
        <Col xs={8}>Character 1</Col>
        <Col xs={4}>1</Col>
      </Row><Row>
        <Col xs={8}>Character 2</Col>
        <Col xs={4}>2</Col>
      </Row><Row>
        <Col xs={8}>Character 3</Col>
        <Col xs={4}>3</Col>
      </Row><Row>
        <Col xs={8}>Character 4</Col>
        <Col xs={4}>4</Col>
      </Row><Row>
        <Col xs={8}>Character 5</Col>
        <Col xs={4}>5</Col>
      </Row>
    </Tab>
    <Tab eventKey={2} title="Algorithm 2">
      <Row>
        <Col xs={8}>Character 1</Col>
        <Col xs={4}>1</Col>
      </Row><Row>
        <Col xs={8}>Character 2</Col>
        <Col xs={4}>2</Col>
    	</Row><Row>
    		<Col xs={8}>Character 3</Col>
    		<Col xs={4}>3</Col>
    	</Row><Row>
    		<Col xs={8}>Character 4</Col>
    		<Col xs={4}>4</Col>
    	</Row><Row>
    		<Col xs={8}>Character 5</Col>
    		<Col xs={4}>5</Col>
    	</Row>
    </Tab>
  </Tabs>
  </Col>
<Col xs={12} sm={6}>
<h3 className="text-center">Twitter top 5 hated</h3>
  <Tabs defaultActiveKey={1}>
    <Tab eventKey={1} title="Algorithm 1">
      <Row>
        <Col xs={8}>Character 1</Col>
        <Col xs={4}>1</Col>
      </Row><Row>
        <Col xs={8}>Character 2</Col>
        <Col xs={4}>2</Col>
      </Row><Row>
        <Col xs={8}>Character 3</Col>
        <Col xs={4}>3</Col>
      </Row><Row>
        <Col xs={8}>Character 4</Col>
    		<Col xs={4}>4</Col>
    	</Row><Row>
    		<Col xs={8}>Character 5</Col>
    		<Col xs={4}>5</Col>
    	</Row>
    </Tab>
    <Tab eventKey={2} title="Algorithm 2">
    	<Row>
    		<Col xs={8}>Character 1</Col>
    		<Col xs={4}>1</Col>
    	</Row><Row>
    		<Col xs={8}>Character 2</Col>
    		<Col xs={4}>2</Col>
    	</Row><Row>
    		<Col xs={8}>Character 3</Col>
    		<Col xs={4}>3</Col>
    	</Row><Row>
    		<Col xs={8}>Character 4</Col>
    		<Col xs={4}>4</Col>
    	</Row><Row>
    		<Col xs={8}>Character 5</Col>
    		<Col xs={4}>5</Col>
    	</Row>
    </Tab>
  </Tabs>
				</Col>
			</Row>
			<Row className="ranking-fields">
				<Col xs={12} sm={6}>
<h3 className="text-center">Who is most likely to die next</h3>
<Tabs defaultActiveKey={1}>
    <Tab eventKey={1} title="Algorithm 1">Algorithm 1</Tab>
    <Tab eventKey={2} title="Algorithm 2">Algorithm 2</Tab>
  </Tabs>
				</Col>
				<Col xs={12} sm={6}>
<h3 className="text-center">Top 5 survivors	</h3>
				</Col>
			</Row>
		</Grid>
      </div>
    );
  }
}
