import React from 'react';
let {Component} = React;

import './ForTheThrone.css';

import antagonistCharacters from "json!./antagonistCharacters.json";

import Actions from '../../../actions/CharactersPlodActions.js';
import Store from '../../../stores/CharactersPlodStore.js';
import Countdown from '../Countdown/Countdown.jsx';
import Slider from './Slider/Slider.jsx';

import $ from 'jquery';

export default class ForTheThrone extends Component {
    constructor(props) {
        super(props);        

        this.state = {
            charLeft: {},
            charRight: {},
            charLeftPlod: {},
            charRightPlod: {}
        };
    }

    componentWillMount (){
        Store.addChangeListener(this._onChange.bind(this));
        
        let chars = this.getRandAntagonistChars();
        this.setState({
            charLeft: chars[0],
            charRight: chars[1]
        });
    }

    componentDidMount() {
        Actions.loadCharactersPlodByName([this.state.charLeft.name, this.state.charRight.name]);
    }
    
    _onChange() {
        let plods = Store.getCharactersPlodByName();
        let plodLeft, plodRight;

        if (plods[0].name == this.state.charLeft.name) {
            plodLeft = plods[0];
            plodRight = plods[1];
        } else {
            plodLeft = plods[1];
            plodRight = plods[0];
        }

        if (plods[0] && plods[1]) {
            this.setState({
                charLeftPlod: plodLeft,
                charRightPlod: plodRight
            });
        }
    }

    componentWillUnmount(){
        Store.removeChangeListener(this._onChange);
    }

    getRandAntagonistChars() {
        let antagonistsCount = antagonistCharacters.antagonists.length;
        let randomElemIndex  = Math.floor(Math.random() * antagonistsCount);

        // setting the characters
        let left      = Math.floor(Math.random() * 2);
        let charLeft  = antagonistCharacters.antagonists[randomElemIndex][left];
        let charRight = antagonistCharacters.antagonists[randomElemIndex][1 - left];
        let chars     = [antagonistCharacters.characters[charLeft], antagonistCharacters.characters[charRight]];
        chars[0].img = "ForTheThrone/img/" + charLeft + ".png";
        chars[1].img = "ForTheThrone/img/" + charRight + ".png";

        return chars;
    }

    focus() {
        $( "#aiLink" ).animate({
            opacity: "1"
        }, 0);

        $("#fttWhoDoYouChoose").animate({
            opacity: "0"
        }, 0);
    }

    render() {
        return (
            
            <div id="fttContainer">
                <div className="fttCharArea fttLeft" onMouseEnter={this.focus.bind(this)}></div>
                <div className="fttCharArea fttRight" onMouseEnter={this.focus.bind(this)}></div>

                <div id="fttAntagonists">
                    <img src="ForTheThrone/img/iron-throne.png" id="fttThrone" />
                    <div id="fttHeader" className="center">
                        <br/>
                        <h3>When you play the game of thrones you win...</h3>
                        <h1 className="center">...or you die</h1>
                    </div>

                    <div className="fttCharContainer fttLeft">
                        <img src={this.state.charLeft.img} id="fttCharLeftImg" className="fttCharImg fttLeft" />
                        <div className="fttCharTombstone fttCharLeftTombstone fttTombstonePlod">
                            {this.state.charLeftPlod.plod < 100 ? parseInt(this.state.charLeftPlod.plod) : 100} %
                        </div>
                        <div className="fttCharTombstone fttCharLeftTombstone fttTombstoneQuestionMark">?</div>
                        <div id="fttCharLeftText" className="fttCharText">
                            <h2>{this.state.charLeft.question}</h2>
                            <p>{this.state.charLeft.description}</p>
                            <i>"{this.state.charLeft.quote}"</i>
                        </div>
                    </div>
                    <div className="fttCharContainer fttRight">
                        <img src={this.state.charRight.img} id="fttCharRightImg" className="fttCharImg fttRight"/>
                        <div className="fttCharTombstone fttCharRightTombstone fttTombstonePlod">
                            {this.state.charRightPlod.plod < 100 ? parseInt(this.state.charRightPlod.plod) : 100} %
                        </div>
                        <div className="fttCharTombstone fttCharRightTombstone fttTombstoneQuestionMark">?</div>
                        <div id="fttCharRightText" className="fttCharText">
                            <h2>{this.state.charRight.question}</h2>
                            <p>{this.state.charRight.description}</p>
                            <i>"{this.state.charRight.quote}"</i>
                        </div>
                    </div>

                    <div id="fttWhoDoYouChoose" className="fttCard">
                        <h4 className="center">Who do you choose</h4>
                        <h2 className="center">#ForTheThrone?</h2>
                        <p className="center">Click or hover over a character to discover their<br /><b>Predicted Likelihood of Death</b> in GoT: Season 8!</p>
                    </div>

                    <div id="aiLink" className="fttCard">
                        <h3 className="center" style={{"marginTop": "0px"}}>A Song of ice and data:</h3>
                        <h4 className="center">Westeros and Machine learning</h4>
                        <p>Our in-house developed machine learning algorithm predicts likelihood of death based on various 
                        features that we extracted for each of the more than 2000 characters in George R.&nbsp;R. Martin's 
                        <i> A&nbsp;Song of&nbsp;Ice and&nbsp;Fire</i> series</p>
                        <div className="center">
                            <a id="readMoreLink" href="/machine-learning-algorithm-predicts-death-game-of-thrones">
                                <b>Read more about our prediction algorithm.</b>
                            </a>
                        </div>
                    </div>

                </div>
                <div id="fttCountdown">
                    <div className="content">
                        <div id="fttCountdownLeft"><h4 className="center">The next episode airs in</h4>
                            <Countdown date="April 15, 2019, 03:00:00"></Countdown>
                        </div>
                        <div id="fttCountdownRight">
                            <h3>Discover your favorite character's <strong>chance of survival</strong> now!</h3>
                        </div>
                    </div>
                </div>
                <div id="fttCharacters">
                    <div className="content">
                        <Slider></Slider> 
                    </div>
                </div>
            </div>
        );
    }
}