import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Grid, Col, Row } from 'react-bootstrap';

export default class EditTask extends Component {
	//define propTypes
	/*static propTypes = {
	
	}*/

	state = {
		task: this.props.editTask.task,
		project: this.props.editTask.project,
		client: this.props.editTask.client,
		timeintervals: this.props.editTask.timeintervals,
		invalidTimeIndexs: []
	};
	
	formatTimeStamp(timeStamp) {
		const date = new Date(timeStamp);
		let hours = ('0' + date.getHours()).slice(-2);
		let minutes = ('0' + date.getMinutes()).slice(-2);
		let seconds = ('0' + date.getSeconds()).slice(-2);
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		let year = date.getFullYear();
		return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;
	};

	formatUnixTime(dateTime) {
		const year = dateTime.slice(0,4);
		const month = dateTime.slice(5,7) - 1;
		const day = dateTime.slice(8,10);
		const hours = dateTime.slice(11,13);
		const minutes = dateTime.slice(14,16);
		return new Date(year,month,day,hours,minutes).getTime();
	};

	onTaskNameChange = (e) => {
		const editTaskField = document.getElementById('editTaskField');
		if (editTaskField.className === 'inputError') {
			editTaskField.classList.remove('inputError')
		}
		const task = e.target.value;
		this.setState({task: task});
	};

		onProjectNameChange = (e) => {
		const project = e.target.value;
		this.setState({project: project});
	};

	onClientNameChange = (e) => {
		const client = e.target.value;
		this.setState({client: client});
	};

	onChangeStartTime = (index, e) => {
		const dateTime = e.target.value;
		const unixTime = this.formatUnixTime(dateTime);
		var newState = Object.assign({}, this.state);
		newState.timeintervals[index].startTime = unixTime;
		this.state = newState
		this.setState(this.state);
	};

	onChangeStopTime = (index, e) => {
		const dateTime = e.target.value;
		const unixTime = this.formatUnixTime(dateTime);
		var newState = Object.assign({}, this.state);
		newState.timeintervals[index].stopTime = unixTime;
		this.state = newState
		this.setState(this.state);
	};

	addTime = () => {
		var newState = Object.assign({}, this.state);
		newState.timeintervals.push({startTime: new Date().getTime(), stopTime: new Date().getTime()})
		this.state = newState
		this.setState(this.state)
	}

	updateTask = (e) => {
		if (e) e.preventDefault();
		if ( this.state.task.length === 0 ) {
			const editTaskField = document.getElementById('editTaskField');
			editTaskField.classList.add('inputError')
			component.setState({task: ''})
		} else if ( this.state.timeintervals.filter(function(interval) { return interval.startTime > interval.stopTime }).length !== 0 ) {
			var invalidTimes = [];
			const invalidIntervals = this.state.timeintervals.map((interval,index) => {
				if ( interval.startTime > interval.stopTime ) {
					invalidTimes.push(index);
				}
			})
			this.setState({invalidTimeIndexs: invalidTimes})
		}	else {
			this.props.updateTask(
				this.state.task,
				this.state.project,
				this.state.client,
				this.props.editTaskIndex
			)
			console.log('click')
		}
	};

	render() {	
		var timeIntervals = this.state.timeintervals.map((timeInterval, index) => (
			<div key={index}>
				<h4>Time Interval: {index + 1}</h4> 
					{  this.state.invalidTimeIndexs.includes(index) && <div className='validationError'>Time Interval Error: The End time cannot be earlier than the Start time.</div> }
				<Grid>
					<Row className='show-grid'>
						<Col sm={12} md={6}>
							<label htmlFor='start-time' className='control-label' id={'interval' + index }>Start: </label>
							<input id='start-time'
								type='datetime-local'
								value={this.formatTimeStamp(timeInterval.startTime)}
								onChange={(e) => this.onChangeStartTime(index, e)}/>
						</Col>
						<Col sm={12} md={6}>
							<label htmlFor='stop-time' className='control-label' id={'interval' + index }>End: </label>
							<input id='stop-time'
								type='datetime-local'
								value={this.formatTimeStamp(timeInterval.stopTime)}
								onChange={(e) => this.onChangeStopTime(index, e)}/>
						</Col>
					</Row>
				</Grid>
			</div>
		));

		return (
			<Modal show={this.props.showEditScreen} className='edit-modal'>
				<Modal.Header>
					<h3>Edit Task</h3>
				</Modal.Header>
				<Modal.Body>
					<form id='editform' onSubmit={this.updateTask}>
						<input id='editTaskField'
							type='text'
							value={this.state.task}
							placeholder='Task (required)'
							onChange={this.onTaskNameChange}/>
						<input 
							type='text'
							value={this.state.project}
							placeholder='Project'
							onChange={this.onProjectNameChange}/>
						<input 
							type='text'
							value={this.state.client}
							placeholder='Client'
							onChange={this.onClientNameChange}/>
							{ timeIntervals }				
						<button onClick={ () => this.addTime()}>Add Time</button>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<input 
						type='submit'
						value='Save Edits'
						form='editform'/>
					<button onClick={this.props.closeEdit}>Close</button>
				</Modal.Footer>
			</Modal> 
		)
	}
}