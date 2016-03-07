/*eslint-env browser*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './App/App.jsx';
import About from './About/About.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/about" component={About}/>
  </Router>
), document.getElementById('root'));
