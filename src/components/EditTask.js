import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Grid, Col, Row } from 'react-bootstrap';

export default class EditTask extends Component {
	static propTypes = {
		closeEdit: PropTypes.func.isRequired,
		updateTask: PropTypes.func.isRequired,
		editTask: PropTypes.object.isRequired,
		editTaskIndex: PropTypes.string.isRequired,
		showEditScreen: PropTypes.bool.isRequired,
		uid: PropTypes.string.isRequired
	}

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
		let timeintervals = [];
		if (e.target.value === "") {
			const dateTime = this.minuteRoundedTime().getTime();
			var currInterval = {startTime: dateTime, stopTime: this.state.timeintervals[index].stopTime};
		} else {
			const dateTime = e.target.value;
			const unixTime = this.formatUnixTime(dateTime);
			var currInterval = {startTime: unixTime, stopTime: this.state.timeintervals[index].stopTime};
		}
		this.state.timeintervals.map((interval, index) => ( timeintervals.push(interval) ));
		timeintervals[index] = currInterval;
		this.setState({timeintervals: timeintervals});
	};

	onChangeStopTime = (index, e) => {
		let timeintervals = [];
		if (e.target.value === "") {
			const dateTime = this.minuteRoundedTime().getTime();
			var currInterval = {startTime: this.state.timeintervals[index].startTime, stopTime: dateTime};
		} else {
			const dateTime = e.target.value;
			const unixTime = this.formatUnixTime(dateTime);
			var currInterval = {startTime: this.state.timeintervals[index].startTime, stopTime: unixTime};
		}
		this.state.timeintervals.map((interval, index) => ( timeintervals.push(interval) ));
		timeintervals[index] = currInterval;
		this.setState({timeintervals: timeintervals});
	};

	minuteRoundedTime() {
		const currDate = new Date();
		const year = currDate.getFullYear();
		const month = currDate.getMonth();
		const date = currDate.getDate();
		const hours = currDate.getHours();
		const minutes = currDate.getMinutes();
		const roundedToMinute = new Date(year, month, date, hours, minutes);
		return roundedToMinute;
	};

	onAddTime = () => {
		let timeintervals = [];
		this.state.timeintervals.map((interval, index) => ( timeintervals.push(interval) ))
		timeintervals.push(
			{
				startTime: Math.floor(this.minuteRoundedTime().getTime()), 
				stopTime: Math.floor(this.minuteRoundedTime().getTime()) 
			}
		);
		this.setState({timeintervals: timeintervals});
	};

	onRemoveTime = (index) => {
		var timeintervals = [];
		this.state.timeintervals.map((interval, index) => ( timeintervals.push(interval) ))
		timeintervals.splice(index,1);
		this.setState({timeintervals: timeintervals});
	};

	findOverlappingTimes = (intervals) => {
		var overlappingTimes = [];
		for (var i = 0; i < intervals.length; i++) {
			for ( var j = 0; j < intervals.length; j ++) {
				if ( (intervals[j].startTime >= intervals[i].startTime && intervals[j].startTime <= intervals[i].stopTime) && i !== j) {
				overlappingTimes.push(j);
				}
			}
		}
		return overlappingTimes;		
	};

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
			//this.state.time = this.calculateTime() / 1000
			if (this.props.editTask.timefinished === undefined) {
				let timefinished = null;
				this.props.updateTask(
					this.props.uid,
					this.state.task,
					this.state.project,
					this.state.client,
					this.state.time,
					this.props.editTask.timecreated,
					timefinished,
					this.state.timeintervals,
					this.props.editTaskIndex
				)
			} else {
				this.props.updateTask(
					this.props.uid,
					this.state.task,
					this.state.project,
					this.state.client,
					this.state.time,
					this.props.editTask.timecreated,
					this.props.editTask.timefinished,
					this.state.timeintervals,
					this.props.editTaskIndex
				)
			}
			this.props.closeEdit();
		}
	};

	render() {	
		var timeIntervals = this.state.timeintervals.map((timeInterval, index) => (
			<div key={index} className='tasks'>
				<div>Time Interval: {index + 1}
					<div className='icon-trash' style={{float: 'right', paddingRight: '10px'}} onClick={ () => this.onRemoveTime(index) }>
						<div className="trash-lid" style={{backgroundColor: "red"}}></div>
    				<div className="trash-container" style={{backgroundColor: "red"}}></div>
						<div className="trash-line-1"></div>
    				<div className="trash-line-2"></div>
   					<div className="trash-line-3"></div>
					</div>
				</div> 
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
						<Modal show={this.props.showEditScreen} className='modal'>
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
									onClick={this.updateTask}
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