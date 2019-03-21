import React from 'react';
let {Component} = React;

import './ForTheThrone.css';

import ironThrone from "./img/iron-throne.png";
import tyrionImg from "./img/tyrion-lannister.png";
import cerseiImg from "./img/cersei-lannister.png";
import countdownTmp from "./img/countdown.png";
import tombstone1 from "./img/tombstone1.png";
import tombstone2 from "./img/tombstone2.png";
import tombstoneQuestionMark from "./img/tombstone-question-mark.png";

import $ from 'jquery';

/* THIS IS JUST A MOCKUP */
export default class ForTheThrone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            char1: {
                id: '0',
                name: 'Tyrion Lannister',
                desc: '',
                img: tyrionImg
            },
            char2:{
                id: '1',
                name: 'Cersei Lannister',
                desc: '',
                img: cerseiImg
            }
        };
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

        $("#fttCharLeftTSPLOD, #fttCharRightTSPLOD").animate({
            opacity: "1"
        });

        $("#aiLink").animate({
            opacity: "1"
        });

        $("#fttHeader").animate({
            opacity: "0"
        });
    }

    focusRightChar() {
        $( "#fttCharRightImg" ).animate({
            right: "120",
            bottom: "0",
            height: "600"
        });

        $( "#fttCharLeftImg" ).animate({
            bottom: "0",
            height: "400"
        });

        $( "#fttThrone" ).animate({
            marginLeft: "0",
            left: "600",
            bottom: "0",
            height: "600"
        });

        $( "#fttCharRightText" ).animate({
            opacity: "1"
        });

        $("#fttCharLeftTSPLOD, #fttCharRightTSPLOD").animate({
            opacity: "1"
        });

        $("#aiLink").animate({
            opacity: "1"
        });

        $("#fttHeader").animate({
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

        $("#fttCharLeftTSPLOD, #fttCharRightTSPLOD, #fttSlogan").animate({
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
                    <img src={ironThrone} id="fttThrone" />
                    <div id="fttHeader" className="center">
                        <br/>
                        <h3>When you play the game of thrones you win...</h3>
                        <h1 className="center">...or you die</h1>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                        <div id="fttSlogan">
                            <h3>Who do you choose</h3>
                            <h1 className="center">#ForTheThrone?</h1>
                        </div>
                    </div>
                    <div id="fttCharLeftContainer">
                        <img src={this.state.char1.img} id="fttCharLeftImg" />
                        <img src={tombstoneQuestionMark} className="fttCharLeftTS" />
                        <img src={tombstone1} className="fttCharLeftTS" id="fttCharLeftTSPLOD"/>
                        <div id="fttCharLeftArea" onMouseEnter={this.focusLeftChar.bind(this)} onMouseLeave={this.unfocus.bind(this)}></div>
                        <div id="fttCharLeftText">
                            <h1>Is Tyrion Lannister guilty of being a dwarf?</h1>
                            <p>Curabitur turpis nibh, tempus eget sollicitudin ac, fermentum eget nunc. 
                                Phasellus malesuada tempor euismod. Curabitur volutpat. </p>

                            <i>"Tyrion Lannister is one of the few people alive who can make this country a better place. 
                                He has the mind for it, he has the will and he has the right last name."</i>
                        </div>
                    </div>
                    <div id="fttCharRightContainer">
                        <img src={this.state.char2.img} id="fttCharRightImg" />
                        <img src={tombstoneQuestionMark} className="fttCharRightTS" />
                        <img src={tombstone2} className="fttCharRightTS" id="fttCharRightTSPLOD"/>
                        <div id="fttCharRightText">
                            <h2>Will Cersei Lannister die at the hands of the Valonqar?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut turpis nunc. 
                                In mattis eros eget nibh malesuada, bibendum lobortis ex fringilla. Aenean id laoreet ex. 
                                Donec ac lobortis leo. Aliquam pretium massa interdum pulvinar feugiat. </p>
                            <i>"Power is power."</i>
                        </div>
                        <div id="fttCharRightArea" onMouseEnter={this.focusRightChar.bind(this)} onMouseLeave={this.unfocus.bind(this)}></div>
                    </div>

                    <div id="aiLink">
                    <h3 style={{"marginTop": "0px"}}>A Song of ice and data:<br />got and Machine learning</h3>
                    Our in-house developed machine learning algorithm predicts likelihood of death based on various 
                    features that we extracted for each character.
                    <br /><br /><div className="center" style={{"fontSize": "17px"}}><b>
<a href="/machine-learning-algorithm-predicts-death-game-of-thrones">Click here to read more about our prediction algorithm.</a></b></div> </div>

                </div>
                <div id="fttCountdown">
                    <div className="center">
                        <br />
                        <h2 className="center">There is only one war that matters<br />the great war... and it is here</h2>
                        <img src={countdownTmp} /><br /><br /><br /><br /><br /><br />
                    </div>
                </div>
            </div>
        );
    }
}