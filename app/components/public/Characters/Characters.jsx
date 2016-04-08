/*eslint no-undef: 0*/

import React from 'react';
let {Component} = React;
import $ from 'jquery';
import './Characters.css';
import { Row, Col, Image, ProgressBar, Glyphicon } from 'react-bootstrap';

import MapComp from '../../common/MapComp/MapComp.jsx';
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import CharacterDetails from '../../common/CharacterDetails/CharacterDetails.jsx';
import tombstone from './rip_tombstone.png';

export default class Character extends Component {

    constructor (props) {
        super(props);
        this.state = {
            character: Store.getCharacter()
        };
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

        $('head').append('<link rel="stylesheet" type="text/css" href="/d4/chart.css">');
        if (this.state.character.name != undefined){
            const name = this.state.character.name.replace(/ /g,'_');
            $.getScript("/d4/chart.js",function(){
                var chart = new characterChart(d3.select("#chart"), "/d4/csv/" + name + ".csv"); /*eslint no-undef:0*/
                d3.select(window).on('resize', chart.resize);/*eslint no-undef:0*/
            });
        }

        const plod = (!this.state.character.dateOfDeath) ? this.state.character.plod || 0 : 100;
        const plodText = (!this.state.character.dateOfDeath) ? '%(percent)s%' : 'D E A D';

        return (
            <div className="character-container">
                <Row fluid>
                    <div className="header-image">
                        <div className="character-name-container">
                            <Col xs={12} sm={9}  md={8} className="character-name">
                                <div className="u-inlineBlock"><h1>{this.state.character.name}</h1></div>
                                <a href={"https://awoiaf.westeros.org/index.php/" + this.state.character.name}
                                   target="_blank"
                                   className="btn--secondary wikiButton u-inlineBlock">
                                    <Glyphicon glyph="share-alt" />
                                    Wiki
                                </a>
                            </Col>
                        </div>
                    </div>
                </Row>
                <Row className="character-intro" fluid >
                    <Col xs={6} xsOffset={3} sm={3} smOffset={0} md={3} mdOffset={1} className="character-photo">
                        <Image thumbnail src={img}/>
                    </Col>
                    <Col xs={11} sm={5}  smOffset={1}>
                        <CharacterDetails data={this.state.character} />
                    </Col>
                </Row>
                <div className="character-stats">
                <Row>
                    <Col md={8} mdOffset={2}>
                        <h2>Likelihood of Death</h2>
                        <p>{this.state.character.name}'s likelihood to die is:</p>
                        <div className="plodContainer">
                            <ProgressBar now={plod} label={plodText} />
                            <img src={tombstone} />
                        </div>
                        <p>Our in-house developed machine learning algorithm predicts likelihood of death based on various features that we extracted for each character from the first five books of the Song of Ice and Fire series. <br />
                            Our second, less accurate, algorithm predicts likelihood to be XX%.</p>
                        <p><a href="/machine-learning-algorithm-predict-death-game-of-thrones">Click here to read more about our prediction algorithms.</a></p>
                    </Col>
                </Row>
                <Row>
                    <Col md={8} mdOffset={2}>
                        <h2>People on Twitter say</h2>
                        <svg id="chart" width="100%" height="400"></svg>
                    </Col>  
                </Row>
                
                </div>

                <Row>
                    <Col md={8} mdOffset={2}>
                        <h2>Follow {this.state.character.name}</h2>
                    </Col>
                    <Col>
                        <MapComp character={[this.props.params.id]} />
                    </Col>
                </Row>

            </div>
        );
    }
}
Character.propTypes = { params: React.PropTypes.object };
