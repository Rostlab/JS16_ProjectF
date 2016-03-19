import React from 'react';
let {Component} = React;
import Col from 'react-bootstrap/lib/Col';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';

export default class CharacterThumbnail extends Component {
    render() {
        return (
            <Col md={3} xs={6} >
                <Thumbnail src={this.props.imageUrl} >
                    <p> {this.props.name}</p>
                </Thumbnail>
            </Col>
        );
    }
}

CharacterThumbnail.propTypes = { imageUrl: React.PropTypes.element, name: React.PropTypes.element.isRequired };
CharacterThumbnail.defaultProps = { imageUrl: 'https://placeholdit.imgix.net/~text?txtsize=28&txt=Fallback-Image&w=300&h=350' };