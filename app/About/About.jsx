import React from 'react';
let {Component} = React;
import styles from './About.css';

export default class About extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.main}>About</h1>
      </div>
    );
  }
}
