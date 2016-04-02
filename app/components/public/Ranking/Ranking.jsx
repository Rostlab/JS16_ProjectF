import React from 'react';
let {Component} = React;
import {Grid, Row, Col, Tabs, Tab, OverlayTrigger, Popover} from 'react-bootstrap';
import "./Ranking.css";
export default class Ranking extends Component {
  render() {
    return (
      <div>
		<Grid className="ranking">
			<Row className="ranking-fields">
				<Col xs={12} sm={6}>
<OverlayTrigger trigger="click" placement="top" overlay={<Popover title="Top 5 loved">We have two algorithms!</Popover>}>
<h3 className="text-center ranking-title">Twitter top 5 loved</h3>
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
<OverlayTrigger trigger="click" placement="top" overlay={<Popover title="Top 5 hated">We have two algorithms!</Popover>}>
<h3 className="text-center ranking-title">Twitter top 5 hated</h3>
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
			</Row>
			<Row className="ranking-fields">
				<Col xs={12} sm={6}>
<OverlayTrigger trigger="click" placement="top" overlay={<Popover title="PLOD">We have two algorithms!</Popover>}>				
<h3 className="text-center ranking-title">Who is most likely to die next</h3>
</OverlayTrigger>
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
