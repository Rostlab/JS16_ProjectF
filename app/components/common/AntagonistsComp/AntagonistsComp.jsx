import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
let {Component} = React;
require.context("./img", false, /^\.\/.*\.jpg$/); /*eslint no-undef:0*/

import BigBattle from '../BigBattle/BigBattle.jsx';
import json from 'json!./antagonists.json';

import MapComp from '../MapComp/MapComp.jsx';

import Actions from '../../../actions/CharactersPlodActions.js';
import Store from '../../../stores/CharactersPlodStore.js';

export default class AntagonistsComp extends Component {
  constructor (props) {
    super(props);

    // generate random Characters using json
    let randompair = Math.floor(Math.random() * json.length);
    let name1 = json[randompair][0];
    let name2 = json[randompair][1];
    let img1 = '/static/images/'+json[randompair][0].replace(/ /g,'_')+'.jpg';
    let img2 = '/static/images/'+json[randompair][1].replace(/ /g,'_')+'.jpg';

    this.state = {
      char1: {
        name: name1,
        img: img1
        },
      char2:{
        name: name2,
        img: img2
      }
    };
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount (){
    Store.addChangeListener(this._onChange);
  }

  componentWillUnmount(){
    Store.removeChangeListener(this._onChange);
  }

  componentDidMount() {
    Actions.loadCharactersPlodByName([this.state.char1.name,this.state.char2.name]);
  }

  _onChange() {
    this.setState({
      characters: Store.getCharactersPlodByName()
    });
  }

  getTitle(data) {
    if(data === undefined){
      return;
    }
    let likelierDeath;
    let notLikelyDeath;
    if(data[0].plod >= data[1].plod) {
      likelierDeath = data[0];
      notLikelyDeath = data[1];
    } else {
      likelierDeath = data[1];
      notLikelyDeath = data[0];
    }
    const likelierDeathName = likelierDeath.character.replace(/\([a-zA-Z]*\)/ig, '');
    const notLikelyDeathName = notLikelyDeath.character.replace(/\([a-zA-Z]*\)/ig, '');
    const titles = [
      `${ likelierDeathName } is likelier to die than ${ notLikelyDeathName }`,
      `${ likelierDeathName } is likelier to get whacked`,
      `${ likelierDeathName } is likelier to be liquidated`,
      `${ likelierDeathName } will surely be the first to be slain`,
      `The future of ${ likelierDeathName } is blood and fire`,
      `${ likelierDeathName } will surely bite the dust`,
      `${ notLikelyDeathName } would outlive ${ likelierDeathName }`,
      `${ likelierDeathName } is likelier to get iced`,
      `${ likelierDeathName } will go to sleep with the fishes`,
      `${ likelierDeathName } got a pair of cement shoes`,
      `${ likelierDeathName } days are numbered`,
      `The future is dark and full of terrors for ${ likelierDeathName }`
    ];
    const randomTitle = Math.floor(Math.random() * titles.length);
    return titles[randomTitle];
  }

  render() {
    let name1 = this.state.char1.name;
    let name2 = this.state.char2.name;
    let img1 = this.state.char1.img;
    let img2 = this.state.char2.img;
    let plod1 = 0,plod2 = 0;
    if (this.state.characters != undefined) {
      plod1 = this.state.characters.find(function(ele) {
        return ele.character === name1;
      }).plod;
      plod2 = this.state.characters.find(function(ele) {
        return ele.character === name2;
      }).plod;
    }
    return (
      <div>
        <Grid>
          <Row>
            <Col>
              <h1 className="text-center">{this.getTitle(this.state.characters)}</h1>
              <BigBattle name1={name1} name2={name2} img1={img1} img2={img2} plod1={plod1} plod2={plod2}/>
              <br />
              <h3>{name1}'s and {name2}'s location-history on a map:</h3>
              <MapComp character={[name1, name2]}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
