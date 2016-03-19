import React from 'react';
let {Component} = React;
import './404.css';

export default class Site404 extends Component {
  render() {
    return (
      <div className="notfound">
    	<div className="cloud"></div>
    	<div className="cloud2"></div>
    	<div className="hodor"></div>
    	<div className="message">
	        <h1>404</h1>
	        <h2>Page could not be found..</h2>
	        <h4>..neither could Hodor.</h4>
	    </div>
      </div>
    );
  }
}
