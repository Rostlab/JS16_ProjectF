import React from 'react';
let {Component} = React;
//import styles from './About.css';
import Row from 'react-bootstrap/lib/Row';
import Column from 'react-bootstrap/lib/Col';

import AboutText from '../../../../static/about.md';

export default class About extends Component {
    render() {
        return (
            <div className="about-container">
                <h1>About</h1>
                <Row className="about-intro">
                    <Column md={8} mdPush={2}>
                        <AboutText />
                    </Column>
                </Row>

                <br />

                <Row>
                    <Column md={8} mdPush={2}>
                        <h1>Contributors</h1>
                        <Row>
                            <Column md={2} sm={4}>
                                <h3>Frontend &amp; Design</h3>
                                <TeamMemberListing teamID="F"/>
                            </Column>
                            <Column md={2} sm={4}>
                                <h3>Map</h3>
                                <TeamMemberListing teamID="C"/>
                            </Column>
                            <Column md={2} sm={4}>
                                <h3>Database &amp; API</h3>
                                <TeamMemberListing teamID="A"/>
                            </Column>
                            <Column md={2} sm={4}>
                                <h3>Data Analysis</h3>
                                <TeamMemberListing teamID="BD"/>
                            </Column>
                            <Column md={2} sm={4}>
                                <h3>Integration</h3>
                                <TeamMemberListing teamID="E"/>
                            </Column>
                            <Column md={2} sm={4}>
                                <h3>Coordination</h3>
                                <TeamMemberListing teamID="Mentor"/>
                            </Column>
                        </Row>

                    </Column>
                </Row>

                <br />

                <Row>
                    <Column md={8} mdPush={2}>
                        <h1>Attributions</h1>
                        <table className="table table-responsive">
                            <tr>
                                <th>Source</th>
                                <th>Description</th>
                                <th>Reference</th>
                                <th>License</th>
                            </tr>

                            <tr>
                                <td>Game of Thrones wiki</td>
                                <td>Launched in 2006 by founder Jimmy Wales, Wikia Inc. is the home of Fandom and the largest entertainment fan site in the world.</td>
                                <td><a href="http://gameofthrones.wikia.com/" target="_blank">http://gameofthrones.wikia.com/</a></td>
                                <td><a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a></td>
                            </tr>

                            <tr>
                                <td>A Wiki of Ice and Fire</td>
                                <td>A Wiki of Ice and Fire is a fan-based wiki, dedicated to George R. R. Martin's created universe, covering the Novels, HBO's Game of Thrones TV series and other sources. Our goal is to build this wiki into as complete and comprehensive a guide of that universe as possible.
                                    The Wiki is part of the Westeros.org community of fans of the series, that exist since 1999.
                                </td>
                                <td><a href="http://awoiaf.westeros.org/index.php/Main_Page" target="_blank">http://awoiaf.westeros.org/index.php/Main_Page</a></td>
                                <td><a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a></td>
                            </tr>

                            <tr>
                                <td>404 image</td>
                                <td></td>
                                <td><a href="http://vignette4.wikia.nocookie.net/hieloyfuego/images/4/43/Hodor_HBO.jpg/revision/latest?cb=20130815031401" target="_blank">http://vignette4.wikia.nocookie.net/hieloyfuego/images/4/43/Hodor_HBO.jpg/revision/latest?cb=20130815031401</a></td>
                                <td><a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a></td>
                            </tr>

                            <tr>
                                <td>MediaWiki</td>
                                <td></td>
                                <td><a href="http://www.wikia.com/explore" target="_blank">http://www.wikia.com/explore</a></td>
                                <td><a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a></td>
                            </tr>

                            <tr>
                                <td>Wikipedia</td>
                                <td>Wikipedia is a multilingual, web-based, free-content encyclopedia project supported by the Wikimedia Foundation and based on a model of openly editable content. </td>
                                <td><a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank">https://en.wikipedia.org/wiki/Main_Page</a></td>
                                <td><a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a></td>
                            </tr>

                            <tr>
                                <td>Twitter</td>
                                <td>Twitter is an online-social network for short-messages.</td>
                                <td><a href="https://twitter.com">https://twitter.com</a></td>
                                <td><a href="https://twitter.com/tos?lang=en#content" target="_blank">Twitter Terms of Service</a></td>
                            </tr>

                        </table>
                    </Column>
                </Row>

                <br />

                <Row>
                    <Column md={8} mdPush={2}>
                        <h1>For Developers</h1>
                        <p>We crawled a lot of data from primarly the <a href="awoiaf.westeros.org/index.php" target="_blank">AWOIAF wiki</a> but also other sources and we'd love to share our database with you guys!
                            <br />Check out our <a href="https://got-api.bruck.me/doc/" target="_blank">API Reference here.</a></p>
                    </Column>
                </Row>

            </div>
        );
    }
}



