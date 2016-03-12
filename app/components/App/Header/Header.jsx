import React from 'react';

import { Navbar, Nav, NavItem, DropdownButton, MenuItem} from 'react-bootstrap';

let {Component} = React;

export default class Header extends Component {
  render() {
    return (
      <Navbar className="navbar navbar-inverse navbar-fixed-top">
                <a className="navbar-brand" href="#">asdasd                                                 </a>
                <Nav className="nav navbar-nav">
                    <NavItem className="active" eventKey={1} href="#home">Home</NavItem>
                    <NavItem eventKey={2} href="#about">About</NavItem>
                    <NavItem eventKey={2} href="#about">Contact</NavItem>
                    <DropdownButton eventKey={3} title="Dropdown">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3">Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>

    );

  }
}
