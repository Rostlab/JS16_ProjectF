import React from 'react';
let {Component} = React;
import {Link} from 'react-router';
import Col from 'react-bootstrap/lib/Col';
import {Thumbnail} from 'react-bootstrap';
import "./CharacterThumbnail.css";

export default class CharacterThumbnail extends Component {

    render() {
		var img = (this.props.imageUrl ===
		"https://placeholdit.imgix.net/~text?txtsize=28&txt=Fallback-Image&w=300&h=350") ? this.props.imageUrl :process.env.__PROTOCOL__ + process.env.__API__ + this.props.imageUrl ;

		var detailLink = '/characters/'+encodeURIComponent(this.props.name);

        return (
            <Col md={3} xs={6}>
              <Link className="to-transition" to={detailLink}>
                <Thumbnail src={img} className="character-thumbnail" >
                    <p>{this.props.name}</p>
                </Thumbnail>
              </Link>
            </Col>
        );
    }
}

CharacterThumbnail.propTypes = { imageUrl: React.PropTypes.string, name: React.PropTypes.string.isRequired };
CharacterThumbnail.defaultProps = { imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=28&txt=Fallback-Image&w=300&h=350' };
