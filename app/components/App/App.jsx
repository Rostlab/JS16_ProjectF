import React from 'react';
let {Component} = React;
import './App.css';
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';

import Start from '../public/Start/Start.jsx';
// import 'bootstrap/dist/css/bootstrap.css';
export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
          {this.props.children || <Start />}
        <Footer />
      </div>
    );
  }
}
App.propTypes = { children: React.PropTypes.object };
