import React from 'react';
let {Component} = React;

import { Link } from 'react-router';
import {Grid, Row, Col} from 'react-bootstrap';

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
            {name: 'House Cole'},
            {name: 'House Rosby'},
            {name: 'House Chelsted'},
            {name: 'House Stokeworth'},
            {name: 'House Cassel'}
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
                <Grid className="ranking">
                    <Row className="ranking-fields">
                        <Col xs={12} sm={6}>
                            <div className="ranking-field">
                                <h2 className="text-center ranking-title">Twitter top 5 loved</h2>
                                <ul>
                                    {
                                        this.state.twitterTopSentiments.map((char) => {
                                            return <li>
                                                <h4><Link to={'/characters/' + char.name}>
                                                    {char.name}
                                                </Link></h4>
                                            </li>;
                                        })
                                    }
                                </ul>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
                            <div className="ranking-field">
                                <h2 className="text-center ranking-title">Twitter top 5 hated</h2>
                                <ul>
                                    {
                                        this.state.twitterFlopSentiments.map((char) => {
                                            return <li>
                                                <h4><Link to={'/characters/' + char.name}>
                                                    {char.name}
                                                </Link></h4>
                                            </li>;
                                        })
                                    }
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row className="ranking-fields">
                        <Col xs={12} sm={6}>
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
                                <p className="see-more"><Link to={'/characters/?search=&page=1&sort=plod&order=1'}>See more</Link></p>
                            </div>
                        </Col>
                        <Col xs={12} sm={6}>
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
                                <p className="see-more"><Link to={'/characters/?search=&page=1&sort=plod&order=-1'}>See more</Link></p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="ranking-fields">
                        <Col sm={6} smOffset={3}>
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
                    </Row>
                </Grid>
            </div>
        );
    }
}