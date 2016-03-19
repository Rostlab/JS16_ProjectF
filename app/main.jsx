/*eslint-env browser*/
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import './analytics.js'

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './components/app/App.jsx';
import About from './components/public/About/About.jsx';
import Ranking from './components/public/Ranking/Ranking.jsx';
import Map from './components/public/Map/Map.jsx';
import Start from './components/public/Start/Start.jsx';
import Characters from './components/public/Characters/Characters.jsx';
import CharacterList from './components/public/CharacterList/CharacterList.jsx';
import Site404 from './components/public/404/404.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Start}/>
      <Route path="/map" component={Map}/>
      <Route path="/ranking" component={Ranking}/>
      <Route path="/about" component={About}/>
      <Route path="/characters">
        <IndexRoute component={CharacterList}/>
        <Route path="/characters/:id" component={Characters}/>
      </Route>
      <Route path="*" component={Site404}/>
    </Route>
  </Router>
), document.getElementById('root'));
