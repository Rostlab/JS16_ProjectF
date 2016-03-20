import React from 'react';
let {Component} = React;
import {Grid, Row, Col, Image, Tabs, Tab} from 'react-bootstrap';
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
<h3 className="text-center">Twitter top 5 loved</h3>
<Tabs defaultActiveKey={1}>
    <Tab eventKey={1} title="Tab 1">Algorithm 1</Tab>
    <Tab eventKey={2} title="Tab 2">Algorithm 2</Tab>
  </Tabs>
				</Col>
				<Col xs={12} sm={6}>
<h3 className="text-center">Twitter top 5 hated</h3>
<Tabs defaultActiveKey={1}>
    <Tab eventKey={1} title="Tab 1">Algorithm 1</Tab>
    <Tab eventKey={2} title="Tab 2">Algorithm 2</Tab>
  </Tabs>
				</Col>
			</Row>
			<Row className="ranking-fields">
				<Col xs={12} sm={6}>
<h3 className="text-center">Who is most likely to die next</h3>
<Tabs defaultActiveKey={1}>
    <Tab eventKey={1} title="Tab 1">Algorithm 1</Tab>
    <Tab eventKey={2} title="Tab 2">Algorithm 2</Tab>
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
