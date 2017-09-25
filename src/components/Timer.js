import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';

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
			cancelIsDisabled: true,
			startTime: null,
			stopTime: null
		};
		this.incrementer = null;
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedTask === undefined) {
			this.setState({
				secondsElapsed: 0,
				startIsDisabled: true
			})
		} else if (prevProps.selectedTaskIndex !== this.props.selectedTaskIndex) {
			this.setState({
				secondsElapsed: this.props.secondsElapsed
			})
		}
	}

	handleStartClick() {
			this.setState({
			startIsDisabled: true,
			pauseIsDisabled: false,
			finishIsDisabled: false,
			cancelIsDisabled: false,
			startTime: new Date().getTime(),
			secondsElapsed: this.props.secondsElapsed
		})
		this.incrementer = setInterval( () =>
			this.setState({
				secondsElapsed: this.state.secondsElapsed + 1
			})
		, 1000)
	}

	handlePauseClick() {
		clearInterval(this.incrementer);
		this.setState({
			lastClearedIncrementer: this.incrementer,
			pauseIsDisabled: true,
			startIsDisabled: false,
			stopTime: new Date().getTime(),
			secondsElapsed: this.state.secondsElapsed
		}, function() {
			this.validatePauseTask();
		});
	}

	validatePauseTask() {
		if (this.state.startTime !== null && this.state.stopTime !== null) {
			this.props.pauseTask(this.state.secondsElapsed, this.state.startTime, this.state.stopTime);
			console.log('validatePauseTask');
		}
	}

	handleFinishClick() {
		clearInterval(this.incrementer);
		this.setState({
			startIsDisabled: false,
			pauseIsDisabled: true,
			finishIsDisabled: true,
			cancelIsDisabled: true,
			stopTime: new Date().getTime()
		}, function() {
			this.validateFinishTask();
		});
	}

	validateFinishTask() {
		if (typeof(Storage) !== "undefined") {
			//localStorage.secondsElapsed = this.state.secondsElapsed.toString();
			if (this.state.startTime !== null && this.state.stopTime !== null) {
				this.props.finishTask(this.state.secondsElapsed, this.state.startTime, this.state.stopTime);
				this.setState({secondsElapsed: 0})
			}
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
			<div className="timer">
				<h1>{formatTime(this.state.secondsElapsed)}</h1>
 					<button onClick={this.handleStartClick.bind(this)} disabled={this.props.selectedTaskIndex === -1 || this.state.startIsDisabled}>START</button>
					<button onClick={this.handlePauseClick.bind(this)} disabled={this.state.pauseIsDisabled}>PAUSE</button>
					<button onClick={this.handleFinishClick.bind(this)} disabled={this.state.finishIsDisabled}>FINISH</button>
					<button onClick={this.handleCancelClick.bind(this)} disabled={this.state.cancelIsDisabled}>CANCEL</button>		
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
