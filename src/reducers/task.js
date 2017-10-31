import * as TaskActionTypes from '../actiontypes/task';
import update from 'immutability-helper';

/*const initialState = {
	tasks: [{
		task: 'Create CSS for landing page',
		project: 'Acme Landing Page',
		client: 'Acme',
		time: 6100,
		timecreated: new Date().getTime(),
		timefinished: null,
		timeKey: 1,
		timeintervals: [
			{
				startTime: 1483990440000,
				stopTime: new Date().getTime() - 15000,
			},
			{
				startTime: new Date().getTime() - 10000,
				stopTime: new Date().getTime() - 8000
			}
		]
	},
	{
		task: 'Create HTML for landing page',
		project: 'Acme Landing Page',
		client: 'Acme',
		time: 8200,
		timecreated: new Date().getTime(),
		timefinished: null,
		timeKey: 2,
		timeintervals: []
	},
	{
		task: 'Mow yard',
		project: 'misc',
		client: 'me',
		time: 2500,
		timecreated: new Date().getTime(),
		timefinished: new Date().getTime(),
		timeKey: 3,
		timeintervals: [
			{
				startTime: new Date().getTime() - 5000,
				stopTime: new Date().getTime() - 3000
			}
		]
	}],
	selectedTaskIndex: -1,
	showEditScreen: false,
	editTaskIndex: -1,
	lastManualUpdate: null
} */


const initialState = {
	tasks: [{
		task: "test",
		project: "",
		client: "",
		time: 0,
		timecreated: new Date().getTime(),
		timefinished: null,
		timeKey: 1,
		timeintervals: []
	}],
	selectedTaskIndex: -1,
	editTaskIndex: -1,
	showEditScreen: false,
	lastManualUpdate: null
}

const currDate = new Date();
const currTimeStamp = currDate.getTime();

export default function Task(state=initialState, action) {
	switch(action.type){
		case TaskActionTypes.ADD_TASK: {
			const addTaskList = [
				...state.tasks,
				{
					task: action.task,
					project: action.project,
					client: action.client,
					time: 0,
					timecreated: new Date().getTime(),
					timefinished: null,
					timeKey: new Date().getTime(),
					timeintervals: []
				}
			]
			return {
				...state,
				selectedTaskIndex: addTaskList.sort(function(a,b){return b.timeKey - a.timeKey})[0].timeKey,
				tasks: addTaskList
			}
		}
		case TaskActionTypes.SELECT_TASK:
			return {
				...state,
				selectedTaskIndex :action.timeKey
			}

		case TaskActionTypes.FINISH_TASK:
			const finishTaskList = Object.assign({}, state);
			const finishTask = finishTaskList.tasks.filter(function(task){
				return task.timeKey === finishTaskList.selectedTaskIndex;
			})[0];
			finishTask.timefinished = new Date().getTime(),
			finishTask.time = action.time
			finishTask.timeintervals.push({startTime: action.startTime, stopTime: action.stopTime})
			return {
				...state,
				finishTaskList,
				selectedTaskIndex: -1,
			}

		case TaskActionTypes.DELETE_TASK:
			const deleteTaskList = Object.assign({}, state);
			const deleteTask = deleteTaskList.tasks.filter(function(task){
				return task.timeKey !== action.timeKey
			})
			if (action.timeKey === action.selectedTaskIndex) {
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
				return task.timeKey === pauseTaskList.selectedTaskIndex;
			})[0];
			pauseTask.time = action.time
			pauseTask.timeintervals.push({startTime: action.startTime, stopTime: action.stopTime})
			return {
				...state,
				tasks: [...pauseTaskList.tasks]
			}

		case TaskActionTypes.OPEN_EDIT:
			return {
				...state,
				editTaskIndex: action.timeKey,
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
				return task.timeKey === action.editTaskIndex;
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
					return task.timeKey === action.timeKey;
				})[0];
				resumeTask.timefinished = null;
				return {
					...state,
					selectedTaskIndex: action.timeKey,
					resumeTaskList
				}

		default:
			return state;
	}	
}