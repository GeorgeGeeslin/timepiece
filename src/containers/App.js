import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TaskActionCreators from '../actions/task';

import Timepiece from './Timepiece';
import Login from '../components/Login';

class App extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired,
		showEditScreen: PropTypes.bool.isRequired,
		showChartScreen: PropTypes.bool.isRequired,
		dispatch: PropTypes.func.isRequired,
		user: PropTypes.object,
		selectedTaskIndex: PropTypes.string,
		lastManualUpdate: PropTypes.string
	};
	
	render() {
		const { dispatch, tasks, selectedTaskIndex, showEditScreen, showChartScreen, editTaskIndex, lastManualUpdate, user} = this.props;
		const attemptLogin = bindActionCreators(TaskActionCreators.attemptLogin, dispatch);
		const attemptSignOut = bindActionCreators(TaskActionCreators.attemptSignOut, dispatch);
		const checkLoginStatus = bindActionCreators(TaskActionCreators.checkLoginStatus, dispatch);
		const addTask = bindActionCreators(TaskActionCreators.addTask, dispatch);
		const selectTask = bindActionCreators(TaskActionCreators.selectTask, dispatch);
		const finishTask = bindActionCreators(TaskActionCreators.finishTask, dispatch);
		const deleteTask = bindActionCreators(TaskActionCreators.deleteTask, dispatch);
		const pauseTask = bindActionCreators(TaskActionCreators.pauseTask, dispatch);
		const openEdit = bindActionCreators(TaskActionCreators.openEdit, dispatch);
		const closeEdit = bindActionCreators(TaskActionCreators.closeEdit, dispatch);
		const openCharts = bindActionCreators(TaskActionCreators.openCharts, dispatch);
		const closeCharts = bindActionCreators(TaskActionCreators.closeCharts, dispatch);
		const updateTask = bindActionCreators(TaskActionCreators.updateTask, dispatch);
		const resumeTask = bindActionCreators(TaskActionCreators.resumeTask, dispatch);

		return (
			<div>
			{ user === null && 
				<Login 
					attemptLogin = {attemptLogin}
					checkLoginStatus = {checkLoginStatus}
					pendingLogin = {this.props.pendingLogin}	/>
			}
			{ user !== null &&
				<Timepiece
					attemptSignOut={attemptSignOut}
					tasks = {this.props.tasks}
					selectedTaskIndex = {this.props.selectedTaskIndex}
					showEditScreen = {this.props.showEditScreen}
					showChartScreen = {this.props.showChartScreen}
					editTaskIndex = {this.props.editTaskIndex}
					lastManualUpdate = {this.props.lastManualUpdate}
					user = {this.props.user}
					addTask = {addTask}
					selectTask = {selectTask}
					finishTask = {finishTask}
					deleteTask = {deleteTask}
					pauseTask = {pauseTask}
					openEdit = {openEdit}
					closeEdit = {closeEdit}
					openCharts = {openCharts}
					closeCharts = {closeCharts}
					updateTask = {updateTask}
					resumeTask = {resumeTask} />
		 }
		 </div>
		)
	}
}

const mapStateToProps = state => (
	{
		tasks: state.tasks,
		selectedTaskIndex: state.selectedTaskIndex,
		showEditScreen: state.showEditScreen,
		showChartScreen: state.showChartScreen,
		editTaskIndex: state.editTaskIndex,
		lastManualUpdate: state.lastManualUpdate,
		user: state.user,
		pendingLogin: state.pendingLogin
	}
);

export default connect(mapStateToProps)(App);