import React from 'react';
let {Component} = React;
import './Characters.css';
import { Row, Col, Image, Tabs, Tab } from 'react-bootstrap';

//import Map from '../../common/MapComp/MapComp.jsx';
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';

export default class Character extends Component {

    constructor (props) {
        super(props);
        this.state = {character: Store.getCharacter()};
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount (){
        Store.addChangeListener(this._onChange);
    }

    componentDidMount(){
        Actions.loadCharacter(this.props.params.id);
    }

    componentWillUnmount(){
        Store.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            character: Store.getCharacter()
        });
    }

    render() {
        return (
            <div className="character-container">
                <Row fluid>
                    <div className="header-image"></div>
                </Row>
                    <Row className="character-intro" fluid >
                        <Col xs={12} sm={6} md={3} mdOffset={1}>
                            <Image className="character-photo"
                                   src="https://placeholdit.imgix.net/~text?txtsize=33&txt=profile%20picture%20&w=350&h=350"/>
                        </Col>
                          <Col xs={12} sm={6} md={8}>
                             <div className="character-name"><h1>{this.state.character.name}, ID: {this.state.character._id}</h1></div>
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
                        </Col>
                    </Row>
            </div>
        );
    }
}
Character.propTypes = { params: React.PropTypes.object };
