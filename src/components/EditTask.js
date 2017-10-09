import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal } from 'react-bootstrap';

export default class EditTask extends Component {
	//define propTypes
	/*static propTypes = {
	
	}*/

	state = {
		task: this.props.editTask.task,
		project: this.props.editTask.project,
		client: this.props.editTask.client,
		timeintervals: this.props.editTask.timeintervals,
		time: this.props.editTask.time
	};

	formatTimeStamp(timeStamp) {
		const date = new Date(timeStamp);
		let hours = date.getHours();
		hours = (hours+24)%24;
		let mid='am';
		if ( hours === 0 ) {
			hours = 12;
		} else if ( hours > 12 ){
			hours = hours % 12;
			mid = 'pm'
		}
		let minutes = ('0' + date.getMinutes()).slice(-2);
		let seconds = ('0' + date.getSeconds()).slice(-2);
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		let year = date.getFullYear();
		return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds + ' ' + mid;
	};

	onTaskNameChange = (e) => {
		const taskField = document.getElementById('taskField');
		if (taskField.className === 'inputError') {
			taskField.classList.remove('inputError')
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


//need to handle passing an index to this function so that I can change the correct time interval
	onTimeIntervalChange = (e, index) => {
	//	const in
	}

	updateTask = (e) => {
		//rember to validate that taskField is not blank
		if (e) e.preventDefault();
		if (this.state.task.length === 0) {
			const taskField = document.getElementById('taskField');
			taskField.classList.add('inputError')
			this.setState({
				task: ''
			});
		} else {
			this.props.updateTask(

			)
		}
	};


	render() {	

		const timeIntervals = this.state.timeintervals.map((timeInterval, index) => (
			<div key={index}>
				<h6>Time Interval: {index + 1}</h6>
				<input 
					type='text'
					value={this.formatTimeStamp(timeInterval.startTime)}
					onChange={this.onTimeIntervalChange}/>
				<input 
					type='text'
					value={this.formatTimeStamp(timeInterval.stopTime)}
					onChange={this.onTimeIntervalChange}/>
			</div>
		));

		return (
			<Modal show={this.props.showEditScreen} className='edit-modal'>
				<Modal.Header>
					<h3>Edit Task</h3>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={this.updateTask}>
						<input id='taskField'
							type='text'
							value={this.state.task}
							onChange={this.onTaskNameChange}/>
						<input 
							type='text'
							value={this.state.project}
							onChange={this.onProjectNameChange}/>
						<input 
							type='text'
							value={this.state.client}
							onChange={this.onClientNameChange}/>
							{ timeIntervals }
						<input 
							type='submit'
							value='Save Edits'/>
					</form>


				</Modal.Body>
				<Modal.Footer>
					<button onClick={this.props.closeEdit}>Close</button>
				</Modal.Footer>
			</Modal> 
		)
	}
}