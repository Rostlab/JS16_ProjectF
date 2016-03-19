import React from 'react';
let {Component} = React;
import styles from './Stats.css';
import Store from '../../../stores/LandingPageStore';
import Actions from '../../../actions/LandingPageActions';

export default class Stats extends Component {

  constructor (props) {
    super(props);
    this.state = {characters: Store.getPlodCharacters()};
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount (){
    Store.addChangeListener(this._onChange);
  }

  componentDidMount(){
    Actions.loadPlodCharacters(3);
  }

  componentWillUnmount(){
    Store.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      characters: Store.getPlodCharacters()
    });
  }

  render() {
    return (
      <div className={styles.stats}>
        {this.state.characters.map(function(character){
          return <p>{character.name}</p>;
        })}
      </div>
    );
  }
}
