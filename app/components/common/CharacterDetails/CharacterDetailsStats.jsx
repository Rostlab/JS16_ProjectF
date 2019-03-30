import React from 'react';
import 'jquery';
let {Component} = React;

export default class CharacterDetailsStats extends Component {
    // TODO: implement
    render() {
        
        return (
            <div className="center">
                <img src="/images/stats-placeholder.png" />
                <p>(THIS IS JUST A PLACEHOLDER GRAPH)</p>
            </div>
        );
    }
}

CharacterDetailsStats.propTypes = { data: React.PropTypes.object};
