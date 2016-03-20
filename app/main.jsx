/*eslint-env browser*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';


import App from './components/app/App.jsx';
import About from './components/public/About/About.jsx';
import Ranking from './components/public/Ranking/Ranking.jsx';
import Map from './components/public/Map/Map.jsx';
import Start from './components/public/Start/Start.jsx';
import Characters from './components/public/Characters/Characters.jsx';
import CharacterListPage from './components/public/CharacterList/CharacterList.jsx';
import Site404 from './components/public/404/404.jsx';

import ga from 'ga-react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
const history = createBrowserHistory();

// Listen for changes to the current location. The
// listener is called once immediately.
const unlisten = history.listen(location => {
  ga('send', location);
});

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Start}/>
      <Route path="/map" component={Map}/>
      <Route path="/ranking" component={Ranking}/>
      <Route path="/about" component={About}/>
      <Route path="/characters">
        <IndexRoute component={CharacterListPage}/>
        <Route path="/characters/:id" component={Characters}/>
      </Route>
      <Route path="*" component={Site404}/>
    </Route>
  </Router>
, document.getElementById('root'));

unlisten();
