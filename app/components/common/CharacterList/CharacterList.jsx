
import React, {Component} from 'react';
import CharacterThumbnail from '../CharacterThumbnail/CharacterThumbnail.jsx';

import { Row, Col} from 'react-bootstrap';

import './CharacterList.css';

export default class CharacterList extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    var found = "";
    if(this.props.loaded == false) {
      found = "Loading ...";
    } else if (this.props.data.length === 0) {
      found = "Nothing found, please search something else";
    }

    return (
      <div>
        <Row>
          <Col md={10} mdOffset={1}>
            <div> {
              this.props.data.map(function (character) {
                let check = !character.dateOfDeath && character.plod;
                let plod = (check) ? ''+parseInt(character.plod)+'%': 'DEAD';
                let plodCropperSize = (check) ? parseInt(character.plod)/100 * 50 : 50;
                
                let imageUrl = character.imageLink ? character.imageLink : ((character.male || character.male == undefined) ? 'placeholder-male' : 'placeholder-female');

                return <CharacterThumbnail key={character._id} name={character.name} plod={plod} plodCropperSize={plodCropperSize} imageUrl={imageUrl}/>;
              })
            }
            </div>
            <div className="center">
              <h3>{ found }</h3>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
CharacterList.propTypes = { data: React.PropTypes.array.isRequired};
CharacterList.propTypes = { loaded: React.PropTypes.bool.isRequired};