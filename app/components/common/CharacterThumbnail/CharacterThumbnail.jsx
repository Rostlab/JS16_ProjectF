import React from 'react';
let {Component} = React;
import Col from 'react-bootstrap/lib/Col';
import {Thumbnail} from 'react-bootstrap';
import "./CharacterThumbnail.css";

export default class CharacterThumbnail extends Component {
	
    render() {
		var x = (this.props.imageUrl === 
		"https://placeholdit.imgix.net/~text?txtsize=28&txt=Fallback-Image&w=300&h=350") ? this.props.imageUrl : "https://got-api.bruck.me/"+this.props.imageUrl ;
	
        return (
            <Col md={3}>
                <Thumbnail src={x} className="character-thumbnail" >
                    <p> {this.props.name}</p>
                </Thumbnail>
            </Col>
        );
    }
}

CharacterThumbnail.propTypes = { imageUrl: React.PropTypes.element, name: React.PropTypes.element.isRequired };
CharacterThumbnail.defaultProps = { imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=28&txt=Fallback-Image&w=300&h=350' };