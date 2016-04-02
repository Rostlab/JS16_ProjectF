import React from 'react';
let {Component} = React;
import { Row, Col } from 'react-bootstrap';

import PlodDescriptionText from '../../../../static/plod-description.md';

export default class PlodDescription extends Component {
    render() {
        return (
            <div>
                <br/>
                <Row>
                    <Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
                        <PlodDescriptionText />
                    </Col>
                </Row>
            </div>
        );
    }
}
