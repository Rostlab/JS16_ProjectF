import React from 'react';
let {Component} = React;
//import styles from './About.css';
import Row from 'react-bootstrap/lib/Row';
import Column from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';


export default class About extends Component {
    render() {
        return (
            <div className="about-container">
                <Row className="about-intro">
                    <Column md={8} mdPush={2}>
                        <p>This webapp ist the result of a JavaScript Course at the Technical University Munich.</p>
                    </Column>
                </Row>
                <Row>
                    <Column md={8} mdPush={2}>
                        <h1>Contributors</h1>
                        <h3>Frontend &amp; Design</h3>
                        <TeamMemberListing teamID="F"/>
                    </Column>
                </Row>
                <Row>
                    <Column md={8} mdPush={2}>
                        <h1>Attributions</h1>
                        <ul>
                            <li>HBO</li>
                        </ul>
                    </Column>
                </Row>
                <Row>
                    <Column md={8} mdPush={2}>
                        <h1>Imprint</h1>
                        <p>Don't sue us!</p>
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
        projectID += "!"; // so the linter isnt complaining.
        // ToDo: Think about where to store the member-data
        // OR whether it makes sense to fetch the infos from github
        return [
            {
                name: "Member1",
                imageUrl: "http://www.socialgiri.com/wp-content/uploads/2013/08/about-thumbnail-placeholder.png",
                twitter: "twitter.com",
                github: "github.com"
            },
            {
                name: "Member2",
                imageUrl: "http://www.socialgiri.com/wp-content/uploads/2013/08/about-thumbnail-placeholder.png",
                twitter: "twitter.com",
                github: "github.com"
            },
            {
                name: "Member3",
                imageUrl: "http://www.socialgiri.com/wp-content/uploads/2013/08/about-thumbnail-placeholder.png",
                twitter: "twitter.com",
                github: "github.com"
            },
            {
                name: "Member4",
                imageUrl: "http://www.socialgiri.com/wp-content/uploads/2013/08/about-thumbnail-placeholder.png",
                twitter: "twitter.com",
                github: "github.com"
            }
        ];
    }
}
TeamMemberListing.propTypes = { teamID: React.PropTypes.string };

class TeamMember extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        return (
            <Column md={3}>
                <Thumbnail src = {this.props.data.imageUrl}>
                    <p> {this.props.data.name}</p>
                    <p> {this.props.data.twitter}</p>
                    <p> {this.props.data.github}</p>
                </Thumbnail>
            </Column>
        );
    }
}
TeamMember.propTypes =  {  data: React.PropTypes.object.isRequired };
