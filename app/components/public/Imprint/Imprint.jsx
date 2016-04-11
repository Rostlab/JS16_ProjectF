import React from 'react';
let {Component} = React;
import { Row, Col } from 'react-bootstrap';

import ImprintText from '../../../../config/markdown/imprint.md';

export default class Imprint extends Component {
	render() {
	return (
		<Row>
			<Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
        		<div dangerouslySetInnerHTML={{ __html: ImprintText}} />

            </Col>
		</Row>
	);
	}
}
