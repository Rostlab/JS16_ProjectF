import React from 'react';
let {Component} = React;
// import styles from './About.css';
import Row from 'react-bootstrap/lib/Row';
import Column from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';


export default class About extends Component {
    render() {

        return (
            <div>
                <Row>
                    <h3>Frontend &amp; Design</h3>
                    <Column md={8} mdPush={2}>
                        <TeamMemberListing teamID="F"/>
                    </Column>
                </Row>
            </div>
        );
    }
}



class TeamMemberListing extends Component {
    //propTypes() { return { teamID: React.PropTypes.string.isRequired } }

    render() {
        return(
            <div>
                {
                    this.getProjectMembers(this.props.teamID).map(function (member) {
                    return <TeamMember key={member.name} data={member}/>;})
                }
            </div>
        )
    }

    getProjectMembers(projectID) {
        projectID += "!"; // so the linter isnt complaining.
        // ToDo: Think about where to store the member-data
        // OR whether it makes sense to fetch the infos from github
        return [
            {
                name: "Member1",
                imageUrl: "http://www.socialgiri.com/wp-content/uploads/2013/08/about-thumbnail-placeholder.png"
            },
            {
                name: "Member2",
                imageUrl: "http://www.socialgiri.com/wp-content/uploads/2013/08/about-thumbnail-placeholder.png"
            },
            {
                name: "Member3",
                imageUrl: "http://www.socialgiri.com/wp-content/uploads/2013/08/about-thumbnail-placeholder.png"
            },
            {
                name: "Member4",
                imageUrl: "http://www.socialgiri.com/wp-content/uploads/2013/08/about-thumbnail-placeholder.png"
            }
        ];
    }
}

class TeamMember extends Component {
    //propTypes() { return {imageUrl: React.PropTypes.element.isRequired, name: React.PropTypes.element.isRequired};}
    render() {
        return (
            <Column md={3}>
                <Thumbnail src = {this.props.data.imageUrl}>
                    <p> {this.props.data.name}</p>
                </Thumbnail>
            </Column>
        );
    }
}