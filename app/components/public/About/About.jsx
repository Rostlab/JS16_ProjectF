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
                            <Column md={6}>
                                <h3>Frontend &amp; Design</h3>
                                <TeamMemberListing teamID="F"/>
                            </Column>
                            <Column md={6}>
                                <h3>Data Analyisis</h3>
                                <TeamMemberListing teamID="B"/>
                            </Column>
                        </Row>
                        <Row>
                            <Column md={6}>
                                <h3>Database &amp; API</h3>
                                <TeamMemberListing teamID="A"/>
                            </Column>
                            <Column md={6}>
                                <h3>Infrastructure</h3>
                                <TeamMemberListing teamID="E"/>
                            </Column>
                        </Row>
                    </Column>
                </Row>

                <br />
                
                <Row>
                    <Column md={8} mdPush={2}>
                        <h1>Attributions</h1>
                        <ul>
                            <li>HBO</li>
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
  link: "https://github.com/sacdallago",
  team: "ABCDEF"
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
}
]
.filter(function(member){return member.team.indexOf(projectID) != -1;});
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
