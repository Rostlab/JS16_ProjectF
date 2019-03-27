import React from 'react';
let {Component} = React;

import './ForTheThrone.css';

import antagonistCharacters from "json!./antagonistCharacters.json";

import Actions from '../../../actions/CharactersPlodActions.js';
import Store from '../../../stores/CharactersPlodStore.js';
import Countdown from '../Countdown/Countdown.jsx';

import $ from 'jquery';

export default class ForTheThrone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            charLeft: {},
            charRight: {},
            charLeftPlod: {},
            charRightPlod: {},
            smallChars: []
        };
    }

    componentWillMount (){
        Store.addChangeListener(this._onChange.bind(this));

        let chars = this.getRandAntagonistChars();
        let smallChars = this.getRandSmallChars(chars);
        this.setState({
            charLeft: chars[0],
            charRight: chars[1],
            smallChars: smallChars
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

    getRandSmallChars(chars) {
        let smallChars = [];
        let smallCharsElems = [];
        let keys = Object.keys(antagonistCharacters.characters);

        while (smallChars.length < 5) {
            let rand = Math.floor(Math.random() * keys.length);
            if (chars[1] !== keys[rand] && chars[0] !== keys[rand] && smallChars.indexOf(keys[rand]) === -1) {
                smallChars.push(keys[rand]);
                smallCharsElems.push({
                    name: antagonistCharacters.characters[keys[rand]].name,
                    key: keys[rand]
                });
            }
        }

        return smallCharsElems;
    }

    focus() {
        $( "#aiLink" ).animate({
            opacity: "1"
        });

        $("#fttHeader, #fttWhoDoYouChoose, .fttTombstoneQuestionMark").animate({
            opacity: "0"
        });
    }

    focusLeftChar() {
        this.focus();

        $( "#fttCharLeftImg" ).animate({
            left: "140",
            bottom: "0",
            height: "600"
        });

        $( "#fttCharRightImg" ).animate({
            bottom: "0",
            height: "350"
        });

        $( "#fttThrone" ).animate({
            marginLeft: "0",
            left: "100",
            bottom: "0",
            height: "600"
        });

        $( "#fttCharLeftText" ).animate({
            opacity: "1"
        });
    }

    focusRightChar() {
        this.focus();

        $( "#fttCharRightImg" ).animate({
            right: "140",
            bottom: "0",
            height: "600"
        });

        $( "#fttCharLeftImg" ).animate({
            bottom: "0",
            height: "350"
        });

        $( "#fttThrone" ).animate({
            marginLeft: "0",
            left: "550",
            bottom: "0",
            height: "600"
        });

        $( "#fttCharRightText" ).animate({
            opacity: "1"
        });
    }

    unfocus() {
        $( "#fttCharLeftImg" ).animate({
            left: "0",
            bottom: "0",
            height: "500"
        });

        $( "#fttCharRightImg" ).animate({
            right: "0",
            bottom: "0",
            height: "500"
        });

        $( "#fttThrone" ).animate({
            right: "0",
            left: "-200",
            marginLeft: "50%",
            bottom: "0",
            height: "450"
        });

        $( "#fttCharLeftText, #fttCharRightText, #fttCharLeftTSPLOD, #fttCharRightTSPLOD" ).animate({
            opacity: "0"
        });

        $("#fttHeader, .fttTombstoneQuestionMark").animate({
            opacity: "1"
        });
    }

    render() {
        return (
            <div id="fttContainer">
                <div className="fttCharArea fttLeft" onMouseEnter={this.focusLeftChar.bind(this)} onMouseLeave={this.unfocus.bind(this)}></div>
                <div className="fttCharArea fttRight" onMouseEnter={this.focusRightChar.bind(this)} onMouseLeave={this.unfocus.bind(this)}></div>
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
                        <p>Move your mouse over a character to discover their<br /><b>Predicted Likelihood of Death</b> in GoT: Season 8!</p>
                    </div>

                    <div id="aiLink" className="fttCard">
                        <h3 className="center" style={{"marginTop": "0px"}}>A Song of ice and data:</h3>
                        <h4 className="center">Westeros and Machine learning</h4>
                        <p>Our in-house developed machine learning algorithm predicts likelihood of death based on various 
                        features that we extracted for each of the more than 2000 characters in George&nbsp;R.&nbsp;R.&nbsp;Martin's 
                        <i> A&nbsp;Song&nbsp;of&nbsp;Ice&nbsp;and&nbsp;Fire</i> series</p>
                        <div className="center">
                            <a href="/machine-learning-algorithm-predicts-death-game-of-thrones">
                                <b>Read more about our prediction algorithm.</b>
                            </a>
                        </div>
                    </div>

                </div>
                <div id="fttCountdown">
                    <div className="content">
                        <div id="fttCountdownLeft">
                            <br />
                            <h4 className="center">The next episode airs in</h4>
                            <Countdown date="April 15, 2019, 03:00:00"></Countdown>
                        </div>
                        <div id="fttCountdownRight">
                            <h3>Discover your favorite character's <strong>chance of survival</strong> now!</h3>
                        </div>
                    </div>
                </div>
                <div id="fttCharacters">
                    <div className="content">
                        {this.state.smallChars.map(function(elem) {
                            return (
                                <a target="_blank" className="fttCharacter" href={"/characters/" + elem.name}>
                                    <img src={"/ForTheThrone/img/"+elem.key+"Small.png"} />
                                    <div>{elem.name}</div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}