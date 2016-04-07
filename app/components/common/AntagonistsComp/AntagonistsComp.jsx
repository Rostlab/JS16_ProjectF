import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
let {Component} = React;
require.context("./img", false, /^\.\/.*\.jpg$/); /*eslint no-undef:0*/

import BigBattle from '../BigBattle/BigBattle.jsx';
import json from 'json!./antagonists.json';
import MapComp from '../MapComp/MapComp.jsx';

import Actions from '../../../actions/CharactersPlodActions';
import Store from '../../../stores/CharactersPlodStore';

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
      pair: {
        char1: {
          name: name1,
          img: img1,
          data: {}
          },
        char2:{
          name: name2,
          img: img2,
          data: {}
        },
        characters: {}
      }
    };
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    Actions.loadCharactersPlodByName([this.state.pair.char1.name,this.state.pair.char2.name]);
  }

  _onChange() {
    this.setState({
      characters: Store.getCharactersPlod()
    });
  }

  render() {
  console.log(Store.getCharactersPlod()); /*eslint no-console:0,no-undef:0*/
  // generate random title
  // const liklierDeath = "test";
  // const titles = [
  //   `${ this.state.char1.name }`
  // ];
  // const randomTitle = Math.floor(Math.random() * titles.length);
    let name1 = this.state.pair.char1.name;
    let name2 = this.state.pair.char2.name;
    let img1 = this.state.pair.char1.img;
    let img2 = this.state.pair.char2.img;
  return (
    <div>
      <Grid>
        <Row>
          <Col>
            <h1 className="text-center">Who will be the next eliminated?</h1>



            <BigBattle name1={name1} name2={name2} img1={img1} img2={img2} />
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
