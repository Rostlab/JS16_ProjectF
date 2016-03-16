import React from 'react';

import { Navbar, Nav, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';

import "./Header.css";

let {Component} = React;

export default class Header extends Component {
    render() {
        return (
            <header>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">GOT-Stats</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <IndexLinkContainer to={{ pathname: '/'}}>
                                <Button bsStyle="link">Home</Button>
                            </IndexLinkContainer>
                            <LinkContainer to={{ pathname: '/character'}}>
                                <Button bsStyle="link">Character</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/about'}}>
                                <Button bsStyle="link">About</Button>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );

    }
}
