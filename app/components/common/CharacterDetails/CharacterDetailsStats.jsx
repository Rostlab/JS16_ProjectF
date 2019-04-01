import React from 'react';
import 'jquery';
let {Component} = React;

import './CharacterDetailsStats.css';

export default class CharacterDetailsStats extends Component {
    constructor(props) {
        super(props);

        this.stats = {
            nobles: {
                total: 897,
                dead: 145 // estimated
            },
            peasants: {
                total: 1052,
                dead: 350 // estimated
            },
            male: {
                total: 1205,
                dead: 366
            },
            female: {
                total: 741,
                dead: 129
            },
            attributes: [
                "Braavos",
                "Crakehall",
                "Darry",
                "Dragonstone",
                "Harrenhal",
                "House Frey",
                "House Lannister",
                "House Martell",
                "House Stark",
                "House Targaryen",
                "King's Landing",
                "Lys",
                "Myr",
                "Northmen",
                "Pentos",
                "Riverrun",
                "Tower",
                "Valyria",
                "Winterfell",
                "male",
                "numSpouses",
                "numTitles"
              ],
              meanBetaExp: [
                0.4885454491460676,
                0.9349088677278595,
                1.4557318003880368,
                0.7780924825579874,
                1.236994349882415,
                0.5075020629546677,
                1.439100284498204,
                1.2962999150492085,
                2.3638645671040406,
                2.1054683855321086,
                1.3225480960560165,
                0.7991570202609043,
                0.8480143611746367,
                0.5309296766739399,
                1.2171980429529305,
                0.6824910889408173,
                0.8906618926897701,
                1.4874654391789197,
                1.4837289478434277,
                1.0806374640584027,
                1.1683200417946134,
                0.749394940852674
            ]
        };
    }

