import React from 'react';
let {Component} = React;
//import styles from './About.css';
import { Row, Col } from 'react-bootstrap';
import './About.css';
import AboutText from '../../../../config/markdown/about.md';
import group from './group.jpg';

export default class About extends Component {
    render() {
        return (
            <div className="about-container">

                <Row> 
                    <h1 className="about-title">Our Team</h1>     
                    <Col sm={10} smOffset={1} md={5}>
                        <img src={group} className="group-photo" />
                    </Col>
                    <Col sm={10} smOffset={1} md={5} mdOffset={0}>
                        <div className="about-description" dangerouslySetInnerHTML={{ __html: AboutText}} />
                    </Col>
                    <Col md={8} mdPush={2}>
                        <h1 className="about-title">Contributors</h1>
                        <Row>
                            <Col xs={10} xsOffset={1} sm={5}>
                                <h3>Mentors</h3>
                                <TeamMemberListing teamID="Mentor"/>
                                <h3>Database &amp; API</h3>
                                <TeamMemberListing teamID="A"/>
                                <h3>Data Analysis</h3>
                                <TeamMemberListing teamID="BD"/>
                            </Col>
                            <Col xs={10} xsOffset={1} sm={5}>
                                <h3>Frontend &amp; Design</h3>
                                <TeamMemberListing teamID="F"/>
                                <h3>Map</h3>
                                <TeamMemberListing teamID="C"/>
                                <h3>Integration</h3>
                                <TeamMemberListing teamID="E"/>
                                <h3>Support</h3>
                                <TeamMemberListing teamID="S"/>
                                <h3>Media Contact</h3>
                                <TeamMemberListing teamID="T"/>
                            </Col>
                                                     
                            
                        </Row>

                    </Col>
                </Row>

                <br />

                <Row>
                    <Col md={8} mdPush={2}>
                        <h1 className="about-title">Attributions</h1>
                        <p className="about-description">Most of our data was - and is periodically- scraped from <a href="http://awoiaf.westeros.org" target="_blank">A Wiki of Ice and Fire</a>. Contributing to this wiki will enhance this portal greatly, so make sure you drop a visit to our wiki-partners and request an account.</p>
                        <p className="about-description">We used the sources and licenses listed on <a href="/attributions">this page</a>.</p>
                    </Col>
                </Row>

                <br />

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
                link: "https://www.linkedin.com/in/georgi-anastasov-65124b11a",
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
                img:  "http://gravatar.com/avatar/9c8cef19ae44af5e2ed64addfe701a77",
                team: "E"
            },
            {
                name: "Guy Yachdav",
                link: "https://www.linkedin.com/in/gyachdav",
                team: "Mentor"
            },
            {
                name: "Christian Dallago",
                link: "http://dallago.us",
                img:  "https://c2.staticflickr.com/2/1481/25418571675_2dbacb53a7_q.jpg",
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
                link: "https://de.linkedin.com/in/yasar-kücükkaya-9718bb107",
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
                team: "B"},
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
                name: "Dmitrii Nechaev",
                link: "https://github.com/dmitry-n",
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
            },
            {
                name: "Togi Dashnyam",
                link: "https://github.com/togiberlin",
                team: "A"
            },
            {
                name: "Theodor Cheslerean Boghiu",
                link: "https://de.linkedin.com/in/theodor-cheslerean-boghiu-234511102",
                team: "A"
            },
            {
                name: "Mina Zaki",
                link: "https://github.com/mina-zaki",
                team: "F"
            },
            {
                name: "Boris Idesman",
                link: "https://github.com/boriside",
                team: "A"
            },
            {
                name: "Boris Idesman",
                link: "https://github.com/boriside",
                team: "A"
            },
            {
                name: "Konstantinos Angelopoulos",
                link: "https://github.com/konstantinos-angelo",
                team: "B"
            },
            {
                name: "Emiliyana Kalinova",
                link: "https://github.com/Emiliyana",
                team: "E"
            },
            {
                name: "Burkhard Rost",
                link: "https://rost.org",
                team: "S"
            },
            {
                name: "Tim Karl",
                link: "https://www.rostlab.org/group/people/lab-members",
                team: "S"
            },
            {
                name: "Lothar Richter",
                link: "https://www.rostlab.org/group/people/lab-members",
                team: "S"
            },
            {
                name: "Emiliyana Kalinova",
                link: "https://github.com/Emiliyana",
                team: "E"
            },
            {
                name: "Ange Laure Temzeung Kouemo",
                link: "https://github.com/AngeKouemo",
                team: "E"
            },
            {
                name: "Andreas Battenberg",
                link: "",
                team: "T"
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
