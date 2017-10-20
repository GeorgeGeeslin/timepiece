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
		time: this.props.editTask.time,
		timeintervals: this.props.editTask.timeintervals,
		invalidTimeIndexs: [],
		overlappingTimes: []
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

	calculateTime = () => {
		var total = 0;
		for (var i = 0; i < this.state.timeintervals.length; i++) {
			total += (this.state.timeintervals[i].stopTime - this.state.timeintervals[i].startTime);
		}

		return total;
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
		if (e.target.value === "") {
			const dateTime = new Date();
		} else {
			const dateTime = e.target.value;
			const unixTime = this.formatUnixTime(dateTime);
			var currInterval = {startTime: unixTime, stopTime: this.state.timeintervals[index].stopTime};
			var timeintervals = [];
		}
		this.state.timeintervals.map((interval, index) => ( timeintervals.push(interval) ));
		timeintervals[index] = currInterval;
		this.setState({timeintervals: timeintervals});
	};

	onChangeStopTime = (index, e) => {
		if (e.target.value === "") {
			const dateTime = new Date();
		} else {
			const dateTime = e.target.value;
			const unixTime = this.formatUnixTime(dateTime);
			var currInterval = {startTime: this.state.timeintervals[index].startTime, stopTime: unixTime};
			var timeintervals = [];
		}
		this.state.timeintervals.map((interval, index) => ( timeintervals.push(interval) ));
		timeintervals[index] = currInterval;
		this.setState({timeintervals: timeintervals});
	};

	onAddTime = () => {
		var timeintervals = [];
		this.state.timeintervals.map((interval, index) => ( timeintervals.push(interval) ))
		timeintervals.push({startTime: new Date().getTime(), stopTime: new Date().getTime()});
		this.setState({timeintervals: timeintervals});
	}

	onRemoveTime = (index) => {
		var timeintervals = [];
		this.state.timeintervals.map((interval, index) => ( timeintervals.push(interval) ))
		timeintervals.splice(index,1);
		this.setState({timeintervals: timeintervals});
	}

	findOverlappingTimes = (intervals) => {
		var overlappingTimes = [];
		for (var i = 0; i < intervals.length; i++) {
			for ( var j = 0; j < intervals.length; j ++) {
				if (intervals[j].startTime > intervals[i].startTime && intervals[j].startTime < intervals[i].stopTime) {
				overlappingTimes.push(j);
				}
			}
		}
		return overlappingTimes;		
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
		}	else if (this.findOverlappingTimes(this.state.timeintervals).length > 0){
			this.setState({overlappingTimes: this.findOverlappingTimes(this.state.timeintervals)})
		} else {
			this.state.time = Math.floor(this.calculateTime() / 1000)
			this.props.updateTask(
				this.state.task,
				this.state.project,
				this.state.client,
				this.state.time,
				this.state.timeintervals,
				this.props.editTaskIndex
			)
			this.props.closeEdit();
		}
	};

	render() {	
		var timeIntervals = this.state.timeintervals.map((timeInterval, index) => (
			<div key={index} className='tasks'>
				<p>Time Interval: {index + 1}<span style={{float: 'right', paddingRight: '10px'}} onClick={ () => this.onRemoveTime(index) }>Delete</span></p> 
					{  this.state.invalidTimeIndexs.includes(index) && <div className='validationError'>Time Interval Error: The End time cannot be earlier than the Start time.</div> }
					{ this.state.overlappingTimes.includes(index) && <div className='validationError'>Time Interval Error: This time interval overlaps another time interval.</div>}
				<Grid>
					<Row className='show-grid'>
						<Col sm={12} md={6}>
							<label htmlFor='start-time' className='inputLabel'  id={'interval' + index }>Start: </label>
							<input id='start-time'
								className='time-input'
								type='datetime-local'
								value={this.formatTimeStamp(timeInterval.startTime)}
								onChange={(e) => this.onChangeStartTime(index, e)}/>
						</Col>
						<Col sm={12} md={6}>
							<label htmlFor='stop-time' className='inputLabel' id={'interval' + index }>End: </label>
							<input id='stop-time'
								className='time-input'
								type='datetime-local'
								value={this.formatTimeStamp(timeInterval.stopTime)}
								onChange={(e) => this.onChangeStopTime(index, e)}/>
						</Col>
					</Row>
				</Grid>
			</div>
		));

		return (
			<Grid>
				<Row className='show-grid'>
					<Col sm={12}>
						<Modal show={this.props.showEditScreen} className='edit-modal'>
							<Modal.Header>
								<h2>Edit Task</h2>
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
								</form>
								<button className='task-buttons' onClick={ () => this.onAddTime()}>Add Time</button>
							</Modal.Body>
							<Modal.Footer>
								<input
									className='task-buttons' 
									type='submit'
									value='Save and Exit'
									form='editform'/>
								<button className='task-buttons' onClick={this.props.closeEdit}>Cancel</button>
							</Modal.Footer>
						</Modal>
					</Col>
				</Row>
			</Grid>
		)
	}
}