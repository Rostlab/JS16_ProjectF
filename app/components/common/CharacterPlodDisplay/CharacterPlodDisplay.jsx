import React from 'react';
let {Component} = React;

import './CharacterPlodDisplay.css';

export default class CharacterPlodDisplay extends Component {

    render() {
        return (
            <div className="plodByYearContainer">{
                this.props.plodByYear.map(function(value, i) {
                    //let roundedPercentage = (value * 100).toFixed(2);

                    return (
                        <div className="plodYear plodYearBg" key={i}>
                            <div className="plodYear plodYearFg" style={{height: Math.round(value * 100)+"%"}}></div>
                            <div className="plodYear plodYearAC">{(300 + i) % 5 == 0 ? (300 + i) : ''}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

CharacterPlodDisplay.propTypes = { plodByYear: React.PropTypes.array};
