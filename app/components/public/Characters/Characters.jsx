/*eslint no-undef: 0*/

import React from 'react';
let {Component} = React;
import $ from 'jquery';
import './Characters.css';
import { Row, Col, Grid, ProgressBar, Glyphicon } from 'react-bootstrap';

import MapComp from '../../common/MapComp/MapComp.jsx';
import Store from '../../../stores/CharactersStore';
import Actions from '../../../actions/CharactersActions';
import CharacterDetailsMedia from '../../common/CharacterDetails/CharacterDetailsMedia.jsx';
import CharacterDetailsStats from '../../common/CharacterDetails/CharacterDetailsStats.jsx';
import SentimentStore from '../../../stores/TwitterSentimentsStore';

import CharacterPlodDisplay from '../../common/CharacterPlodDisplay/CharacterPlodDisplay';
import tombstone from './rip_tombstone.png';
import DeadCharacter from './DeadCharacter';

import window from 'global';

export default class Character extends Component {

    constructor (props) {
        super(props);

        this.animating = false;
        let character = Store.getCharacter();

        this.state = {
            character: character,
            plodShow: 0,
            plodBook: 0,
            plodArff: '0',
            plodTextShow: '',
            plodTextBook: '',
            sentiment: {
                positive: 0,
                negative: 0
            },
            chartLoaded: false,
            plodByYearShow: [],
            plodByYearBook: []
        };
        this._onChange = this._onChange.bind(this);
    }

    componentWillMount (){
        Store.addChangeListener(this._onChange);
    }

    componentDidMount() {
        Actions.loadCharacter(decodeURIComponent(this.props.params.id));
        //SentimentActions.loadCharacterSentiment(decodeURIComponent(this.props.params.id));
    }

    componentWillUnmount(){
        Store.removeChangeListener(this._onChange);
    }

    _onChange() {
        let character = Store.getCharacter();
        
        this.setState({
            character: character,
            sentiment: SentimentStore.getCharacterSentiment()
        });

        const checkShow = !character.dateOfDeath && character.gotplod && character.gotarffplod;
        const checkBook = !character.dateOfDeath && character.gotplod && character.gotarffplod;

        let randval = parseInt(character.gotplod.plod + 10 - Math.random() * 20);
        if (randval > 100) {
            randval = 100;
        } else if (randval < 0) {
            randval = 1;
        }

        this.setState({
            // temporary dummy data - TODO: remove
            plodShow: (checkShow) ? randval || 0 : 100,
            plodByYearShow: character.plodByYearShow,
            plodTextShow: (checkShow) ? '%(percent)s%' : 'D E A D',

            // Book data
            plodBook: (checkBook) ? parseInt(character.gotplod.plod) || 0 : 100,
            plodByYearBook: character.plodByYearBook,
            plodTextBook: (checkBook) ? '%(percent)s%' : 'D E A D',

            character: character,
            sentiment: SentimentStore.getCharacterSentiment() || { positive: 0, negative: 0}
        });
        
        // TODO: remove
        console.log(this.state); /*eslint no-console:0,no-undef:0*/
    }

    togglePlodDisplay() {
        if (this.animating) {
            return;
        }

        this.animating = true;
        var bookContainer = $(".plodBookContainer");
        var characterShowImg = $(".character-show-img");
        if (bookContainer.hasClass('plodContainerHidden')) {
            bookContainer.removeClass("plodContainerZIndexLower").removeClass("plodContainerHidden");
            characterShowImg.addClass("hiddenImg");
        } else {
            bookContainer.addClass("plodContainerHidden");
            characterShowImg.removeClass("hiddenImg");
            window.setTimeout(() => {
                $(".plodBookContainer").addClass("plodContainerZIndexLower");
            }, 400);
        }

        let button = $(".togglePlodDisplayButtonBackground");
        if (button.hasClass("active")) {
            button.removeClass("active").animate({
                "left": "0",
                "backgroundColor": "#7a7a7a"
            }, 200);
        } else {
            button.addClass("active").animate({
                "left": "50%",
                "backgroundColor": "#5A180C"
            }, 200);
        }

        window.setTimeout(function() {
            this.animating = false;
        }.bind(this), 400);
    }

