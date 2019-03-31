import React from 'react';
import 'jquery';
let {Component} = React;
import './CharacterDetailsMedia.css';

export default class CharacterDetailsMedia extends Component {

    constructor(props) {
        super(props);
        this.TV_YEAR = 305;

        this.init();
    }

    init() {
        this.blocks = [];

        this.data = this.props.data;

        this.character = this.data.character;
        this.plodShow = this.data.plodShow;
        this.plodBook = this.data.plodBook;

        this.sbPlodTitle;
        this.sbPlodText;

        this.determineSbPlodDiff();
        this.determineSbAgeDiff();
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

    determineSbPlodDiff() {
        let sbGraphic = (<i className="fas fa-skull"></i>);

        let sbPlodTitle, sbPlodText, sbPlodTextFinal, sbPlodQuote = (
            <p className="quote">
                <i>"There is only one god and his name is Death, and there is only one thing we say to Death: 'Not today.'"</i>
                <span> -&nbsp;Syrio&nbsp;Forel</span>
            </p>
        );
        if (this.character.show && this.character.show.death && this.character.book && this.character.dateOfDeath) {
            sbPlodTitle = this.character.name + " has met the God of Death.";
            sbPlodTextFinal  =  <p>{this.character.name} is dead in both the TV show and the book.</p>;
            sbPlodQuote = (
                <p className="quote">
                    <i>"The other side? There is no other side. I have been to the darkness, my lady."</i>
                    <span> -&nbsp;Beric&nbsp;Dondarrion</span>
                </p>
            );
        } else if (this.character.show && this.character.show.death && !this.character.show.alive && this.character.book && !this.character.dateOfDeath) {
            sbPlodTitle = this.character.name + " is still going strong in the books.";
            sbPlodTextFinal  =  <p>{this.character.name} is still alive has a {this.plodBook}&nbsp;% predicted likelihood of death in the books, 
                whereas {this.charPronoun()}'s dead in the TV show</p>;
        } else if (this.character.show && this.character.show.alive && this.character.book && this.character.dateOfDeath) {
            sbPlodTitle = this.character.name + " is still going strong in the TV show.";
            sbPlodTextFinal  =  <p>{this.character.name} is still alive has a {this.plodShow}&nbsp;% predicted likelihood of death in the TV show, 
                whereas {this.charPronoun()}'s dead in the books</p>;
        }  else {
            if (this.plodShow < 25 && this.plodBook < 25) {
                sbGraphic = <i className="fas fa-award"></i>;
                sbPlodTitle = this.character.name + " is a survivor.";
                sbPlodText  = (<span>both of these are <b>lower than 25&nbsp;%</b>.</span>);
                sbPlodQuote = (
                    <p className="quote">
                        <i>"I'm like you, Arry. I'm a survivor."</i>
                        <span> -&nbsp;Hot&nbsp;Pie</span>
                    </p>
                );
            } else if (this.plodShow > 80 && this.plodBook > 80) {
                sbPlodTitle = "It seems that " + this.character.name + "'s days are numbered.";
                sbPlodText  = (<span>both of these are <b>higher than 80&nbsp;%</b>.</span>);
                sbPlodQuote = (
                    <p className="quote">
                        <i>"When you play a game of thrones you win or you die"</i>
                        <span> -&nbsp;Cersei&nbsp;Lannister</span>
                    </p>
                );
            } else if (this.plodShow > 60 && this.plodBook > 60) {
                sbPlodTitle = "It seems that " + this.character.name + " is likely to die either way.";
                sbPlodText  = (<span>both of these are <b>higher than 60&nbsp;%</b>.</span>);
            } else if (this.plodShow < this.plodBook - 5) {
                sbPlodTitle = "The TV show is more merciful to " + this.character.name;
                sbPlodText  = (<span>that's <b>{(this.plodBook - this.plodShow)}&nbsp;% higher</b>.</span>);
            } else if (this.plodShow > this.plodBook + 5) {
                sbPlodTitle = "The books are more merciful to " + this.character.name;
                sbPlodText  = (<span>that's <b>{(this.plodShow - this.plodBook)}&nbsp;% lower</b>.</span>);
            } else {
                sbPlodTitle = "Looks like the books and the TV show have the same fate planned for " + this.character.name;
                sbPlodText  = (<span>that's almost the same.</span>);
            }

            sbPlodTextFinal = <p>{this.character.name} has a {this.plodShow}&nbsp;% predicted likelihood of death in the TV show, whereas {this.charPronounPosessive()} likelihood of death in the books 
            is {this.plodBook}&nbsp;%, {sbPlodText}</p>;
        }
        this.blocks.push({
            title: sbPlodTitle,
            text: sbPlodTextFinal,
            quote: sbPlodQuote,
            graphic: sbGraphic
        });
    }

    determineSbAgeDiff() {
        let booksBirth, showBirth;
        if (this.character.book && this.character.book.dateOfBirth) {
            booksBirth = this.character.book.dateOfBirth;
        }

        if (this.character.show && this.character.show.birth) {
            showBirth  = this.character.show.birth;
        }

        if (!booksBirth && !showBirth) {
            return;
        }

        let sbGraphic;

        let sbPlodTitle, sbPlodText, sbPlodQuote = (
            <p className="quote">
                <i>"Nobody mind me. All I've ever done is lived to a ripe old age. "</i>
                <span> -&nbsp;Ser&nbsp;Davos&nbsp;Seaworth</span>
            </p>
        );
       
        var isDead = this.character.show && this.character.show.death && !this.character.show.alive || this.character.book && this.character.dateOfDeath;
        let isDeadTitleVerb = isDead ? 'was' : 'is';

        let booksAge = booksBirth ? (isDead && this.character.book.dateOfDeath ? this.character.book.dateOfDeath : this.TV_YEAR) - booksBirth : false;
        let showAge = showBirth ? (isDead && this.character.show.death ? this.character.show.death : this.TV_YEAR) - showBirth : false;
        let ageDiff = Math.abs(showAge - booksAge);
        
        if (!booksBirth || !showBirth) {
            sbPlodTitle = this.character.name + "'s age is mysterious";
            if (booksBirth) {
                sbPlodText  = (<span><b>{booksAge}&nbsp;years&nbsp;old</b> in the books. We don't know {this.charPronounPosessive()} age in the show</span>);
            } else {
                sbPlodText  = (<span><b>{showAge}&nbsp;years&nbsp;old</b> in the TV show. We don't know {this.charPronounPosessive()} age in the books</span>);
            }
        } else if (showBirth == booksBirth) {
            sbPlodTitle = this.character.name + " " + isDeadTitleVerb+ " the same age in both the books and the TV show";
            sbPlodText  = (<span><b>{booksAge}&nbsp;years&nbsp;old</b></span>);
        } else if (showBirth > booksBirth) {
            sbPlodTitle = this.character.name + " " + isDeadTitleVerb+ " younger in the TV show";
            sbPlodText  = (<span><b>{booksAge}&nbsp;years&nbsp;old</b> in the 
                books. {this.charPronoun(true)} is <b>{ageDiff} year{(ageDiff) > 1 ? 's' : ''} younger</b> in the show</span>);
        } else if (showBirth < booksBirth) {
            sbPlodTitle = this.character.name + " " + isDeadTitleVerb+ " older in the TV show";
            sbPlodText  = (<span><b>{showAge}&nbsp;years&nbsp;old</b> in the 
                TV show. {this.charPronoun(true)} is <b>{ageDiff} year{(ageDiff) > 1 ? 's' : ''}</b> younger in the books</span>);
        }

        if (booksBirth || showBirth) {
            let age = showAge ? showAge : booksAge;
            sbGraphic  = (<div><i className="fas fa-birthday-cake"></i>
            <h3 className="center" style={{fontSize: '1.1em', marginBottom: '0'}}>{age}</h3>
            <h4 className="center" style={{margin: '0'}}>years</h4></div>);
        }

        let dateOfDeath;
        let aliveInBooks = "";
        if (isDead) {
            let dateOfDeathBooks = (<span>{this.character.book.dateOfDeath} AC in the books</span>);
            let dateOfDeathShow = (<span>{this.character.show.death} AC in the TV show</span>);

            dateOfDeath = (this.character.show.death && this.character.book.dateOfDeath) ? (<span>{dateOfDeathBooks} and {dateOfDeathShow}</span>) 
                : (this.character.show.death ? dateOfDeathShow : dateOfDeathBooks);
            if (this.character.show.death == this.character.book.dateOfDeath) {
                dateOfDeath = (<span>{this.character.show.death} AC in both the books and the TV show</span>);
            }

            if (!this.character.book.dateOfDeath && booksAge < 50){
                aliveInBooks = (<span>{this.charPronoun(true)} is still alive in the books.</span>);
            }
        }

        let sbPlodTextFinal = (<div><p>
            {!isDead ? (<span>If we assume that the current year is {this.TV_YEAR} AC in both the books and the show, then </span>) : (<span>{this.character.name} died in {dateOfDeath}. We know that </span>)} 
            {this.charPronoun()} {isDead ? 'was' : 'is'} {sbPlodText}. {aliveInBooks}</p>
        <p>Ususally characters are <b>older in the TV show</b>, which may contribute to the different predicted values between the two sources, 
            as we use a character's age if it's available.</p></div>);
        
        this.blocks.push({
            title: sbPlodTitle,
            text: sbPlodTextFinal,
            quote: sbPlodQuote,
            graphic: sbGraphic
        });
    }

    render() {
        this.init();

        return (
            <div>
                {this.blocks.map(function(value, index) {
                    return (<div className="sbDiffBlock" key={index}>
                        {index % 2 == 0 ? <div className="sbDiffBlockGraphic">
                            {value.graphic}
                        </div> : ''}
                        <div className="sbDiffBlockText">
                            <h4 className="sbDiffTitle">{value.title}</h4>
                            <div className="sbDiffText">
                            {value.text}
                            {value.quote}</div>
                        </div>
                        {index % 2 == 1 ? <div className="sbDiffBlockGraphic">
                            {value.graphic}
                        </div> : ''}
                    </div>);
                }.bind(this))}
                
            </div>
        );
    }
}

CharacterDetailsMedia.propTypes = { data: React.PropTypes.object};
