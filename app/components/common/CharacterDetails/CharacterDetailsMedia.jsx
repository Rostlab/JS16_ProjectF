import React from 'react';
let {Component} = React;
import './CharacterDetailsMedia.css';

import $ from 'jquery';

export default class CharacterDetailsMedia extends Component {

    constructor(props) {
        super(props);
        this.TV_YEAR = 305;
    }

    init() {
        this.cards = [];

        this.data = this.props.data;

        this.character = this.data.character;
        this.plodShow = this.data.plodShow;
        this.plodBook = this.data.plodBook;

        this.bookBirth = false;
        this.showBirth = false;
        this.bookDeath = false;
        this.showDeath = false;
        if (this.character.book && this.character.book.dateOfBirth) {
            this.bookBirth = this.character.book.dateOfBirth;
        }

        if (this.character.show && this.character.show.birth) {
            this.showBirth  = this.character.show.birth;
        }

        if (this.character.book && this.character.book.dateOfDeath) {
            this.bookDeath = this.character.book.dateOfDeath;
        }

        if (this.character.show && this.character.show.death) {
            this.showDeath  = this.character.show.death;
        }

        this.isDeadShow = this.character.show && !this.character.show.alive;
        this.isDeadBook = this.character.book && (this.bookDeath || this.bookBirth < 200); // limit to 200 because of missing data

        this.determineSbPlodDiff();
        this.determineSbAgeDiff();
        this.determineSbAppearance();
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
                <i>"There is only one thing we say to Death: 'Not today.'"</i>
                <span> -&nbsp;Syrio&nbsp;Forel</span>
            </p>
        );
        if ((this.character.show && this.showDeath || !this.showDeath) && this.character.book && this.bookDeath) {
            sbPlodTitle = this.charPronoun(true) + "'s met the God of Death";
            sbPlodTextFinal  =  <p>{this.character.name} is dead in both the TV show and the book.</p>;
            sbPlodQuote = (
                <p className="quote">
                    <i>"The other side? There is no other side. I have been to the darkness, my lady."</i>
                    <span> -&nbsp;Beric&nbsp;Dondarrion</span>
                </p>
            );
        } else if (this.character.show && this.showDeath && !this.character.show.alive && this.character.book && !this.bookDeath) {
            sbPlodTitle = "Still going strong in the books";
            sbPlodTextFinal  =  <p>{this.character.name} is still alive has a {this.plodBook}&nbsp;% predicted likelihood of death in the books, 
                whereas {this.charPronoun()}'s dead in the TV show</p>;
        } else if (this.character.show && this.character.show.alive && this.character.book && this.bookDeath) {
            sbPlodTitle = "Still going strong in the TV show";
            sbPlodTextFinal  =  <p>{this.character.name} is still alive has a {this.plodShow}&nbsp;% predicted likelihood of death in the TV show, 
                whereas {this.charPronoun()}'s dead in the books</p>;
        }  else {
            if (this.plodShow < 25 && this.plodBook < 25) {
                sbGraphic = <i className="fas fa-award"></i>;
                sbPlodTitle = this.charPronoun() + "'s a survivor";
                sbPlodText  = (<span>both of these are <b>lower than 25&nbsp;%</b>.</span>);
                sbPlodQuote = (
                    <p className="quote">
                        <i>"I'm like you, Arry. I'm a survivor."</i>
                        <span> -&nbsp;Hot&nbsp;Pie</span>
                    </p>
                );
            } else if (this.plodShow > 80 && this.plodBook > 80) {
                sbPlodTitle = this.charPronounPosessive(true) + " days are numbered";
                sbPlodText  = (<span>both of these are <b>higher than 80&nbsp;%</b>.</span>);
                sbPlodQuote = (
                    <p className="quote">
                        <i>"If you think this has a happy ending, you haven't been paying attention."</i>
                        <span> -&nbsp;Ramsay&nbsp;Snow</span>
                    </p>
                );
            } else if (this.plodShow > 60 && this.plodBook > 60) {
                sbPlodTitle = "Likely to die either way";
                sbPlodText  = (<span>both of these are <b>higher than 60&nbsp;%</b>.</span>);
                sbPlodQuote = (
                    <p className="quote">
                        <i>"Fear cuts deeper than swords."</i>
                        <span> -&nbsp;Syrio&nbsp;Forel</span>
                    </p>
                );
            } else if (this.plodShow < this.plodBook - 5) {
                sbPlodTitle = "The show is more merciful";
                sbPlodText  = (<span>that's <b>{(this.plodBook - this.plodShow)}&nbsp;% higher</b>.</span>);
            } else if (this.plodShow > this.plodBook + 5) {
                sbPlodTitle = "The books are more merciful";
                sbPlodText  = (<span>that's <b>{(this.plodShow - this.plodBook)}&nbsp;% lower</b>.</span>);
            } else {
                sbPlodTitle = "The same fate";
                sbPlodText  = (<span>that's almost the same.</span>);
            }

            sbPlodTextFinal = <div><p>{this.character.name} has a {this.plodShow}&nbsp;% predicted likelihood of death in the TV show, whereas {this.charPronounPosessive()} likelihood of death in the books 
            is {this.plodBook}&nbsp;%, {sbPlodText}</p>
            <p>There are many factors which can contribute to a characters predicted likelihood of death. You can read more about them in the stats or machine learning section of this page.</p>
            </div>;
        }
        this.cards.push({
            category: "Chance of death",
            title: sbPlodTitle,
            text: sbPlodTextFinal,
            quote: sbPlodQuote,
            graphic: sbGraphic,
            valueBook: 
                this.isDeadBook ? (<span className="mainValue">DEAD</span>) 
                : (<div><span className="mainValue">{this.plodBook} %</span><span className="supportingText">Chance of Death</span></div>),
            valueShow: 
                this.isDeadShow ? (<span className="mainValue">DEAD</span>) 
                : (<div><span className="mainValue">{this.plodShow} %</span><span className="supportingText">Chance of Death</span></div>),
            valueBoth: (this.isDeadShow && this.isDeadBook) ? (<span className="mainValue">DEAD</span>) : false
        });
    }

    determineSbAppearance(){
        if (Array.isArray(this.character.books) && this.character.books.length === 0 && typeof this.character.show.slug === 'undefined'){
            return;
        }

        let sbGraphic = (<i className="fas fa-book"></i>);
        let TOTAL_EPISODES = 67;
        let appearanceShow, appearanceShowPercentage, appearanceBooks = 0;

        let sbAppearTitle, sbAppearTexShow, sbAppearTextBook;
        
        let sbAppearQuote;
        
        if (Math.random() < 0.5) {
            sbAppearQuote = (
                <div>
                    <i className="quote">
                        "I read it in a book."
                    </i>
                    <span> -&nbsp;Samwell&nbsp;Tarly</span>
                </div>
            );
        } else {
            sbAppearQuote = (
                <div>
                    <i className="quote">
                        "A mind needs books as a sword needs a whetstone, if it is to keep its edge.."
                    </i>
                    <span> -&nbsp;Tyrion&nbsp;Lannister</span>
                </div>
            );
        }
        
        
        if (this.character.show && this.character.show.appearances){
            appearanceShow = this.character.show.appearances.length;
            appearanceShowPercentage = Math.round(appearanceShow / TOTAL_EPISODES * 100);
        } else {
            appearanceShowPercentage = 0;
        }

        if (this.character.books){
            for (let i = 0; i < this.character.books.length; i++){
                if (this.character.books[i][0].toLowerCase() === 'a'){
                    appearanceBooks++;
                    // console.log(this.character.books[i][0].toLowerCase() + appearanceBooks); /*eslint no-console:0,no-undef:0*/
                }
            }
        } 

        if (!appearanceShow && appearanceBooks > 0){
            sbAppearTitle = "Book character";
        } else if (appearanceShow && appearanceBooks === 0){
            sbAppearTitle = "TV character";
        } else {
            sbAppearTitle = "Book & TV character";
        }

        let sbAppearText = <div><p>{this.character.name} appears in {appearanceShow ? appearanceShow : 0} episodes. That is  <b>{appearanceShowPercentage}% of all {TOTAL_EPISODES}</b> episodes. {this.charPronoun(true)} appears in <b>{appearanceBooks} out of 5 books</b></p>
        <p>{sbAppearTexShow} {sbAppearTextBook}</p></div>;
        
        this.cards.push({
            category: "Number of appearances",
            title: sbAppearTitle,
            text: sbAppearText,
            quote: sbAppearQuote,
            graphic: sbGraphic,
            valueBook: <span className="mainValue">{appearanceBooks} / 5</span>,
            valueShow: <span className="mainValue">{appearanceShowPercentage} %</span>
        });
    }

    determineSbAgeDiff() {
        if (!this.bookBirth && !this.showBirth) {
            return;
        }

        let sbGraphic;

        let sbAgeTitle, sbAgeText, sbAgeQuote = (
            <p className="quote">
                <i>"Nobody mind me. All I've ever done is lived to a ripe old age. "</i>
                <span> -&nbsp;Ser&nbsp;Davos&nbsp;Seaworth</span>
            </p>
        );
       
        var isDead = this.isDeadShow|| this.usDeadBook;

        let booksAge = this.bookBirth && this.bookBirth > 200 ? (isDead && this.bookDeath ? this.bookDeath : this.TV_YEAR) - this.bookBirth : false;
        let showAge = this.showBirth ? (isDead && this.showDeath ? this.showDeath : this.TV_YEAR) - this.showBirth : false;
        let ageDiff = (booksAge && showAge) ? Math.abs(showAge - booksAge) : false;
        
        if (!booksAge || !showAge) {
            sbAgeTitle = this.charPronounPosessive(true) + " age is a mystery";
            if (booksAge) {
                sbAgeText  = (<span><b>{booksAge}&nbsp;years&nbsp;old</b> in the books. We don't know {this.charPronounPosessive()} age in the show</span>);
            } else {
                sbAgeText  = (<span><b>{showAge}&nbsp;years&nbsp;old</b> in the TV show. We don't know {this.charPronounPosessive()} age in the books</span>);
            }
        } else if (showAge == booksAge) {
            sbAgeTitle = "Same age in the books and TV";
            sbAgeText  = (<span><b>{booksAge}&nbsp;years&nbsp;old</b></span>);
        } else if (ageDiff !== false && showAge < booksAge) {
            sbAgeTitle = "Younger on TV";
            sbAgeText  = (<span><b>{booksAge}&nbsp;years&nbsp;old</b> in the 
                books. {this.charPronoun(true)} is <b>{ageDiff} year{(ageDiff) > 1 ? 's' : ''} younger</b> in the show</span>);
        } else if (ageDiff !== false && showAge > booksAge) {
            sbAgeTitle = "Older on TV";
            sbAgeText  = (<span><b>{showAge}&nbsp;years&nbsp;old</b> in the 
                TV show. {this.charPronoun(true)} is <b>{ageDiff} year{(ageDiff) > 1 ? 's' : ''}</b> younger in the books</span>);
        }

        if (this.bookBirth || this.showBirth) {
            sbGraphic  = (<i className="fas fa-birthday-cake"></i>);
        }

        let dateOfDeath;
        let aliveInBooks = "";
        if (isDead) {
            let dateOfDeathBooks = (<span>{this.bookDeath} AC in the books</span>);
            let dateOfDeathShow = (<span>{this.showDeath} AC in the TV show</span>);

            dateOfDeath = (this.showDeath && this.bookDeath) ? (<span>{dateOfDeathBooks} and {dateOfDeathShow}</span>) 
                : (this.showDeath ? dateOfDeathShow : dateOfDeathBooks);
            if (this.showDeath == this.bookDeath) {
                dateOfDeath = (<span>{this.showDeath} AC in both the books and the TV show</span>);
            }

            if (!this.bookDeath && booksAge < 50){
                aliveInBooks = (<span>{this.charPronoun(true)} is still alive in the books.</span>);
            }
        }

        let sbAgeTextFinal = (<div><p>
            {!isDead ? (<span>If we assume that the current year is {this.TV_YEAR} AC in both the books and the show, then </span>) : (<span>{this.character.name} died in {dateOfDeath}. We know that </span>)} 
            {this.charPronoun()} {isDead ? 'was' : 'is'} {sbAgeText}. {aliveInBooks}</p>
        <p>Ususally characters are <b>older in the TV show</b>, which may contribute to the different predicted values between the two sources, 
            as we use a character's age if it's available.</p></div>);
        
        this.cards.push({
            category: "Age",
            title: sbAgeTitle,
            text: sbAgeTextFinal,
            quote: sbAgeQuote,
            graphic: sbGraphic,
            valueBook: (<div><span className="mainValue">{booksAge ? booksAge : '?'}</span><span className="supportingText">years old</span></div>),
            valueShow: (<div><span className="mainValue">{showAge ? showAge : '?'}</span><span className="supportingText">years old</span></div>)
        });
    }

    render() {
        this.init();

        return (
            <div className="sbDiffBlocks"> 
                {this.cards.map(function(value, index) {
                    return (
                        <div className="sbDiffBlock" key={index}>
                            <div className="sbDiffBlockGraphic">
                                {value.graphic}
                            </div>
                            <div className="sbDiffBlockText">
                                <h4 className="sbDiffCardCategory">{value.category}</h4>
                                <h3 className="sbDiffTitle">{value.title}</h3>
                            </div>
                            {!value.valueBoth ? (
                                <div className="center"><div className="sbDiffValueBox center">
                                    <div className="center">{value.valueShow}</div>
                                    <span className="mediumText">TV show</span>
                                </div>
                                <div className="sbDiffValueBox center">
                                    <div className="center">{value.valueBook}</div>
                                    <span className="mediumText">Books</span>
                                </div></div>
                                )  : (
                                <div className="center"><div className="sbDiffValueBox center">
                                    <div className="center">{value.valueBoth}</div>
                                    <span className="mediumText">TV show & Books</span>
                                </div></div>
                            )}
                            <div className="sbDiffText">
                                <div className="sbDiffTextValue">{value.text}</div>
                                <blockquote>{value.quote}</blockquote>
                                <div className="chevronDown" onClick={
                                    (e) => {
                                        console.log('lol', $(e.currentTarget), $(e.currentTarget).parent().find(".sbDiffTextValue")); /*eslint no-console:0,no-undef:0*/
                                        $(e.currentTarget).parent().find(".sbDiffTextValue").slideToggle('fast');
                                        $(e.currentTarget).parent().find(".fas").toggleClass('hidden');
                                    }
                                }>
                                    <i className="fas fa-chevron-down"></i>
                                    <i className="fas fa-chevron-up hidden"></i>
                                </div>
                            </div>
                        </div>
                    );
                }.bind(this))}
                
            </div>
        );
    }
}

CharacterDetailsMedia.propTypes = { data: React.PropTypes.object};
