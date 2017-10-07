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
		client: this.props.editTask.client
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

	updateTask = (e) => {
		//rember to validate that taskField is not blank
		if (e) e.preventDefault();
		if (this.state.task.length === 0) {
			//const taskField = document.getElementById('taskField');
			//taskField.classList.add('inputError')
			//this.setState({
			//	task: ''
			//});
		} else {
			//need to create updateTask function in store
			console.log("task.length > 0")
		}
	};


	render() {	
		return (
			<Modal show={this.props.showEditScreen} className='edit-modal'>
				<Modal.Header closeButton>
				</Modal.Header>
				<Modal.Body>
					<h3>Edit Task</h3>
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