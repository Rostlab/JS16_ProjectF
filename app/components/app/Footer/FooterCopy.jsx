import React from 'react';
let {Component} = React;
import './Footer.css';
import Row from 'react-bootstrap/lib/Row';
import Column from 'react-bootstrap/lib/Col';

export default class FooterCopy extends Component {
    render() {
        return (
            <div className="footer-copy">

                <div className="container">
                    <Row>
                        <Column md={12}>
                            <p className="text-center">
                                &copy; 2016 Song of Ice and Data - <span className="build-version"></span>
                            </p>
                        </Column>
                    </Row>
                </div>

            </div>
        );
    }
}