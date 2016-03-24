import React from 'react';
let {Component} = React;
//import styles from './About.css';
import Row from 'react-bootstrap/lib/Row';
import Column from 'react-bootstrap/lib/Col';


export default class About extends Component {
    render() {
        return (
            <div className="about-container">
                <h1>About</h1>
                <Row className="about-intro">
                    <Column md={8} mdPush={2}>
                        <p>This webapp ist the result of a JavaScript Course at the Technical University Munich.</p>
                        <br />
                        <p>We wanted to tell some of the Game of Thrones’ stories using data that we acquire on the web. Many fans of the Ice and Fire books and of the HBO show have amassed a lot of data about the plot, the characters, the great houses of westeros, the history and culture of the world of Ice and Fire, and in general anything you can think about this cultural phenomenon. </p>
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
                        <ul>
                            <li><a href="http://www.wikia.com/explore" target="_blank">MediaWiki</a></li>
                            <li><a href="http://awoiaf.westeros.org/index.php/Main_Page" target="_blank">Westeros Wiki</a></li>
                            <li><a href="http://vignette4.wikia.nocookie.net/hieloyfuego/images/4/43/Hodor_HBO.jpg/revision/latest?cb=20130815031401" target="_blank">404 imges</a></li>
                        </ul>
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
