import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

//TODO put this function in one place to share across modules.
const formatTime = (sec) =>
	Math.floor(sec / 3600) % 60 + 
		':' + 
		('0' + Math.floor(sec / 60) % 60).slice(-2) + 
		':' + 
		('0' + sec % 60).slice(-2)

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secondsElapsed: 0,
			lastClearedIncrementer: null,
			startIsDisabled: false,
			pauseIsDisabled: true,
			finishIsDisabled: true,
			cancelIsDisabled: true
		};
		this.incrementer = null;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedTaskIndex !== this.props.selectedTaskIndex) {
			this.setState({
				secondsElapsed: this.props.secondsElapsed
			})
		}
		console.log(this)
	}

	handleStartClick() {
			this.setState({
			startIsDisabled: true,
			pauseIsDisabled: false,
			finishIsDisabled: false,
			cancelIsDisabled: false,
			secondsElapsed: this.props.secondsElapsed
		})
		this.incrementer = setInterval( () =>
			this.setState({
				secondsElapsed: this.state.secondsElapsed + 1
			})
		, 1000)
	}

	handleStopClick() {
		clearInterval(this.incrementer);
		this.setState({
			lastClearedIncrementer: this.incrementer,
			pauseIsDisabled: true,
			startIsDisabled: false
		});
	}

	handleFinishClick() {
		clearInterval(this.incrementer);
		this.setState({
			secondsElapsed: 0,
			startIsDisabled: false,
			pauseIsDisabled: true,
			finishIsDisabled: true,
			cancelIsDisabled: true
		})
		if (typeof(Storage) !== "undefined") {
			//localStorage.secondsElapsed = this.state.secondsElapsed.toString();
			//console.log('finshed')
			this.props.finishTask(this.state.secondsElapsed);
		} else {
			alert("Sorry, the browser you're using doesn't support HTML5 storage.")
		}
	}

	handleCancelClick() {
		clearInterval(this.incrementer);
		this.setState({
			secondsElapsed: 0,
			startIsDisabled: false,
			pauseIsDisabled: true,
			finishIsDisabled: true,
			cancelIsDisabled: true
		})
	}

	render() {
		return (
			<div className="stopwatch">
				<h1 className="stopwatch-timer">{formatTime(this.state.secondsElapsed)}</h1>
 					<button onClick={this.handleStartClick.bind(this)} disabled={this.props.selectedTaskIndex === -1 || this.state.startIsDisabled}>Start</button>
					<button onClick={this.handleStopClick.bind(this)} disabled={this.state.pauseIsDisabled}>Pause</button>
					<button onClick={this.handleFinishClick.bind(this)} disabled={this.state.finishIsDisabled}>Finish</button>
					<button onClick={this.handleCancelClick.bind(this)} disabled={this.state.cancelIsDisabled}>Cancel</button>		
			</div>
		)
	}
}

Timer.propTypes = {
	finishTask: PropTypes.func.isRequired,
	secondsElapsed: PropTypes.number.isRequired,
	selectedTaskIndex: PropTypes.number.isRequired
}

module.exports = Timer;
