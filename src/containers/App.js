import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TaskActionCreators from '../actions/task';
import UserHeader from '../components/UserHeader';
import Timepiece from './Timepiece';
import Login from '../components/Login';

class App extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired
	};
	
	render() {
		const { dispatch, tasks, selectedTaskIndex, showEditScreen, editTaskIndex, lastManualUpdate, user} = this.props;
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
		const updateTask = bindActionCreators(TaskActionCreators.updateTask, dispatch);
		const resumeTask = bindActionCreators(TaskActionCreators.resumeTask, dispatch);

		return (
			<div>
			{ user === null && 
				<Login 
					attemptLogin = {attemptLogin}
					attemptSignOut = {attemptSignOut}
					checkLoginStatus = {checkLoginStatus}	/>
			}
			{ user !== null && 
				<UserHeader user={this.props.user}
					attemptSignOut={attemptSignOut} />
			}
			{ user !== null &&
				<Timepiece
					tasks = {this.props.tasks}
					selectedTaskIndex = {this.props.selectedTaskIndex}
					showEditScreen = {this.props.showEditScreen}
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
		editTaskIndex: state.editTaskIndex,
		lastManualUpdate: state.lastManualUpdate,
		user: state.user,
	}
);

export default connect(mapStateToProps)(App);