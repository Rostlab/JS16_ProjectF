import React from 'react';
let {Component} = React;
import styles from './Greeter.css';

export default class Greeter extends Component {
  render() {
    return (
      <div>
        <h1 className={styles.main}>Hello</h1>
      </div>
    );
  }
}
