import React from 'react';
let {Component} = React;
import './Characters.css';
import { Grid, Row, Col, Image, Panel, Tabs, Tab } from 'react-bootstrap';

import Map from '../../common/MapComp/MapComp.jsx';

export default class Character extends Component {

    render() {
        return (
            <div className="character-container">
                    <Row className="character-intro" fluid >
                        <Col md={3} mdOffset={1}>
                            <Image className="character-photo"
                                   src="https://placeholdit.imgix.net/~text?txtsize=33&txt=profile%20picture%20&w=350&h=350"/>
                        </Col>
                        <Col md={6}>
                            <div className="character-name"><h1>Cercei Stark, ID: {this.props.params.id}</h1></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <h2>Likelihood of Death</h2>
                            <p>Check out what our two different algorithms say</p>
                            <Tabs>
                                <Tab eventKey={1} title="Predictor 1">
                                    <p>Cercei's likeliyhood to die is 50%</p>
                                </Tab>
                                <Tab eventKey={2} title="Predictor 2">
                                    <p>Cercei's likeliyhood to die is 10%</p>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <h2>People on Twitter say</h2>
                            <Tabs>
                                <Tab eventKey={1} title="Twitter Analysis 1">
                                    <p>Like Reactions: love-emoji, love-emoji, ...</p>
                                    <p>Dislike Reactions: hate-emoji</p>
                                    <p>Number of tweets: 752</p>
                                </Tab>
                                <Tab eventKey={2} title="Twitter Analysis 2">
                                    <p>Like Reactions:</p>
                                    <p>Dislike Reactions: hate-emoji</p>
                                    <p>Number of tweets: 124</p>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <h2>Location History</h2>
                            <Map />
                        </Col>
                    </Row>
            </div>
        );
    }
}
