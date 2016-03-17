/*eslint-env browser*/
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import App from './components/app/App.jsx';
import About from './components/public/About/About.jsx';
import Start from './components/public/Start/Start.jsx';
import Character from './components/public/Characters/Characters.jsx';
import CharacterList from './components/public/CharacterList/CharacterList.jsx';
import Site404 from './components/public/404/404.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Start}/>
      <Route path="about" component={About}/>
      <Route path="characters" component={CharacterList}>
        <IndexRoute component={CharacterList} />
        <Route path=":charID" component={Character}/>
      </Route>
    </Route>
    <Route path="*" component={Site404}/>
  </Router>
), document.getElementById('root'));
