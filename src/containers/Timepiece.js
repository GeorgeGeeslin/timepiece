import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import ActiveTask from '../components/ActiveTask';
import Timer from '../components/Timer';
import CreateTaskForm from '../components/CreateTaskForm';
import CurrentTask from '../components/CurrentTask';
import FinishedTask from '../components/FinishedTask';
import EditTask from '../components/EditTask';
import Summary from '../components/Summary'

export default class Timepiece extends Component {
//		static propTypes = {
//		tasks: PropTypes.array.isRequired
//	};

	render() {

		const tasks = this.props.tasks;
		const selectedTaskIndex = this.props.selectedTaskIndex;
		const showEditScreen = this.props.showEditScreen;
		const editTaskIndex = this.props.editTaskIndex;
		const lastManualUpdate = this.props.lastManualUpdate;
		//const username = this.props.username;
		//const uid = this.props.uid;

		let selectedTask;
		if (selectedTaskIndex !== -1) {
			selectedTask = tasks.filter(function(task){
				return task.timeKey === selectedTaskIndex;
			})[0];
		}

		let secondsElapsed;
		if (selectedTask === undefined || selectedTask.time === undefined) {
			secondsElapsed = 0
		} else {
			secondsElapsed = selectedTask.time;
		}
		
		const currentTasks = tasks.filter(function(task){
			return task.timefinished === null
		}).map((tasks, index) => (
			<CurrentTask 
				index={index}
				task={tasks.task}
				project={tasks.project}
				client={tasks.client}
				key={index}
				timeKey={tasks.timeKey}
				selectTask={this.props.selectTask}
				deleteTask={this.props.deleteTask}
				openEdit={this.props.openEdit}
				selectedTaskIndex={selectedTaskIndex}
			/>
		));

		const finishedTasks = tasks.filter(function(task) {
			return task.timefinished !== null
		}).map((tasks, index) => (
			<FinishedTask
				index={index}
				task={tasks.task}
				project={tasks.project}
				client={tasks.client}
				key={index}
				timeKey={tasks.timeKey}
				resumeTask={this.props.resumeTask}
				deleteTask={this.props.deleteTask}
				openEdit={this.props.openEdit}
				selectedTaskIndex={selectedTaskIndex}
			/>
		));

		let editTask;
		if (editTaskIndex !== -1) {
			editTask = tasks.filter(function(task){
				return task.timeKey === editTaskIndex;
			})[0];
		} else {
			editTask = {
				task: '',
				project: '',
				client: '',
				timeIntervals: []
			}
		}

		return (
			<Grid>
				<Row className="show-grid">
					<Col className={'leftCol'} sm={12} md={6}>
						<ActiveTask 
							selectedTask={selectedTask} />
						<Timer
							selectedTaskIndex={selectedTaskIndex} 
							secondsElapsed={secondsElapsed} 
							finishTask={this.props.finishTask} 
							pauseTask={this.props.pauseTask}
							selectedTask={this.props.selectedTask}
							lastManualUpdate={lastManualUpdate} />
						<CreateTaskForm addTask={this.props.addTask} />
						{ currentTasks.length > 0 && <h2>Current Tasks</h2> }
						<div className='taskWrapper'>
							{ currentTasks }
						</div>
					</Col>
					<Col className={'rightCol'} sm={12} md={6}>
						{ finishedTasks.length > 0 && <h2>Finished Tasks</h2> }
						<div className='taskWrapper'>
							{ finishedTasks }
						</div>
						<Summary tasks={tasks}/>
					</Col>
				</Row>
				{this.props.showEditScreen === true && <EditTask
				closeEdit={this.props.closeEdit} 
				updateTask={this.props.updateTask}
				showEditScreen={this.props.showEditScreen}
				editTaskIndex={this.props.editTaskIndex}
				editTask={editTask}/>}		
			</Grid>
		)	

	}
}