    render() {
        var base_url = process.env.__PROTOCOL__ + process.env.__API__ + "/";
        var img = (!this.state.character.imageLink) ? "/images/placeholder-male.png" : base_url+this.state.character.imageLink;

        return (
          <Grid id="character-page-container">
            <div className="character-container">
                <Row>
                    <div className="character-header">
                        <div className="character-name-container">
                            <div className="character-name-background"></div>
                            <Col md={9} mdOffset={3} className="character-name">
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
                    <Col md={3}>
                        <div className="character-photo">
                            <img src={img}/>
                            {this.state.character.show && this.state.character.show.image ? 
                                <img className="character-show-img" src={this.state.character.show.image}/> : ''}
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="togglePlodDisplayButton" onClick={this.togglePlodDisplay.bind(this)}>
                            <div className="togglePlodDisplayButtonBackground"></div>
                            <div className="togglePlodDisplayButtonOption">Show</div>
                            <div className="togglePlodDisplayButtonOption">Book</div>
                        </div>
                        <div className="plodOuterContainer">
                            { this.state.plodShow < 100 && this.state.character.show && this.state.character.show.alive == true ?
                                <div className="plodShowContainer">
                                    <h3>Our Predictions</h3>
                                    <span className="subtitle">TV show</span>
                                    <p>{this.state.character.name}'s <b>Likelihood to Survive</b> between the years 300 and 320 AC is:</p>
                                    <div className="plodContainer">
                                        <CharacterPlodDisplay plodByYear={this.state.plodByYearShow} />
                                    </div>
                                    <p>{this.state.character.name}'s <b>Predicted Likelihood of Death</b> in season 8 is:</p>
                                    <div className="plodContainer">
                                        <ProgressBar now={this.state.plodShow} label={this.state.plodTextShow} />
                                        <img src={tombstone} />
                                    </div>
                                </div> 
                                : 
                                <div className="plodShowContainer">
                                    <DeadCharacter name={this.state.character.name} 
                                                   deathText={this.state.character.show && this.state.character.show.death ? this.state.character.show.death + ' AC' : 'D E A D'} 
                                                   mediumText="TV show"/>
                                </div>
                            }

                            { this.state.plodBook < 100 && this.state.character.book && !this.state.character.book.dateOfDeath ?
                                <div className="plodBookContainer plodContainerHidden plodContainerZIndexLower">
                                    <h3>Our Predictions</h3>
                                    <span className="subtitle">books</span>
                                    <p>{this.state.character.name}'s <b>Likelihood to Survive</b> between the years 300 and 320 AC is:</p>
                                    <div className="plodContainer">
                                        <CharacterPlodDisplay plodByYear={this.state.plodByYearBook} />
                                    </div>
                                    <p>{this.state.character.name}'s <b>Predicted Likelihood of Death</b> in <i>'the Winds of Winter'</i> is:</p>
                                    <div className="plodContainer">
                                        <ProgressBar now={this.state.plodBook} label={this.state.plodTextBook} />
                                        <img src={tombstone} />
                                    </div>
                                </div>
                                : 
                                <div className="plodBookContainer plodContainerHidden plodContainerZIndexLower">
                                    <DeadCharacter name={this.state.character.name} deathText={this.state.character.dateOfDeath + 'AC'} mediumText="books"/>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col className="leftBar" md={3}>
                        <h3>Comparison</h3>
                        <h4>between the&nbsp;books and&nbsp;the TV&nbsp;show</h4>
                    </Col>
                    <Col md={9}>
                        <CharacterDetailsMedia data={this.state} character={this.state.character}/>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col className="leftBar" md={3}>
                        <h3>Interesting Stats</h3>
                        <h4>about {this.state.character.name}</h4>
                    </Col>
                    <Col md={9}>
                        <CharacterDetailsStats data={this.state} />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col className="leftBar" md={3}>
                        <h3>Machine Learning</h3>
                        <h4>predicting life and death in Westeros</h4>
                    </Col>
                    <Col md={9}>
                        <div className="card">
                            <h3>Character Death & Longevity</h3>
                            <p>Our in-house developed machine learning algorithm predicts
                                two different values: <b>predicted likelihood of death</b> in season 8 of the TV show or the next book, and the <b>character longevity</b> prediction 
                                between the years 300 to 320 AC.</p>
                            <p>We do this based on various features that we extracted for each character from the first five books of the <i>A&nbsp;Song of&nbsp;Ice
                                and&nbsp;Fire series</i> by George R.&nbsp;R. Martin and the first seven seasons of the TV show <i>Game of&nbsp;Thrones</i> by HBO.</p>
                            <a href="/machine-learning-algorithm-predicts-death-game-of-thrones" className="readMore">Read more</a>
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col md={12}>
                        <h3 style={{marginBottom: "35px"}}>Follow {this.state.character.name}</h3>
                    </Col>
                    <Col>
                        <div id="characterMap">
                            <MapComp character={[this.props.params.id]} />
                        </div>
                    </Col>
                </Row>

            </div>
          </Grid>
        );
    }
}
Character.propTypes = { params: React.PropTypes.object };
