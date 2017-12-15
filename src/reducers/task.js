import * as TaskActionTypes from '../actiontypes/task';

/*
const initialState = {
	tasks: [
		{
			client:"",
			project:"",
			task: "test 1",
			taskKey: "-Kzpxl3JKeLAU-_A-lwX",
			time: 0,
			timecreated: 1511660130628,
			timefinished: null,
			timeintervals: []
		},
		{
			client: "",
			project: "",
			task: "test 2",
			taskKey: "-KzpxlxsNxXgBDcBpfXs",
			time: 0,
			timecreated: 1511660134313,
			timefinished: null,
			timeintervals: []
		}
	],
	selectedTaskIndex: -1,
	editTaskIndex: -1,
	showEditScreen: false,
	lastManualUpdate: null,
	user: {
		displayName: "George Geeslin",
		photoURL: "https://lh5.googleusercontent.com/-lU84yBpvetk/AAAAAAAAAAI/AAAAAAAACaQ/06os67VOsqY/photo.jpg",
		email: "george.geeslin@gmail.com",
		uid: "E2K4Tb5ffuU4y2or9mSn7nMaNAF3"
	},
}
*/


const initialState = {
	tasks: [],
	selectedTaskIndex: null,
	showEditScreen: false,
	lastManualUpdate: null,
	user: null
}

const currDate = new Date();
const currTimeStamp = currDate.getTime();

export default function Task(state=initialState, action) {
	switch(action.type){
		case TaskActionTypes.SUCCESSFUL_LOGIN: {
			return {
				...state,
				user: action.user,
				tasks: action.tasks
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
				selectedTaskIndex: -1,
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
					selectedTaskIndex: -1
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
				editTaskIndex: -1,
				showEditScreen: false
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