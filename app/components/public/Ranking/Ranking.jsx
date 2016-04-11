import React from 'react';
let {Component} = React;

import { Link } from 'react-router';
import {Grid, Row, Col, OverlayTrigger, Tooltip, Glyphicon} from 'react-bootstrap';
import "./Ranking.css";
import SentimentStore from '../../../stores/TwitterSentimentsStore';
import SentimentsActions from '../../../actions/TwitterSentimentsActions';

export default class Ranking extends Component {
    getHardcodedPlodTop5() {
        return [
            {name: 'Tommen Baratheon', plod: '97.9'},
            {name: 'Stannis Baratheon', plod: '96.4'},
            {name: 'Daenerys Targaryen', plod: '95.3'},
            {name: 'Davos Seaworth', plod: '91.8'},
            {name: 'Petyr Baelish', plod: '91.8'}
        ];
    }
    getHardcodedHousesTop5() {
        return [
            {name: 'House Tully'},
            {name: 'House Clegane'},
            {name: 'House Velaryon'},
            {name: 'House Seaworth'},
            {name: 'House Nymeros'}
            // {name: 'House Targaryen'},
            // {name: 'House Oakheart'},
            // {name: 'House Greyjoy'},
            // {name: 'House Lannister'},
            // {name: 'House Westerling'}
        ];
    }
    getHardcodedSurvivors() {
        return [
            {name: 'Sansa Stark', plod: '3.9'},
            {name: 'Jon Snow', plod: '11.6'},
            {name: 'Cersei Lannister', plod: '16.6'},
            {name: 'Mace Tyrell', plod: '18.7'},
            {name: 'Roose Bolton', plod: '28.9'}
        ];
    }

