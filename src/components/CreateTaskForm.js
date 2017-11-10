import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class CreatTaskForm extends Component {
	/* static propTypes = {
	 	addTask: PropTypes.func.isRequired,
	 }*/

	state = {
		task: '',
		project: '',
		client: ''
	};

	onTaskNameChange = (e) => {
		const taskField = document.getElementById("taskField");
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

	addTask = (e) => {
		if (e) e.preventDefault();
		if (this.state.task.length === 0) {
			const taskField = document.getElementById("taskField");
			taskField.classList.add('inputError')
				this.setState({
				task: '',
				project: '',
				client: ''
			});
		} else {
			this.props.addTask(
				this.state.task,
				this.state.project,
				this.state.client,
				this.state.timecreated
			);
			this.setState({
				task: '',
				project: '',
				client: ''
			});
		}
	};

	render() {
		return(
			<div className='creatTaskForm'>
				<form onSubmit={this.addTask}>
					<input id='taskField'
						type='text'
						value={this.state.task}
						onChange={this.onTaskNameChange}
						placeholder='Task (required)' />
					<input
						type='text'
						value={this.state.project}
						onChange={this.onProjectNameChange}
						placeholder='Project'	/>	
					<input
						type='text'
						value={this.state.client}
						onChange={this.onClientNameChange}
						placeholder='Client' />		
					<input
						className='control-buttons' 
						type='submit' 
						value='ADD TASK' />				
				</form>
			</div>
		)
	}
}