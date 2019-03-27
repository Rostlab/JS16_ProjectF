import React from 'react';
let { Component } = React;

import window from 'global';

import './Countdown.css';

export default class Countdown extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          days: 0,
          hours: 0,
          min: 0,
          sec: 0
        };
      }
    
      componentDidMount() {
        // update every second
        this.interval =  window.setInterval(() => {
          const date = this.calculateCountdown(this.props.date);
          date ? this.setState(date) : this.stop();
        }, 1000);
      }
    
      componentWillUnmount() {
        this.stop();
      }
    
      calculateCountdown(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    
        // clear countdown when date is reached
        if (diff <= 0) return false;
    
        const timeLeft = {
          years: 0,
          days: 0,
          hours: 0,
          min: 0,
          sec: 0,
          millisec: 0
        };
    
        // calculate time difference between now and expected date
        if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
          timeLeft.years = Math.floor(diff / (365.25 * 86400));
          diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) { // 24 * 60 * 60
          timeLeft.days = Math.floor(diff / 86400);
          diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
          timeLeft.hours = Math.floor(diff / 3600);
          diff -= timeLeft.hours * 3600;
        }
        if (diff >= 60) {
          timeLeft.min = Math.floor(diff / 60);
          diff -= timeLeft.min * 60;
        }
        timeLeft.sec = diff;
    
        return timeLeft;
      }
    
      stop() {
        window.clearInterval(this.interval);
      }
    
      addLeadingZeros(value) {
        value = String(value);
        while (value.length < 2) {
          value = '0' + value;
        }
        return value;
      }
    
      render() {
        const countDown = this.state;
    
        return (
          <div className="Countdown">
            <div className="Countdown-col">
              <div className="Countdown-col-number">
                  <strong>{this.addLeadingZeros(countDown.days)[0]}</strong>
                  <strong>{this.addLeadingZeros(countDown.days)[1]}</strong>
              </div>
              <div className="Countdown-col-string">
                {countDown.days === 1 ? 'Day' : 'Days'}
              </div>
            </div>
    
            <div className="Countdown-col">
              <div className="Countdown-col-number">
                <strong>{this.addLeadingZeros(countDown.hours)[0]}</strong>
                <strong>{this.addLeadingZeros(countDown.hours)[1]}</strong>
              </div>
              <div className="Countdown-col-string">
                {countDown.hours === 1 ? 'Hour' : 'Hours'}
              </div>
            </div>
    
    
            <div className="Countdown-col">
              <div className="Countdown-col-number">
                <strong>{this.addLeadingZeros(countDown.min)[0]}</strong>
                <strong>{this.addLeadingZeros(countDown.min)[1]}</strong>
              </div>
              <div className="Countdown-col-string">Minutes</div>
            </div>
    
            <div className="Countdown-col">
              <div className="Countdown-col-number">
                <strong>{this.addLeadingZeros(countDown.sec)[0]}</strong>
                <strong>{this.addLeadingZeros(countDown.sec)[1]}</strong>
              </div>
              <div className="Countdown-col-string">Seconds</div>
            </div>
          </div>
        );
    }
}

Countdown.propTypes = {
    date: React.PropTypes.string.isRequired
};

Countdown.defaultProps = {
    date: new Date()
};