import * as TaskActionTypes from '../actiontypes/task';

const initialState = {
	tasks: [],
	selectedTaskIndex: null,
	showEditScreen: false,
	showChartScreen: false,
	showUserMenu: false,
	lastManualUpdate: null,
	user: null,
	pendingLogin: false
}

const currDate = new Date();
const currTimeStamp = currDate.getTime();

export default function Task(state=initialState, action) {
	switch(action.type){
		case TaskActionTypes.PENDING_LOGIN: {
			return {
				...state,
				pendingLogin: true
			}
		}

		case TaskActionTypes.CLEAR_LOGIN: {
			return {
				...state,
				pendingLogin: false
			}
		}

		case TaskActionTypes.SUCCESSFUL_LOGIN: {
			return {
				...state,
				user: action.user,
				tasks: action.tasks,
				pendingLogin: false
			}
		}

		case TaskActionTypes.LOGIN_ERROR: {
			return {
				...state,
				loginError: true,
				loginErrorCode: action.code,
				loginErrorMsg: action.message,
				pendingLogin: false
			}
		}

		case TaskActionTypes.SUCCESSFUL_SIGNOUT: {
			return {
				...state,
				user: null
			}
		}

		case TaskActionTypes.ADD_TASK: {
			const addTaskList = [
				...state.tasks,
				{
					task: action.task,
					project: action.project,
					client: action.client,
					time: 0,
					timecreated: action.timecreated,
					timefinished: null,
					taskKey: action.taskKey,
					timeintervals: []
				}
			]
			return {
				...state,
				selectedTaskIndex: action.taskKey,
				tasks: addTaskList
			}
		}

		case TaskActionTypes.SELECT_TASK: {
			return {
				...state,
				selectedTaskIndex: action.taskKey
			}
		}

		case TaskActionTypes.FINISH_TASK:
			const finishTaskList = Object.assign({}, state);
			const finishTask = finishTaskList.tasks.filter(function(task){
				return task.taskKey === finishTaskList.selectedTaskIndex;
			})[0];
			finishTask.timefinished = action.stopTime
			finishTask.time = action.time
			if (action.startTime !== null) {
				finishTask.timeintervals.push({intervalKey: action.intervalKey, startTime: action.startTime, stopTime: action.stopTime})
			}	
			return {
				...state,
				finishTaskList,
				selectedTaskIndex: null,
			}

		case TaskActionTypes.DELETE_TASK:
			const deleteTaskList = Object.assign({}, state);
			const deleteTask = deleteTaskList.tasks.filter(function(task){
				return task.taskKey !== action.taskKey
			})
			if (action.taskKey === action.selectedTaskIndex) {
				return {
					...state,
					tasks: deleteTask,
					selectedTaskIndex: null
				}
			} else {
				return {
					...state,
					tasks: deleteTask,
					selectedTaskIndex: action.selectedTaskIndex
				}
			}

		case TaskActionTypes.PAUSE_TASK:
			const pauseTaskList =  Object.assign({}, state);
			const pauseTask = pauseTaskList.tasks.filter(function(task){
				return task.taskKey === pauseTaskList.selectedTaskIndex;
			})[0];
			pauseTask.time = action.time
			pauseTask.timeintervals.push({intervalKey: action.intervalKey, startTime: action.startTime, stopTime: action.stopTime})
			return {
				...state,
				tasks: [...pauseTaskList.tasks]
			}

		case TaskActionTypes.OPEN_EDIT:
			return {
				...state,
				editTaskIndex: action.taskKey,
				showEditScreen: true
			}

		case TaskActionTypes.CLOSE_EDIT:
			return {
				...state,
				editTaskIndex: null,
				showEditScreen: false
			}

		case TaskActionTypes.OPEN_CHARTS:
			return {
				...state,
				showChartScreen: true
			}

		case TaskActionTypes.CLOSE_CHARTS:
			return {
				...state,
				showChartScreen: false
				}

		case TaskActionTypes.OPEN_USER_MENU:
			return {
				...state,
				showUserMenu: true
			}

		case TaskActionTypes.CLOSE_USER_MENU:
			return {
				...state,
				showUserMenu: false
			}

		case TaskActionTypes.UPDATE_TASK:
			const updateTaskList = Object.assign({}, state);
			const updateTask = updateTaskList.tasks.filter(function(task){
				return task.taskKey === action.editTaskIndex;
			})[0];
			updateTask.task = action.task
			updateTask.project = action.project
			updateTask.client = action.client
			updateTask.time = action.time
			updateTask.timeintervals = action.timeintervals
			return {
				...state,
				selectedTaskIndex: action.editTaskIndex,
				lastManualUpdate: action.editTaskIndex + ": " + new Date().getTime(),
				updateTaskList			
			}

			case TaskActionTypes.RESUME_TASK:
				const resumeTaskList = Object.assign({}, state);
				const resumeTask = resumeTaskList.tasks.filter(function(task){
					return task.taskKey === action.taskKey;
				})[0];
				resumeTask.timefinished = null;
				return {
					...state,
					selectedTaskIndex: action.taskKey,
					resumeTaskList
				}

		default:
			return state;
	}	
}