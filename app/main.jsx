/*eslint-env browser*/
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './components/app/App.jsx';
//import About from './components/public/About/About.jsx';
import Start from './components/public/Start/Start.jsx';
import Characters from './components/public/Characters/Characters.jsx';
import CharacterList from './components/public/CharacterList/CharacterList.jsx';
import Site404 from './components/public/404/404.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route name="app" path="/" component={App}>
      <IndexRoute name="start"  component={Start}/>
      <Route name="characters" path="/characters" component={CharacterList}/>
      <Route name="charDetail" path="/characters/:charID" component={Characters}/>
      <Route path="*" component={Site404}/>
    </Route>
  </Router>
), document.getElementById('root'));
