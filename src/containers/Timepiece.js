import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Col, Row } from 'react-bootstrap';
import * as TaskActionCreators from '../actions/task';
import ActiveTask from '../components/ActiveTask';
import Timer from '../components/Timer';
import CreateTaskForm from '../components/CreateTaskForm';
import CurrentTask from '../components/CurrentTask';
import FinishedTask from '../components/FinishedTask';
import EditTask from '../components/EditTask';


class Timepiece extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired
	};
	
	render() {
		const { dispatch, tasks, selectedTaskIndex, showEditScreen, editTaskIndex} = this.props;
		const addTask = bindActionCreators(TaskActionCreators.addTask, dispatch);
		const selectTask = bindActionCreators(TaskActionCreators.selectTask, dispatch);
		const finishTask = bindActionCreators(TaskActionCreators.finishTask, dispatch);
		const deleteTask = bindActionCreators(TaskActionCreators.deleteTask, dispatch);
		const pauseTask = bindActionCreators(TaskActionCreators.pauseTask, dispatch);
		const openEdit = bindActionCreators(TaskActionCreators.openEdit, dispatch);
		const closeEdit = bindActionCreators(TaskActionCreators.closeEdit, dispatch);
		const updateTask = bindActionCreators(TaskActionCreators.updateTask, dispatch);

		/*const formatTime = (sec) =>
			Math.floor(sec / 3600) % 60 + 
			':' + 
			('0' + Math.floor(sec / 60) % 60).slice(-2) + 
			':' + 
			('0' + sec % 60).slice(-2)*/

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
				selectTask={selectTask}
				deleteTask={deleteTask}
				openEdit={openEdit}
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
				selectTask={selectTask}
				deleteTask={deleteTask}
				openEdit={openEdit}
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
				<Col sm={12} md={6}>
				<ActiveTask 
					selectedTask={selectedTask} />
				<Timer
					selectedTaskIndex={selectedTaskIndex} 
					secondsElapsed={secondsElapsed} 
					finishTask={finishTask} 
					pauseTask={pauseTask}
					selectedTask={selectedTask} />
				<CreateTaskForm addTask={addTask} />
				<h2>Current Tasks</h2>
				<div className='taskWrapper'>
					{ currentTasks }
				</div>
				</Col>
				<Col sm={12} md={6}>
				<h2>Finished Tasks</h2>
				<div className='taskWrapper'>
					{ finishedTasks }
				</div>
				</Col>
				</Row>
				{showEditScreen === true && <EditTask
				closeEdit={closeEdit} 
				updateTask={updateTask}
				showEditScreen={showEditScreen}
				selectedTaskIndex={selectedTaskIndex}
				editTask={editTask}/>}
			</Grid>
		)
	}
}

const mapStateToProps = state => (
	{
		tasks: state.tasks,
		selectedTaskIndex: state.selectedTaskIndex,
		showEditScreen: state.showEditScreen,
		editTaskIndex: state.editTaskIndex
	}
);

export default connect(mapStateToProps)(Timepiece);