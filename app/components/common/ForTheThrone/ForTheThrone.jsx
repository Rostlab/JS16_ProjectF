import React from 'react';
let {Component} = React;

import './ForTheThrone.css';

import antagonistCharacters from "json!./antagonistCharacters.json";

import Actions from '../../../actions/CharactersPlodActions.js';
import Store from '../../../stores/CharactersPlodStore.js';
import Countdown from '../Countdown/Countdown.jsx';

import $ from 'jquery';

/* THIS IS JUST A MOCKUP */
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
        Actions.loadCharactersPlodByName([this.state.charLeft.name,this.state.charRight.name]);
    }
    
    _onChange() {
        let plods = Store.getCharactersPlodByName();
        if (plods[0] && plods[1]) {
            this.setState({
                charLeftPlod: plods[0],
                charRightPlod: plods[1]
            });

            console.log(this.state);/*eslint no-console:0,no-undef:0*/
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

    focusLeftChar() {
        $( "#fttCharLeftImg" ).animate({
            left: "140",
            bottom: "0",
            height: "600"
        });

        $( "#fttCharRightImg" ).animate({
            bottom: "0",
            height: "400"
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

        $("#fttCharLeftTSPLOD, #fttCharRightTSPLOD, #aiLink").animate({
            opacity: "1"
        });

        $("#fttHeader, #fttWhoDoYouChoose").animate({
            opacity: "0"
        });
    }

    focusRightChar() {
        $( "#fttCharRightImg" ).animate({
            right: "140",
            bottom: "0",
            height: "600"
        });

        $( "#fttCharLeftImg" ).animate({
            bottom: "0",
            height: "400"
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

        $("#fttCharLeftTSPLOD, #fttCharRightTSPLOD, #aiLink").animate({
            opacity: "1"
        });

        $("#fttHeader, #fttWhoDoYouChoose").animate({
            opacity: "0"
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

        $( "#fttCharLeftText, #fttCharRightText" ).animate({
            opacity: "0"
        });

        $("#fttCharLeftTSPLOD, #fttCharRightTSPLOD").animate({
            opacity: "0"
        });

        $("#fttHeader").animate({
            opacity: "1"
        });

    }

    render() {
        return (
            <div id="fttContainer">
                <div id="fttAntagonists">
                    <img src="ForTheThrone/img/iron-throne.png" id="fttThrone" />
                    <div id="fttHeader" className="center">
                        <br/>
                        <h3>When you play the game of thrones you win...</h3>
                        <h1 className="center">...or you die</h1>
                        <div id="fttWhoDoYouChoose">
                            <h3>Who do you choose</h3>
                            <h1 className="center">#ForTheThrone?</h1>
                            <p>Move your mouse over a character to discover their <b>Predicted Likelihood of Death</b> in GoT: Season 8!</p>
                        </div>
                    </div>
                    <div id="fttCharLeftContainer">
                        <img src={this.state.charLeft.img} id="fttCharLeftImg" />
                        <img src="ForTheThrone/img/tombstone-question-mark.png" className="fttCharLeftTS" />
                        <img src="ForTheThrone/img/tombstone1.png" className="fttCharLeftTS" id="fttCharLeftTSPLOD"/>
                        <div id="fttCharLeftArea" onMouseEnter={this.focusLeftChar.bind(this)} onMouseLeave={this.unfocus.bind(this)}></div>
                        <div id="fttCharLeftText">
                            <h1>Will {this.state.charLeft.name} meet the God of Death?</h1>
                            <p>Curabitur turpis nibh, tempus eget sollicitudin ac, fermentum eget nunc. 
                                Phasellus malesuada tempor euismod. Curabitur volutpat.</p>

                            <i>"{this.state.charLeft.quote}"</i>
                        </div>
                    </div>
                    <div id="fttCharRightContainer">
                        <img src={this.state.charRight.img} id="fttCharRightImg" />
                        <img src="ForTheThrone/img/tombstone-question-mark.png" className="fttCharRightTS" />
                        <img src="ForTheThrone/img/tombstone2.png" className="fttCharRightTS" id="fttCharRightTSPLOD"/>
                        <div id="fttCharRightText">
                            <h2>Are {this.state.charRight.name}'s days numbered?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut turpis nunc. 
                                In mattis eros eget nibh malesuada, bibendum lobortis ex fringilla. Aenean id laoreet ex. 
                                Donec ac lobortis leo. Aliquam pretium massa interdum pulvinar feugiat. </p>
                            <i>"{this.state.charRight.quote}"</i>
                        </div>
                        <div id="fttCharRightArea" onMouseEnter={this.focusRightChar.bind(this)} onMouseLeave={this.unfocus.bind(this)}></div>
                    </div>

                    <div id="aiLink">
                        <h3 className="center" style={{"marginTop": "0px"}}>A Song of ice and data:</h3>
                        <h4 className="center">Westeros and Machine learning</h4>
                        <p>Our in-house developed machine learning algorithm predicts likelihood of death based on various 
                        features that we extracted for each of the more than 2000 characters in George R. R. Martin's 
                        <i> A Song of Ice and Fire</i> series</p>
                        <div className="center">
                            <a href="/machine-learning-algorithm-predicts-death-game-of-thrones">
                                <b>Read more about our prediction algorithm.</b>
                            </a>
                        </div>
                    </div>

                </div>
                <div id="fttCountdown">
                    <div className="center">
                        <br />
                        <h2 className="center">There is only one war that matters<br />the great war... and it is here</h2>
                        {/* <img src="ForTheThrone/img/countdown.png" /><br /><br /><br /><br /><br /><br /> */}
                        <Countdown date="April 15, 2019, 03:00:00"></Countdown>
                    </div>
                </div>
            </div>
        );
    }
}