/*eslint no-undef: 0*/

import React from 'react';
let {Component} = React;
import './Characters.css';
import { Row, Col, Image, Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap';

import MapComp from '../../common/MapComp/MapComp.jsx';
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

    componentDidMount() {
        Actions.loadCharacter(decodeURIComponent(this.props.params.id));
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
        var base_url = process.env.__PROTOCOL__ + process.env.__API__ + "/";
        var img = (!this.state.character.imageLink) ? "https://placeholdit.imgix.net/~text?txtsize=33&txt=profile%20picture%20&w=350&h=350" : base_url+this.state.character.imageLink;
        return (
            <div className="character-container">
                <Row fluid>
                    <div className="header-image">
                        <div className="character-name-container">
                            <Col xs={12} sm={9}  md={8} className="character-name">
                                <div><h1>{this.state.character.name}</h1></div>
                            </Col>
                        </div>
                    </div>
                </Row>
                <Row className="character-intro" fluid >
                    <Col xs={6} xsOffset={3} sm={3} smOffset={0} md={3} mdOffset={1} className="character-photo">
                        <Image thumbnail src={img}/>
                    </Col>
                    <Col xs={11} sm={5}  smOffset={1}>
                        <ListGroup className="character-details">
                                    <ListGroupItem>Age</ListGroupItem>
                                    <ListGroupItem>House</ListGroupItem>
                                    <ListGroupItem>Culture</ListGroupItem>
                                    <ListGroupItem>House</ListGroupItem>
                                    <ListGroupItem>Reputation</ListGroupItem>
                                </ListGroup>
                    </Col>
                </Row>
                <div className="character-stats">
                <Row>
                    <Col md={8} mdOffset={2}>
                        <h2>Likelihood of Death</h2>
                        <p>Check out what our two different algorithms say</p>
                        <Tabs>
                            <Tab eventKey={1} title="Predictor 1">
                                <p>{this.state.character.name}'s likeliyhood to die is 50%</p>
                            </Tab>
                            <Tab eventKey={2} title="Predictor 2">
                                <p>{this.state.character.name}'s likeliyhood to die is 10%</p>
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
                        <h2>Places associated with {this.state.character.name}</h2>
                        <p>Location history</p>
                    </Col>
                    <Col md={8} mdOffset={2}>
                        <MapComp character={[this.props.params.id]} />
                    </Col>
                </Row>
                </div>



            </div>
        );
    }
}
Character.propTypes = { params: React.PropTypes.object };
