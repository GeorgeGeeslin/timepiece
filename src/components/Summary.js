import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

const formatTime = (sec) =>
	Math.floor(sec / 3600) + 
		':' + 
		('0' + Math.floor(sec / 60) % 60).slice(-2) + 
		':' + 
		('0' + sec % 60).slice(-2)

const now = new Date();
const currDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const weekStart = new Date(currDay.getTime() - (currDay.getDay() * 86400000)).getTime();
const weekEnd = new Date(((6 - currDay.getDay()) * 86400000) + 86400000 + currDay.getTime()).getTime();
const monthStart = new Date(currDay.getFullYear(), currDay.getMonth(), 1).getTime();
const monthEnd = new Date(currDay.getFullYear(), currDay.getMonth() + 1, 0, 23, 59, 59).getTime();

export default class Summary extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired
	};

 	currentTasks(tasks) {
 		let tasksArr = this.props.tasks.filter(function(task){
 			return (task.timefinished === null || !task.hasOwnProperty('timefinished'))
 		})
 		return tasksArr;
 	}

 	finishedTasks(tasks) {
 		let tasksArr = this.props.tasks.filter(function(task){
 			return (task.timefinished !== null && task.hasOwnProperty('timefinished'))
 		})
 		return tasksArr;
 	}

	openProjects(tasks) {
		let projects = [];
		if (tasks.length > 0) {
			for (let i = 0; i < tasks.length; i++) {
				if (projects.indexOf(tasks[i].project) === -1) {
					projects.push(tasks[i].project);
				} 
			}
		}
		return projects;
	}

	totalProjects() {
		let projects = [];
		if (this.props.tasks.length > 0) {
			for (let i = 0; i < this.props.tasks.length; i++) {
				if (projects.indexOf(this.props.tasks[i].project) === -1) {
					projects.push(this.props.tasks[i].project);
				} 
			}
		}
		return projects;
	}

	openClients(tasks) {
		let clients = [];
		if (tasks.length > 0) {
			for (let i = 0; i < tasks.length; i++) {
				if (clients.indexOf(tasks[i].client) === -1) {
					clients.push(tasks[i].client);
				} 
			}
		}
		return clients;
	}

	totalClients() {
	let clients = [];
		if (this.props.tasks.length > 0) {
			for (let i = 0; i < this.props.tasks.length; i++) {
				if (clients.indexOf(this.props.tasks[i].client) === -1) {
					clients.push(this.props.tasks[i].client);
				} 
			}
		}
		return clients;
	}

	totalTime() {
		return this.props.tasks.reduce((sum, task) => sum + task.time ,0)
	}

	timePeriodTotal(period) {
		if (period === 'week') {
			var periodStart = weekStart;
			var periodEnd = weekEnd;
		} else {
			var periodStart = monthStart;
			var periodEnd = monthEnd;
		}
		let total = 0;
		for (let i = 0; i < this.props.tasks.length; i++) {
			let task = this.props.tasks[i];
			if (task.timeintervals !== undefined && task.timeintervals.length > 0) {
				for (let j = 0; j < task.timeintervals.length; j++) {
					let timeinterval = task.timeintervals[j];
					//interval longer than a weeek. Only count time that falls within the week.
					if (timeinterval.startTime <= periodStart && timeinterval.stopTime >= periodEnd) {
						total = total + (periodEnd - periodStart);
						//interval that starts before the week and ends during the week. 
					} else if (timeinterval.startTime <= periodStart && timeinterval.stopTime <= periodEnd && timeinterval.stopTime >= periodStart) {
							total = total + (timeinterval.stopTime - periodStart); 
						//interval that starts during the week and ends after the week. 
					} else if (timeinterval.startTime >= periodStart && timeinterval.stopTime >= periodEnd && timeinterval.startTime <= periodEnd) {
						total = total + (periodEnd - timeinterval.startTime);
						//interval with start and end times inside the week.
					} else if (timeinterval.startTime >= periodStart && timeinterval.stopTime <= periodEnd) {
						total = total + (timeinterval.stopTime - timeinterval.startTime);
					}
				}
			}
		}
		return (Math.floor(total / 1000)); 
	}

	render() {

		return (
			<div>
				<h2>Summary Stats</h2>
				<Grid className='tasks'>
					<Row>
						<Col sm={12} md={6}>
							<p><span className='taskLabel'>OPEN TASKS: </span>{this.currentTasks(this.props.tasks).length}</p>
							<p><span className='taskLabel'>OPEN PROJECTS: </span>{this.openProjects(this.currentTasks(this.props.tasks)).length}</p>
							<p><span className='taskLabel'>OPEN CLIENTS: </span>{this.openClients(this.currentTasks(this.props.tasks)).length}</p>
						</Col>
						<Col sm={12} md={6}>
							<p><span className='taskLabel'>FINISHED TASKS: </span>{this.finishedTasks(this.props.tasks).length}</p>
							<p><span className='taskLabel'>TOTAL PROJECTS: </span>{this.totalProjects().length}</p>
							<p><span className='taskLabel'>TOTAL CLIENTS: </span>{this.totalClients().length}</p>
						</Col>
					</Row>
					<p><span className='taskLabel'>TIME THIS WEEK: </span>{formatTime(this.timePeriodTotal('week'))}</p>
					<p><span className='taskLabel'>TIME THIS MONTH: </span>{formatTime(this.timePeriodTotal('month'))}</p>
					<p><span className='taskLabel'>TOTAL TIME SPENT: </span>{formatTime(this.totalTime())}</p>
				</Grid>
			</div>
		)
	}
}