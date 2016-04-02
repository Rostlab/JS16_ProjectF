import React from 'react';

import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
//import { browserHistory } from 'react-router';
import "./Header.css";

let {Component} = React;

export default class Header extends Component {
    render() {
        let dropdownactive = "";
        if (["/about","/contribute","/credits"].indexOf(window.location.pathname) != -1) { /*eslint no-undef:0*/
            dropdownactive = "active";
        } else {
            dropdownactive = "";
        }
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
                            <IndexLinkContainer to={{ pathname: '/'}}>
                                <Button bsStyle="link">Home</Button>
                            </IndexLinkContainer>
                            <LinkContainer to={{ pathname: '/characters'}}>
                                <Button bsStyle="link">Character</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/ranking'}}>
                                <Button bsStyle="link">Ranking</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/map'}}>
                                <Button bsStyle="link">Map</Button>
                            </LinkContainer>
                            <NavDropdown className={dropdownactive} title="About" id="basic-nav-dropdown">
                                <LinkContainer to={{ pathname: '/about'}}>
                                    <Button bsStyle="link">About us</Button>
                                </LinkContainer>
                                <LinkContainer to={{ pathname: '/credits'}}>
                                    <Button bsStyle="link">Credits</Button>
                                </LinkContainer>
                                <LinkContainer to={{ pathname: '/contribute'}}>
                                    <Button bsStyle="link">Contribute</Button>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );

    }
}