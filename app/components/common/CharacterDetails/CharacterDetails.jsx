import React from 'react';
import 'jquery';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
let {Component} = React;

export default class CharacterDetails extends Component {

    render() {
        var details = ["age","house","titles","dateOfDeath","placeOfDeath","books"];
        var detail;
        var result = [];
        var meta = "";
        for(detail of details){
            if(detail in this.props.data){
                switch (detail) {
                    case "age" : meta = "Age"; break;
                    case "house" : meta = "House"; break;
                    case "titles" : meta = "Titles"; break;
                    case "dateOfDeath" : meta = "Date of death"; break;
                    case "placeOfDeath" : meta = "Place of death"; break;
                    case "books" : meta = "Books"; break;
                    default: break;
                }
                result.push({key: meta, value: (this.props.data[detail]).toString().replace(new RegExp(',', 'g'), ', ')});
            }
        }
        return (
            <ListGroup className="character-details">
                {
                    result.map(function (detail) {
                        return <ListGroupItem><h4>{detail.key}: </h4>{detail.value}</ListGroupItem>;
                    })
                }
            </ListGroup>
        );
    }
}

CharacterDetails.propTypes = { data: React.PropTypes.object};
