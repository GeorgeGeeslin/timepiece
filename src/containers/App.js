import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TaskActionCreators from '../actions/task';
import Timepiece from './Timepiece';
import Login from '../components/Login';
import UserHeader from '../components/UserHeader';
import ChartContainer from './ChartContainer';

class App extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired,
		showEditScreen: PropTypes.bool.isRequired,
		showChartScreen: PropTypes.bool.isRequired,
		showUserMenu: PropTypes.bool.isRequired,
		dispatch: PropTypes.func.isRequired,
		user: PropTypes.object,
		selectedTaskIndex: PropTypes.string,
		lastManualUpdate: PropTypes.string,
		showConfirmDelete: PropTypes.bool.isRequired
	};
	
	render() {
		const { dispatch, tasks, selectedTaskIndex, editTaskIndex, lastManualUpdate, user, showEditScreen, showChartScreen, showUserMenu, showConfirmDelete, confirmDeleteTaskIndex} = this.props;
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
		const openUserMenu = bindActionCreators(TaskActionCreators.openUserMenu, dispatch);
		const closeUserMenu = bindActionCreators(TaskActionCreators.closeUserMenu, dispatch);
		const updateTask = bindActionCreators(TaskActionCreators.updateTask, dispatch);
		const resumeTask = bindActionCreators(TaskActionCreators.resumeTask, dispatch);
		const openConfirmDelete = bindActionCreators(TaskActionCreators.openConfirmDelete, dispatch);
		const closeConfirmDelete = bindActionCreators(TaskActionCreators.closeConfirmDelete, dispatch);

		return (
			<div>
			{ user === null && 
				<Login 
					attemptLogin = {attemptLogin}
					checkLoginStatus = {checkLoginStatus}
					pendingLogin = {this.props.pendingLogin}	
					loginError = {this.props.loginError}
					loginErrorCode = {this.props.loginErrorCode}
					loginErrorMsg = {this.props.loginErrorMsg}
				/>
			}
			{ user !== null &&
				<div>
					<UserHeader user={this.props.user}
						attemptSignOut={attemptSignOut}
						openCharts={openCharts} 
						openUserMenu={openUserMenu}
						closeUserMenu={closeUserMenu}
						showUserMenu={this.props.showUserMenu}
						showChartScreen={this.props.showChartScreen}
						closeCharts={closeCharts}
					/>
					{ showChartScreen == false &&
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
							closeUserMenu = {closeUserMenu}
							updateTask = {updateTask}
							resumeTask = {resumeTask}
							openConfirmDelete = {openConfirmDelete}
							closeConfirmDelete = {closeConfirmDelete} 
							showConfirmDelete = {showConfirmDelete}
							confirmDeleteTaskIndex = {confirmDeleteTaskIndex}
						/>
					}
					{ showChartScreen === true &&
						<ChartContainer 
							tasks={this.props.tasks}
							closeUserMenu={closeUserMenu}
						/>
					}
				</div>
		 }
		 </div>
		)
	}
}

const mapStateToProps = state => (
	{
		tasks: state.tasks,
		selectedTaskIndex: state.selectedTaskIndex,
		editTaskIndex: state.editTaskIndex,
		lastManualUpdate: state.lastManualUpdate,
		user: state.user,
		pendingLogin: state.pendingLogin,
		showEditScreen: state.showEditScreen,
		showChartScreen: state.showChartScreen,
		showUserMenu: state.showUserMenu,
		loginError: state.loginError,
		loginErrorCode: state.loginErrorCode,
		loginErrorMsg: state.loginErrorMsg,
		showConfirmDelete: state.showConfirmDelete,
		confirmDeleteTaskIndex: state.confirmDeleteTaskIndex
	}
);

export default connect(mapStateToProps)(App);