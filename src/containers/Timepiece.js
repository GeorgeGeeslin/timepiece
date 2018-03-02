import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import ActiveTask from '../components/ActiveTask';
import Timer from '../components/Timer';
import CreateTaskForm from '../components/CreateTaskForm';
import CurrentTask from '../components/CurrentTask';
import FinishedTask from '../components/FinishedTask';
import EditTask from '../components/EditTask';
import Summary from '../components/Summary';
import ConfirmDelete from '../components/ConfirmDelete';

export default class Timepiece extends Component {
	static propTypes = {
		addTask: PropTypes.func.isRequired,
		deleteTask: PropTypes.func.isRequired,
		finishTask: PropTypes.func.isRequired,
		openEdit: PropTypes.func.isRequired,
		closeEdit: PropTypes.func.isRequired,
		closeUserMenu: PropTypes.func.isRequired,
		pauseTask: PropTypes.func.isRequired,
		resumeTask: PropTypes.func.isRequired,
		selectTask: PropTypes.func.isRequired,
		updateTask: PropTypes.func.isRequired,
		tasks: PropTypes.array.isRequired,
		user: PropTypes.object.isRequired,
		showEditScreen: PropTypes.bool.isRequired,
		lastManualUpdate: PropTypes.string,
		selectedTaskIndex: PropTypes.string,
		openConfirmDelete: PropTypes.func.isRequired,
		closeConfirmDelete: PropTypes.func.isRequired,
		showConfirmDelete: PropTypes.bool.isRequired
	};

	getTaskKey = (taskKey) => (
		props.taskKey
	);

	render() {

		const tasks = this.props.tasks;
		const selectedTaskIndex = this.props.selectedTaskIndex;
		const showEditScreen = this.props.showEditScreen;
		const editTaskIndex = this.props.editTaskIndex;
		const lastManualUpdate = this.props.lastManualUpdate;
		const user = this.props.user;
		const uid = user.uid;

		const formatTime = (sec) =>
			Math.floor(sec / 3600) + 
			':' + 
			('0' + Math.floor(sec / 60) % 60).slice(-2) + 
			':' + 
			('0' + sec % 60).slice(-2)

		let selectedTask;
		if (selectedTaskIndex !== null) {
			selectedTask = tasks.filter((task) => {
				return task.taskKey === selectedTaskIndex;
			})[0];
		}

		let secondsElapsed;
		if (selectedTask === undefined || selectedTask.time === undefined) {
			secondsElapsed = 0
		} else {
			secondsElapsed = selectedTask.time;
		}
		
		const currentTasks = tasks.sort((a, b) => {
			return b.timecreated - a.timecreated;
		}).filter((task) => {
			return (task.timefinished === null || task.hasOwnProperty('timefinished') === false)
		}).map((tasks, index) => (
			<CurrentTask 
				index={index}
				task={tasks.task}
				project={tasks.project}
				client={tasks.client}
				key={index}
				taskKey={tasks.taskKey}
				selectTask={this.props.selectTask}
				deleteTask={this.props.deleteTask}
				openEdit={this.props.openEdit}
				formatTime={formatTime}
				secondsElapsed={tasks.time}
				selectedTaskIndex={selectedTaskIndex}
				uid={uid}
				openConfirmDelete={this.props.openConfirmDelete}
			/>
		));

		const finishedTasks = tasks.sort((a, b) => {
			return b.timefinished - a.timefinished;
		}).filter((task) => {
			return (task.timefinished !== null && task.hasOwnProperty('timefinished') === true)
		}).map((tasks, index) => (
			<FinishedTask
				index={index}
				task={tasks.task}
				project={tasks.project}
				client={tasks.client}
				key={index}
				taskKey={tasks.taskKey}
				resumeTask={this.props.resumeTask}
				deleteTask={this.props.deleteTask}
				openEdit={this.props.openEdit}
				formatTime={formatTime}
				secondsElapsed={tasks.time}
				selectedTaskIndex={selectedTaskIndex}
				uid={uid}
			/>
		));

		let editTask;
		if (editTaskIndex !== null) {
			editTask = tasks.filter((task) => {
				return task.taskKey === editTaskIndex;
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
			<div>
					<Grid onClick= { () => this.props.closeUserMenu()}>
						<Row className="show-grid">
							<Col className={'leftCol'} sm={12} md={6}>
								<div className={'mainContent'}>
									<ActiveTask 
										selectedTask={selectedTask}
									/>
									<Timer
										selectedTaskIndex={selectedTaskIndex} 
										secondsElapsed={secondsElapsed} 
										finishTask={this.props.finishTask} 
										pauseTask={this.props.pauseTask}
										selectedTask={selectedTask}
										lastManualUpdate={lastManualUpdate}
										uid={uid}
									/>
									<CreateTaskForm addTask={this.props.addTask} 
										uid={uid}
									/>
									{ currentTasks.length > 0 && <h2>Current Tasks</h2> }
									<div className='taskWrapper'>
										{ currentTasks }
									</div>
								</div>
							</Col>
							<Col className={'rightCol'} sm={12} md={6}>
								<div className={'mainContent'}>
									{ finishedTasks.length > 0 && <h2>Finished Tasks</h2> }
									<div className='taskWrapper'>
										{ finishedTasks }
									</div>
									<Summary tasks={tasks}/>
								</div>
							</Col>
						</Row>
						{this.props.showEditScreen === true && 
							<EditTask
							closeEdit={this.props.closeEdit} 
							updateTask={this.props.updateTask}
							showEditScreen={this.props.showEditScreen}
							editTaskIndex={this.props.editTaskIndex}
							uid={uid}
							editTask={editTask}/>
						}
						{this.props.showConfirmDelete === true && 
							<ConfirmDelete 
								showConfirmDelete={this.props.showConfirmDelete}
								closeConfirmDelete={this.props.closeConfirmDelete}
								confirmDeleteTaskIndex={this.props.confirmDeleteTaskIndex}
								uid={uid}
								deleteTask={this.props.deleteTask}
								selectedTaskIndex={selectedTaskIndex}
							/>
						}
					</Grid>
			</div>
		)	
	}
}

