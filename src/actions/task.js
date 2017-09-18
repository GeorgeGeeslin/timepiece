import * as TaskActionTypes from '../actiontypes/task';

export const addTask = (task, project, client, timecreated) => {
	return {
		type: TaskActionTypes.ADD_TASK,
		task,
		project,
		client
	};
}

export const selectTask = (timeKey) => {
	return {
		type: TaskActionTypes.SELECT_TASK,
		timeKey
	};
}

export const finishTask = (time) => {
	return {
		type: TaskActionTypes.FINISH_TASK,
		time
	};
}

export const deleteTask = (timeKey) => {
	return {
		type: TaskActionTypes.DELETE_TASK,
		timeKey
	}
}

