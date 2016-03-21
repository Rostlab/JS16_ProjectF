/*eslint-disable */

import React from 'react';
let {Component} = React;
import Twitter from './twitter.js';
import './TwitterComp.css';

export default class TwitterComp extends Component {
	componentDidMount() {
		window.twttr.widgets.createTimeline(
		this.props.widgetID,
		document.getElementById('timeline-twitter'),
		{
			height: this.props.height
		}
		);
	}
	render() {
  	return (
  	   <div>
			 		<div id="timeline-twitter" className="timeline"> </div>
  	   </div>
  	);
	}
}
TwitterComp.propTypes = {
	height: React.PropTypes.number.isRequired,
	widgetID: React.PropTypes.number.isRequired};
