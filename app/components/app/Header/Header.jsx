import React from 'react';
import 'jquery';
import { Navbar, Nav, Button, Grid, Row, Col} from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer} from 'react-router-bootstrap';
import "./Header.css";
import TUMLogoWritten from "./tum-word-mark.svg";
import TUMLogo from "./tum-logo.svg";

let {Component} = React;

export default class Header extends Component {
    closeCampaign() {
      $(".campaign").hide();
    }
    render() {
       $('.navbar-collapse.collapse.in ul li a').on('click', function(){/*eslint no-console:0,no-undef:0*/
            $(".navbar-toggle").click();/*eslint no-console:0,no-undef:0*/
        });
        return (
            <header>
                <div className="navbar-tum-top">
                  <Grid>
                    <Row>
                      <Col>
                          <img className="TUMLogoWritten" src={TUMLogoWritten} />
                          <img className="TUMLogo" src={TUMLogo} />
                      </Col>
                    </Row>
                  </Grid>
                </div>
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
                    <Row>
                        <Col className="campaign">
                        <Grid>
                            <Row>
                            <Col md={6} mdOffset={2}>
                            Help us get to the Morpheus Cup and win in Luxembourg!
                            </Col>
                              <Col>
                                <a href="https://www.gofundme.com/2wjvf5q4"><Button className="campaign-button">Check out our campaign</Button></a>
                                <span onClick={this.closeCampaign} className="glyphicon glyphicon-remove-circle campaign-close" aria-hidden="true"></span>
                              </Col>
                            </Row>
                            </Grid>
                        </Col>
                    </Row>
            </header>
        );
    }
}