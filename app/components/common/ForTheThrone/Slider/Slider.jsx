import React, { Component } from 'react';
import antagonistCharacters from 'json!../antagonistCharacters.json';
import { Slide } from 'react-slideshow-image';


const properties = {
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    autoplay:false
  };


export default class Slider extends Component {
    constructor(props) {
        super(props);

        let newCharPages = this.getCharPages();

        this.state = {
            smallCharsPages:newCharPages
        };
    }

    getCharPages(){
        let smallCharsElems = [];
        let keys = Object.keys(antagonistCharacters.characters);
        let size = 4;
        for (let i = 0; i < (keys.length/size); i++) {
            let temp=[];
            for(let j=0;j<size;j++){
                if((i*size)+j<keys.length){
                    temp.push({
                        name: antagonistCharacters.characters[keys[(i*size)+j]].name,
                        key: keys[(i*size)+j]
                    });
                }
            }
            smallCharsElems.push(temp);
        }
        return smallCharsElems;
    }
    
    render() {
        return (
            <Slide {...properties}>
                {
                    this.state.smallCharsPages.map(function (elem,index) {
                        return (
                            <div className="each-slide" key={'slider-'+index}>
                                <div>{
                                elem.map(function(e,i){
                                    return (
                                        <a target="_blank" className="fttCharacter" href={"/characters/" + e.name} key={i}>
                                             <img src={"/ForTheThrone/img/" + e.key + "Small.png"} />
                                            <div>{e.name}</div>
                                        </a>
                                    );
                                })
                            }</div>
                            </div>
                        );
                    })
                }
            </Slide>
        );

        
    }

}