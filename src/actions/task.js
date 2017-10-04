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

export const finishTask = (time, startTime, stopTime) => {
	return {
		type: TaskActionTypes.FINISH_TASK,
		time,
		startTime,
		stopTime
	};
}

export const deleteTask = (timeKey, selectedTaskIndex) => {
	return {
		type: TaskActionTypes.DELETE_TASK,
		timeKey,
		selectedTaskIndex
	}
}

export const pauseTask = (time, startTime, stopTime) => {
	return {
		type: TaskActionTypes.PAUSE_TASK,
		time,
		startTime,
		stopTime
	}
}

export const openEdit = (timeKey) => {
	return {
		type: TaskActionTypes.OPEN_EDIT,
		timeKey
	}
}

export const closeEdit = () => {
	return {
		type: TaskActionTypes.CLOSE_EDIT
	}
}