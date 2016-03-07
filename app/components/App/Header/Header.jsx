import React from 'react';
let {Component} = React;
import { Link } from 'react-router';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <ul className={styles.nav}>
          <li><Link to="/">Start</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
    );
  }
}
