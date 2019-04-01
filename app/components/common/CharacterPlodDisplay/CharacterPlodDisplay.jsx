import React from 'react';
let {Component} = React;

import './CharacterPlodDisplay.css';

export default class CharacterPlodDisplay extends Component {

    render() {
        return (
            <div className="plodByYearContainer">
                <div className="plodYear plodYearScale" key={0} style={{width: "40px"}}>
                    <div>100%</div>
                    <div>50%</div>
                    <div>0%</div>
                </div>
                {
                    this.props.plodByYear.map(function(value, i) {
                    let roundedPercentage = (value * 100).toFixed(2);

                    return (
                        <div className="plodYear plodYearBg" key={i+1}>
                            <div className="plodYear plodYearFg" style={{height: Math.round(value * 100)+"%"}}></div>
                            <div className="plodYear plodYearAC">{(300 + i) % 5 == 0 ? (300 + i) : ''}</div>
                            <div className="plodYearTooltip" style={{bottom: "calc(" + Math.round(value * 100) + "% - 1em)"}}>{roundedPercentage} %</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

CharacterPlodDisplay.propTypes = { plodByYear: React.PropTypes.array};
