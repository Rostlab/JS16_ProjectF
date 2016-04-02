import React from 'react';

import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
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
                            <IndexLinkContainer to={{ pathname: '/'}}>
                                <Button bsStyle="link">A Song of Ice and Data</Button>
                            </IndexLinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to={{ pathname: '/characters'}}>
                                <Button bsStyle="link">Characters</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/statistics'}}>
                                <Button bsStyle="link">Statistics</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/ranking'}}>
                                <Button bsStyle="link">Ranking</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/map'}}>
                                <Button bsStyle="link">Map</Button>
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