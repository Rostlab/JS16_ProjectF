import React from 'react';
let {Component} = React;

import { Link } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

import "./Ranking.css";
import SentimentStore from '../../../stores/TwitterSentimentsStore';

export default class Ranking extends Component {
    render() {
        this.state = {
            twitterTopSentiments: SentimentStore.getTopSentiments(),
            twitterFlopSentiments: SentimentStore.getFlopSentiments()
            //twitterTopControversial: SentimentStore.getTopControversialSentiments()
        };

        return (
            <div>
                <Grid className="ranking">
                    <Row className="ranking-fields">
                        <Col xs={12} sm={6}>
                            <div className="ranking-field">
                                <h3 className="text-center ranking-title">Twitter top 5 loved</h3>
                                <ul>
                                {
                                    this.state.twitterTopSentiments.map((char) => {
                                        return <li>{char}</li>;
                                    })
                                }
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="ranking-field">
                            <h3 className="text-center ranking-title">Twitter top 5 hated</h3>
                            {
                                this.state.twitterFlopSentiments.map((char) => {
                                    return <div>{char}</div>;
                                })
                            }
                            </div>
                        </Col>
                    </Row>
                    <Row className="ranking-fields">
                        <Col xs={12} sm={6}>
                            <div className="ranking-field">
                                <h3 className="text-center ranking-title">Who is most likely to die next</h3>
                                <p className="see-more"><Link to={'/characters/?search=&page=1&sort=plod&order=1'}>See more</Link></p>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="ranking-field">
                                <h3 className="text-center">Most dangerous Houses </h3>
                                <ul>
                                    <li>Gonna Hardcode</li>
                                    <li>Gonna Hardcode</li>
                                    <li>Gonna Hardcode</li>
                                    <li>Gonna Hardcode</li>
                                    <li>Gonna Hardcode</li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}