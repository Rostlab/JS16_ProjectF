import React from 'react';
let {Component} = React;
import styles from './Start.css';
import Stats from '../../common/Stats/Stats.jsx';

export default class Start extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        Start
        <Stats/>
      </div>
    );
  }
}