class TeamMemberListing extends Component {
    render() {
        return(
            <div>
                {
                    this.getProjectMembers(this.props.teamID).map(function (member) {
                    return <TeamMember key={member.name} data={member}/>;})
                }
            </div>
        );
    }
    getProjectMembers(projectID) {
        return [
            {
                name: "Georgi Anastasov",
                link: "https://github.com/jorjo1",
                team: "F"
            },
            {
                name: "Max Muth",
                link: "http://www.maxi-muth.de",
                team: "F"
            },
            {
                name: "Florian Gareis",
                link: "https://www.florian-gareis.com",
                team: "E"
            },
            {
                name: "Christian Dallago",
                link: "http://dallago.us",
                team: "Mentor"
            },
            {
                name: "Kordian Bruck",
                link: "https://bruck.me",
                team: "A"
            },
            {
                name: "Julien Schmidt",
                link: "https://github.com/julienschmidt",
                team: "D"
            },
            {
                name: "Jonas Kaltenbach",
                link : "https://github.com/kajo404",
                team : "D"
            },
            {
                name: "Marcus Novotny",
                link : "https://github.com/marcusnovotny",
                team : "D"
            },
            {
                name: "Michael Legenc",
                link : "http://michael.legenc.de",
                team : "A"
            },
            {
                name : "Georg Gar",
                link : "https://github.com/Hack3l",
                team : "B"
            },
            {
                name: "Alexander Beischl",
                link: "https://github.com/AlexBeischl",
                team: "C"
            },
            {
                name: "Maximilian Bandle",
                link: "https://github.com/mbandle",
                team: "C"
            },
            {
                name: "Tobias Piffrader",
                link: "https://github.com/tPiffrader",
                team: "C"
            },
            {
                name: "Yasar Kücükkaya",
                link: "http://www.yk-code.de",
                team: "F"
            },
            {
                name: "Camille Mainz",
                link : "https://github.com/Logarythms",
                team : "D"
            },
            {
                name: "Oleksii Moroz",
                link: "https://github.com/AlexMoroz",
                team: "E"
            },
            {
                name : "Subburam Rajaram",
                link : "https://github.com/subburamr",
                team : "B"
            },
            {
                name: "Anna Sesselmann",
                link: "https://github.com/asesselmann",
                team: "B"
            },
            {
                name: "Guy Yachdav",
                link: "https://www.linkedin.com/in/gyachdav",
                team: "Mentor"
            },
            {
                name: "Santanu Mohanta",
                link: "https://github.com/santanumohanta",
                team: "D"
            },
            {
                name: "Sohel Mahmud",
                link: "https://github.com/docjag",
                team: "A"
            },
            {
                name: "Cavid Salahov",
                link: "https://github.com/CavidSalahov",
                team: "E"
            },
            {
                name: "Nicola De Socio",
                link: "https://github.com/nicoladesocio",
                team: "B"
            },
            {
                name: "Thuy Tran",
                link: "https://github.com/ThuyNganTran",
                team: "B"
            },
            {
                name: "Tatyana Goldberg",
                link: "https://rostlab.org/~goldberg/",
                team: "Mentor"
            },
            {
                name: "Jonas Ebel",
                link: "https://github.com/jonny3576",
                team: "E"
            },
            {
                name:"Dat Nguyen",
                link:"https://github.com/vanp33",
                team:"D"
            }
        ].filter((member) => {
            return member.team.split('').map((teamID) => {
                return projectID.indexOf(teamID) != -1;
            }).reduce((a, b) => {return a || b;});
        });
    }
}
TeamMemberListing.propTypes = { teamID: React.PropTypes.string };

class TeamMember extends Component {
    render() {
            if (this.props.data.link) {
                return (<p><a target="_blank" href={this.props.data.link}>{this.props.data.name}</a></p>);
            } else {
                return (<p>{this.props.data.name}</p>);
            }
    }
}
TeamMember.propTypes =  {  data: React.PropTypes.object.isRequired };
