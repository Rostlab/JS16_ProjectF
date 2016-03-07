/*eslint-env browser*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App/App.jsx';
import About from './components/public/About/About.jsx';
import Start from './components/public/Start/Start.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/" component={Start}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
), document.getElementById('root'));
