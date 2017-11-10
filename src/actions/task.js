import * as TaskActionTypes from '../actiontypes/task';
import {database, provider, auth} from '../firebase';



export function addTask(task, project, client) {
	return dispatch => {
		//dispatch()
		const taskRef = database.ref('/tasks');
		taskRef.push({
			task: task,
			project: project,
			client: client,
			timecreated: new Date().getTime()
		})
		.then(() => {
			dispatch(addTaskLocal(task, project, client));
		});
	}
}


export const addTaskLocal = (task, project, client) => {
return {
		type: TaskActionTypes.ADD_TASK,
		task,
		project,
		client
	};
}

/*export const addSection = (name) => {
  let key = database.ref('/').push().key
  let model = sectionModel(key, name, firebase.database.ServerValue.TIMESTAMP)
  return database.ref('/'+ key).set(model)
}*/

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

export const pauseTask = (time, startTime, stopTime, selectedTaskIndex) => {
	return {
		type: TaskActionTypes.PAUSE_TASK,
		time,
		startTime,
		stopTime,
		selectedTaskIndex
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

export const updateTask = (task, project, client, time, timeintervals, editTaskIndex) => {
	return {
		type: TaskActionTypes.UPDATE_TASK,
		task,
		project,
		client,
		time,
		timeintervals,
		editTaskIndex
	}
}

export const resumeTask = (timeKey) => {
	return {
		type: TaskActionTypes.RESUME_TASK,
		timeKey
	}
}