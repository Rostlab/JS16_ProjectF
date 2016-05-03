import React from 'react';
import 'jquery';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import "./Header.css";

let {Component} = React;

export default class Header extends Component {
    render() {
       $('.navbar-collapse.collapse.in ul li a').on('click', function(){/*eslint no-console:0,no-undef:0*/
            $(".navbar-toggle").click();/*eslint no-console:0,no-undef:0*/
        });
        return (
            <header>
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <IndexLinkContainer to={{ pathname: '/'}}>
                                <Button className="header-brand" bsStyle="link">A Song of Ice and Data</Button>
                            </IndexLinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to={{ pathname: '/characters'}}>
                                <Button bsStyle="link">Characters</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/ranking'}}>
                                <Button bsStyle="link">Ranking</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/map'}}>
                                <Button bsStyle="link">Map</Button>
                            </LinkContainer>
                            <LinkContainer to={{ pathname: '/statistics'}}>
                                <Button bsStyle="link">Statistics</Button>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}