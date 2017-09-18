import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class CreatTaskForm extends Component {
	 static propTypes = {
	 	addTask: PropTypes.func.isRequired,
	 }

	state = {
		task: '',
		project: '',
		client: ''
	};

	onTaskNameChange = (e) => {
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
	};

	render() {
		return(
			<div className="creatTaskForm">
				<form onSubmit={this.addTask}>
					<input
						type='text'
						value={this.state.task}
						onChange={this.onTaskNameChange}
						placeholder='Task'
					/>
					<input
						type='text'
						value={this.state.project}
						onChange={this.onProjectNameChange}
						placeholder='Project'
					/>		
					<input
						type='text'
						value={this.state.client}
						onChange={this.onClientNameChange}
						placeholder='Client'
					/>								
					<input type='submit' value='Add Task' />
				</form>
			</div>
		)
	}
}