    constructor(props) {
        super(props);
        this.state = {
            twitterTopSentiments: [],
            twitterFlopSentiments: [],
            twitterMostDiscussedSentiments: [],
            twitterTopControversial: [],
            twitterTopSentiments_d5: [],
            twitterFlopSentiments_d5: [],
            twitterMostDiscussedSentiments_d5: []
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount (){
        SentimentStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        SentimentStore.removeChangeListener(this._onChange);
    }


    componentDidMount() {
        const startDate = (new Date(1995, 11, 17)).toISOString();
        const today = (new Date()).toISOString();
        SentimentsActions.loadTopSentiments(5);
        SentimentsActions.loadFlopSentiments(5);
        SentimentsActions.loadMostDiscussedSentiments(5);
        SentimentsActions.loadControversialSentiments(5, startDate , today);
        SentimentsActions.loadTopSentiments_d5(5, startDate , today);
        SentimentsActions.loadFlopSentiments_d5(5, startDate , today);
        SentimentsActions.loadMostDiscussedSentiments_d5(5, startDate , today);
    }

    _onChange() {
        this.setState({
            twitterTopSentiments: SentimentStore.getTopSentiments(),
            twitterFlopSentiments: SentimentStore.getFlopSentiments(),
            twitterMostDiscussedSentiments: SentimentStore.getMostDiscussedSentiments(),
            twitterTopControversial: SentimentStore.getFlopSentiments(),
            twitterTopSentiments_d5: SentimentStore.getTopSentiments_d5(),
            twitterFlopSentiments_d5: SentimentStore.getFlopSentiments_d5(),
            twitterMostDiscussedSentiments_d5: SentimentStore.getMostDiscussedSentiments_d5()
        });
    }

    render() {

        return (
            <div>
            <div className="header-image">
                <Grid>
                    <Row className="ranking-fields ranking-plod">
                        <Col xs={10} xsOffset={1} sm={8} smOffset={2}>
                            <div className="ranking-field">
                                <h2 className="text-center ranking-title">Who is most likely to die next</h2>
                                <ul>
                                    {
                                        this.getHardcodedPlodTop5().map((char) => {
                                            return <li>
                                                <h4><Link to={'/characters/' + char.name}>
                                                    {char.name} [{parseInt(char.plod)}%]
                                                </Link></h4>
                                            </li>;
                                        })
                                    }
                                </ul>
                                <p className="see-more"><Link to={'/characters/?search=&page=1&sort=plod&order=-1'}>See more</Link></p>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
                <Grid className="ranking tweets-fields">
                 <Row className="ranking-fields">
                    <h1 className="center rankingTweets-heading">Tweets about GoT-characters:</h1>
                        <Col sm={12} md={6}>
                            <div className="ranking-field">
                                    <h2 className="text-center ranking-title twitterTooltip">Most Positive Mentions
                                        <OverlayTrigger placement="top" overlay={<Tooltip>love, joy, enthusiasm</Tooltip>}>
                                            <Glyphicon glyph="question-sign" />
                                        </OverlayTrigger>
                                    </h2>
                                    {
                                        this.state.twitterTopSentiments.map((char) => {
                                            return <Row>
                                                    <Col xs={8}>
                                                        <h4><Link to={'/characters/' + char.name}>
                                                            {char.name}
                                                        </Link>
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} className="text-center">
                                                        <OverlayTrigger trigger="hover" placement="top" overlay={<Tooltip><u><strong>Tweets</strong></u><br/><strong>{char.positive}</strong> positive<br/><strong>{char.negative}</strong> negative<br/>
                                                        <strong>{char.total}</strong> total</Tooltip>}>
                                                            <a href={"http://twitter.com/share?text=I%20love%20"+char.name+"&url=https://got.show/&via=asoiad"} target="_blank">
                                                                <h4 className="support">
                                                                {char.positive} &nbsp;<span className="glyphicon glyphicon-thumbs-up"></span>
                                                                </h4>
                                                            </a>
                                                        </OverlayTrigger>
                                                    </Col>
                                                    </Row>;
                                        })
                                    }
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className="ranking-field">
                                <h2 className="text-center ranking-title twitterTooltip">Most Negative Mentions
                                    <OverlayTrigger placement="top" overlay={<Tooltip>hate, fear, anger, frustration</Tooltip>}>
                                        <Glyphicon glyph="question-sign" />
                                    </OverlayTrigger>
                                </h2>
                                    {
                                        this.state.twitterFlopSentiments.map((char) => {
                                            return <Row>
                                                    <Col xs={8}>
                                                        <h4><Link to={'/characters/' + char.name}>
                                                            {char.name}
                                                        </Link>
                                                        </h4>
                                                    </Col>
                                                    <Col xs={4} className="text-center">
                                                        <OverlayTrigger trigger="hover" placement="top" 
                                                        overlay={<Tooltip><u><strong>Tweets</strong></u><br/><strong>{char.positive}</strong> positive<br/><strong>{char.negative}</strong> negative<br/>
                                                        <strong>{char.total}</strong> total</Tooltip>}>
                                                            <a href={"http://twitter.com/share?text=I%20hate%20"+char.name+"&url=https://got.show/&via=asoiad"} target="_blank">
                                                                <h4 className="nosupport">
                                                                {char.negative} &nbsp;<span className="glyphicon glyphicon-thumbs-down"></span>
                                                                </h4>
                                                            </a>
                                                        </OverlayTrigger>
                                                    </Col>
                                                    </Row>;
                                        })
                                    }
                            </div>
                        </Col>
                    </Row>

                    <Row className="ranking-fields">
                        <Col sm={12} md={6}>
                            <div className="ranking-field">
                                <h2 className="text-center ranking-title">Most dangerous Houses </h2>
                                <ul>
                                    {
                                        this.getHardcodedHousesTop5().map((house) => {
                                            return <li><h4>{house.name}</h4></li>;
                                        })
                                    }
                                </ul>
                            </div>
                        </Col>
                        <Col sm={12} md={6}>
                            <div className="ranking-field">
                                <h2 className="text-center ranking-title">Top Survivors</h2>
                                <ul>
                                    {
                                        this.getHardcodedSurvivors().map((char) => {
                                            return <li>
                                                <h4><Link to={'/characters/' + char.name}>
                                                    {char.name} [{parseInt(char.plod)}%]
                                                </Link></h4>
                                            </li>;
                                        })
                                    }
                                </ul>
                                <p className="see-more"><Link to={'/characters/?search=&page=1&sort=plod&order=1'}>See more</Link></p>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}