import React from 'react';
let {Component} = React;
import { Row, Col } from 'react-bootstrap';

export default class Imprint extends Component {
	render() {
	return (
		<Row>
			<Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
        		<h1>Imprint</h1>
				<h3>Address</h3>
				<p>TUM Fakultät für Informatik</p>
				<p>Boltzmannstraße 3</p>
				<p>85748 Garching</p>

				<h3>Disclaimer</h3>
				<p>
					Our site contains links to external websites, over which we have no control. Therefore we can not accept any responsibility for their content.The provider or operator is always responsible for the content of linked pages. The linked sites were checked at the time of linking for possible legal violations. Illegal contents were at the time of linking. A permanent control of the linked pages is unreasonable without concrete evidence of a violation. Upon notification of violations, we will immediately remove such links.
				</p>

            </Col>
		</Row>
	);
	}
}