    init() {
        this.cards = [];

        this.character = this.props.data.character;
    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    createCards() {
        if (this.character.book && this.character.book.culture) {
            let culture = this.character.book.culture;
            let index = this.stats.attributes.indexOf(culture);
            
            if (index > -1) {
                let change = this.stats.meanBetaExp[index];
                this.cards.push({
                    title: culture,
                    type: "Culture",
                    text: <span>Characters with this culture have a proportionally <b>{change > 1 ? 'higher' : 'lower'}</b>  predicted likelihood of death.</span>,
                    value: culture,
                    proportionalChange: (100 * change - 100).toFixed(2)
                });
            }
        }

        if (this.character.book && this.character.book.house) {
            let house = this.character.book.house;
            let index = this.stats.attributes.indexOf(house);
            
            if (index > -1) {
                let change = this.stats.meanBetaExp[index];
                this.cards.push({
                    title: house,
                    type: "House",
                    text: <span>Characters with this house have a proportionally <b>{change > 1 ? 'higher' : 'lower'}</b>  predicted likelihood of death.</span>,
                    value: house,
                    proportionalChange: (100 * change - 100).toFixed(2)
                });
            }
        }
        
        if (this.character.show && this.character.show.origin) {
            let origin = this.character.show.origin;
            let index = this.stats.attributes.indexOf(origin);
            
            if (index > -1) {
                let change = this.stats.meanBetaExp[index];
                this.cards.push({
                    title: origin,
                    type: "Place of birth",
                    text: <span>Characters with this place of birth have a proportionally <b>{change > 1 ? 'higher' : 'lower'}</b>  predicted likelihood of death.</span>,
                    value: origin,
                    proportionalChange: (100 * change - 100).toFixed(2)
                });
            }
        }

        if(this.character.book && this.character.book.spouse){
            let spouses = this.character.book.spouse;
            let index = this.stats.attributes.indexOf("numSpouses");
            let value = this.stats.meanBetaExp[index];
            if (!Array.isArray(spouses)){
                spouses = [spouses];
            }
            let numSpouses = spouses.length;
            let change = value;
            for (let i = 1; i < numSpouses; i++){
                change *= value;
            }

            this.cards.push({
                title: this.charPronoun(true) + " has " +  numSpouses + (numSpouses === 1 ? " spouse" : " spouses"),
                type: "Number of Spouses",
                text: "Having " + numSpouses + " " + (numSpouses === 1 ? "spouse" : "spouses") + " proportionally " + (change > 1 ? 'increases' : 'decreases') + " the predicted likelihood of death.",
                value: numSpouses,
                proportionalChange: (100 * change - 100).toPrecision(2)
            });
        }

        if (this.character.book && this.character.book.title){
            let titles = this.character.book.titles;
            let index = this.stats.attributes.indexOf("numTitles");
            let value = this.stats.meanBetaExp[index];
            let numTitles = titles.length;
            let change = value;
            for (let i = 0; i < numTitles; i++){
                change *= value;
            }

            this.cards.push({
                title: this.charPronoun(true) + " has " + numTitles + (numTitles === 1 ? " title" : " titles"),
                type: "Number of Titles",
                text: "Having " + numTitles + " " + (numTitles === 1 ? "title" : "titles") + " proportionally " + (change > 1 ? 'increases' : 'decreases') + " the predicted likelihood of death.",
                value: numTitles,
                proportionalChange: (100 * change - 100).toPrecision(2)
            });
        }
        this.shuffle(this.cards);
        this.cards = this.cards.slice(0, 3);
    }

    charPronoun(capitalize = false) {
        if (capitalize) {
            return this.character.male ? 'He' : 'She';
        } else {
            return this.character.male ? 'he' : 'she';
        }
    }

    charPronounPosessive(capitalize = false) {
        if (capitalize) {
            return this.character.male ? 'His' : 'Her';
        } else {
            return this.character.male ? 'his' : 'her';
        }
    }

    renderSimpleBarChart(top, topTotal, topDesc, bottom, bottomTotal, bottomDesc, title, description) {
        return (
            <div className="simpleBarChart">
                <h4>{title}</h4>
                <div>{description}</div>
                <div className="simpleBarChartBars">
                    <div className="barTop bar">
                        <div className="barFill" style={{width: Math.round(100 * top/topTotal) + "%"}}>
                            {Math.round(100 * top/topTotal) + "%"}
                            <div className="barAnnotation">{topDesc}</div>
                        </div>
                    </div>
                    <div className="barBottom bar">
                        <div className="barFill" style={{width: Math.round(100 * bottom/bottomTotal) + "%"}}>
                            {Math.round(100 * bottom/bottomTotal) + "%"}
                            <div className="barAnnotation">{bottomDesc}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        this.init();
        this.createCards();

        if (!this.character || !this.character.show) {
            return (<div></div>);
        }

        return (
            <div className="center">
                {this.renderSimpleBarChart(
                    this.stats.nobles.dead,
                    this.stats.nobles.total,
                    "Nobles",
                    this.stats.peasants.dead,
                    this.stats.peasants.total,
                    "Peasants",
                    this.character.show.titles.length == 0 ? this.character.name + " is a peasant" : this.character.name + " is a noble",
                    (<span><p>{this.character.show.titles.length == 0 ? "Being a peasant is dangerous in the world of Westeros" : "Being a noble is safer in the world of Westeros"}.</p>
                    <p>See the following graph for the <b>percentage of dead peasant and noble</b> characters</p></span>)
                )}

                {this.renderSimpleBarChart(
                    this.stats.female.dead,
                    this.stats.female.total,
                    "Men",
                    this.stats.male.dead,
                    this.stats.male.total,
                    "Women",
                    this.character.show.gender == 'male' ? this.charPronoun(true) + " is male" : this.charPronoun(true) + " is female",
                    (<span><p>{this.character.show.gender == 'male' ? "Being male is dangerous in the world of Westeros" : "Being female is safer in the world of Westeros"}.</p> 
                    <p>See the following graph for the <b>percentage of dead male and female</b> characters</p></span>)
                )}

                <div className="cardContainer">
                {this.cards.map(function(card, index) {
                    return (
                        <div className="statsCard" key={index}>
                            <span className="subtitle">{card.type}</span>
                            <h4>{card.title}</h4>
                            <p className="description">{card.text}</p>
                            <div className="proportion">
                                <p>proportionally around</p>
                                <h3>
                                    {card.proportionalChange > 0 ? 
                                        <i className="fas fa-arrow-circle-up" style={{color:"#c9180c"}}></i>
                                        : <i className="fas fa-arrow-circle-down" style={{color:"#0cc90c"}}></i> }
                                    &nbsp;{Math.abs(card.proportionalChange)} %
                                </h3>
                                <span><h4 className="center">{card.proportionalChange > 0 ? 'higher' : 'lower'}</h4> Predicted Likelihood of Death on&nbsp;average.</span>
                            </div>
                        </div>
                    );
                }.bind(this))}
                </div>

                <div className="center">
                    <blockquote className="lowerQuote">
                        <i>"Never forget what you are, the rest of the world will not. 
                            Wear it like armor and it can never be used to hurt you."</i>
                        <span> -&nbsp;Tyrion&nbsp;Lannister</span>
                    </blockquote>
                </div>
            </div>
        );
    }
}

CharacterDetailsStats.propTypes = { data: React.PropTypes.object};
