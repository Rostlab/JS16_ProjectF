import React from 'react';
let {Component} = React;
import styles from './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Stats />
        <Map />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <Nav />
        <div className={styles.title}>
          Statistics & Data of GOT
        </div>
      </div>
    );
  }
}

class Nav extends Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

class Stats extends Component {
  render() {
    return (
      <div className={styles.stats}>
      </div>
    );
  }
}
class Map extends Component {
  render() {
    return (
      <div className={styles.map}>
      </div>
    );
  }
}
