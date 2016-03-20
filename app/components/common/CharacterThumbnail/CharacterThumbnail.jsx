import React from 'react';
let {Component} = React;
import Col from 'react-bootstrap/lib/Col';
import {Thumbnail} from 'react-bootstrap';
import "./CharacterThumbnail.css";

export default class CharacterThumbnail extends Component {
	
    render() {
		var img = (this.props.imageUrl === 
		"https://placeholdit.imgix.net/~text?txtsize=28&txt=Fallback-Image&w=300&h=350") ? this.props.imageUrl : "https://got-api.bruck.me/"+this.props.imageUrl ;
		
		var detailLink = '/characters/'+this.props.id;

        return (
            <Col md={3} xs={6}>
              <a href={detailLink} className="to-transition">
                <Thumbnail src={img} className="character-thumbnail" >
                    <p>{this.props.name}</p>
                </Thumbnail>
              </a>
            </Col>
        );
    }
}

CharacterThumbnail.propTypes = { id: React.PropTypes.element.isRequired, imageUrl: React.PropTypes.element, name: React.PropTypes.element.isRequired };
CharacterThumbnail.defaultProps = { imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=28&txt=Fallback-Image&w=300&h=350' };