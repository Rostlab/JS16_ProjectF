import React from 'react';
let {Component} = React;

import Grid from 'react-bootstrap/lib/Grid';

import './App.css';

import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import FooterCopy from './Footer/FooterCopy.jsx';

import Start from '../public/Start/Start.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="page-wrap">
        <div className="wrap">
          <Header />
          <Grid fluid className="main-container">
              {this.props.children || <Start />}
          </Grid>
        </div>
        <Footer />
        <FooterCopy />
      </div>
    );
  }
}
App.propTypes = { children: React.PropTypes.object };
