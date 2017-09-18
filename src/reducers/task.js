import * as TaskActionTypes from '../actiontypes/task';
import update from 'immutability-helper';

const initialState = {
	tasks: [{
		task: 'Create CSS for landing page',
		project: 'Acme Landing Page',
		client: 'Acme',
		time: 6100,
		timecreated: new Date().getTime(),
		timefinished: null,
		timeKey: 1
	},
	{
		task: 'Create HTML for landing page',
		project: 'Acme Landing Page',
		client: 'Acme',
		time: 8200,
		timecreated: new Date().getTime(),
		timefinished: null,
		timeKey: 2
	},
	{
		task: 'Mow yard',
		project: 'misc',
		client: 'me',
		time: 2500,
		timecreated: new Date().getTime(),
		timefinished: new Date().getTime(),
		timeKey: 3
	}
	],
	selectedTaskIndex: -1
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
					timecreated: currTimeStamp,
					timefinished: null,
					timeKey: currTimeStamp
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
			finishTask.timefinished = currTimeStamp;
			finishTask.time = action.time
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
			return {
				tasks: deleteTask,
				selectedTaskIndex: -1
			}

		default:
			return state;
	}	
}