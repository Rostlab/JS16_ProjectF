import React from 'react';
let {Component} = React;
import './404.css';

import { LinkContainer} from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
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
			<LinkContainer to={{ pathname: '/'}}>
                <Button>Go back to safety</Button>
            </LinkContainer>
		</div>
	</div>
	);
	}
}
