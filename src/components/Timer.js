import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-bootstrap';

//TODO put this function in one place to share across modules.
const formatTime = (sec) =>
	Math.floor(sec / 3600) + 
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
			startIsDisabled: true,
			pauseIsDisabled: true,
			finishIsDisabled: true,
			cancelIsDisabled: true,
			startTime: null,
			stopTime: null
		};
		this.incrementer = null;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selectedTaskIndex !== this.props.selectedTaskIndex && this.props.selectedTask === undefined) {
			this.setState({
				secondsElapsed: 0,
				startIsDisabled: true
			})
			clearInterval(this.incrementer)
		} else if ( this.props.selectedTaskIndex !== undefined && this.props.selectedTaskIndex !== null && this.props.selectedTask.time === 0 &&
			(prevProps.selectedTaskIndex !== this.props.selectedTaskIndex) || (prevProps.lastManualUpdate !== this.props.lastManualUpdate) ){
			this.setState({
				secondsElapsed: this.props.secondsElapsed,
				startIsDisabled: false,
			})
			clearInterval(this.incrementer)
		} else if ( this.props.selectedTaskIndex !== undefined && this.props.selectedTaskIndex !== null && this.props.selectedTask.time > 0 &&
			(prevProps.selectedTaskIndex !== this.props.selectedTaskIndex) || (prevProps.lastManualUpdate !== this.props.lastManualUpdate) ){
			this.setState({
				secondsElapsed: this.props.secondsElapsed,
				startIsDisabled: false,
				finishIsDisabled: false
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
			cancelIsDisabled: true,
			stopTime: new Date().getTime(),
			secondsElapsed: this.state.secondsElapsed
		}, function() {
			this.validatePauseTask();
		});
	}

	validatePauseTask() {
		if (this.state.startTime !== null && this.state.stopTime !== null) {
			this.props.pauseTask(this.state.secondsElapsed, this.state.startTime, this.state.stopTime, this.props.selectedTaskIndex, this.props.uid, this.props.selectedTask.taskKey);
			this.setState({startTime: null, stopTime: null})
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
		if (this.state.stopTime !== null) {
			this.props.finishTask(this.state.secondsElapsed, this.state.startTime, this.state.stopTime, this.props.uid, this.props.selectedTask.taskKey);
			this.setState({secondsElapsed: 0, startTime: null, stopTime: null})
		}
	}

	handleCancelClick() {
		clearInterval(this.incrementer);
		this.setState({
			secondsElapsed: this.props.secondsElapsed,
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
 					<button
 						className='control-buttons' 
 						onClick={this.handleStartClick.bind(this)}
 						disabled={this.props.selectedTaskIndex === -1 || this.state.startIsDisabled}>
 						START
 					</button>
					<button 
						className='control-buttons'
						onClick={this.handlePauseClick.bind(this)} 
						disabled={this.state.pauseIsDisabled}>
						PAUSE
					</button>
					<button
						className='control-buttons' 
						onClick={this.handleFinishClick.bind(this)} 
						disabled={this.state.finishIsDisabled}>
						FINISH
					</button>
					<button
						className='control-buttons' 
						onClick={this.handleCancelClick.bind(this)} 
						disabled={this.state.cancelIsDisabled}>
						CANCEL
					</button>		
			</div>
		)
	}
}

Timer.propTypes = {
	finishTask: PropTypes.func.isRequired,
	pauseTask: PropTypes.func.isRequired,
	secondsElapsed: PropTypes.number.isRequired,
	uid: PropTypes.string.isRequired,
	selectedTaskIndex: PropTypes.string,
	lastManualUpdate: PropTypes.string
}

module.exports = Timer;
