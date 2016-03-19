import React from 'react';
let {Component} = React;

import Grid from 'react-bootstrap/lib/Grid';

import './App.css';

import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';

import Start from '../public/Start/Start.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid fluid className="main-container">
            {this.props.children || <Start />}
        </Grid>
        <Footer />
      </div>
    );
  }
}
App.propTypes = { children: React.PropTypes.object };
