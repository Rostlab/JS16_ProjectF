import React from 'react';
import 'jquery';
import {ListGroup, ListGroupItem} from 'react-bootstrap';
let {Component} = React;

export default class CharacterDetails extends Component {

    render() {
        var details = ["age","titles","house","culture","spouse","mother","father","dateOfDeath","placeOfDeath","books","actor"];
        var detail;
        var result = [];
        var meta = "";
        for(detail of details){
            if(detail in this.props.data && this.props.data[detail].length > 1){
                switch (detail) {
                    case "age" : meta = "Age"; break;
                    case "titles" : meta = "Titles"; break;
                    case "house" : meta = "House"; break;
                    case "culture" : meta = "Culture"; break;
                    case "spouse" : meta = "Spouse"; break;
                    case "mother" : meta = "Mother"; break;
                    case "father" : meta = "Father"; break;
                    case "dateOfDeath" : meta = "Date of death"; break;
                    case "placeOfDeath" : meta = "Place of death"; break;
                    case "books" : meta = "Books"; break;
                    case "actor" : meta = "Actor"; break;
                    default: break;
                }
                result.push({key: meta, value: (this.props.data[detail]).toString().replace(new RegExp(',', 'g'), ', ').replace(new RegExp('&apos;', 'g'), '\'')});
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
