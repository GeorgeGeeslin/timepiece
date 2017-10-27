import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

const formatTime = (sec) =>
	Math.floor(sec / 3600) % 60 + 
		':' + 
		('0' + Math.floor(sec / 60) % 60).slice(-2) + 
		':' + 
		('0' + sec % 60).slice(-2)

const now = new Date();
const currDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const weekStart = new Date(currDay.getTime() - (currDay.getDay() * 86400000))
const weekEnd = new Date( ((6 - currDay.getDay()) * 86400000) + 86399999 + currDay.getTime() ) 

export default class Summary extends Component {

 	currentTasks(tasks) {
 		let tasksArr = this.props.tasks.filter(function(task){
 			return task.timefinished === null
 		})
 		return tasksArr;
 	}

 	finishedTasks(tasks) {
 		let tasksArr = this.props.tasks.filter(function(task){
 			return task.timefinished !== null
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

	weeklyTime() {
	//	console.log(now);
	//	console.log(currDay);
		console.log(weekStart.getTime())
		console.log(weekEnd.getTime())
		
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
					<p><span className='taskLabel'>TIME THIS WEEK: </span>{this.weeklyTime()}</p>
					<p><span className='taskLabel'>TIME THIS MONTH: </span>100</p>
					<p><span className='taskLabel'>TOTAL TIME SPENT: </span>{formatTime(this.totalTime())}</p>
					<div className='task-button-container'>
						<button className='task-buttons'>Charts and Time Sheets</button>
					</div>
				</Grid>
			</div>
		)
	}
}