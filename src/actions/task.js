import * as TaskActionTypes from '../actiontypes/task';
import {database, auth} from '../firebase';

export function attemptLogin(provider) {
	return dispatch => {
		auth.signInWithPopup(provider)
		.then((result) => {
			const token = result.credential.accessToken;
			const user = result.user;
				const uid = user.uid
				database.ref(uid+'/tasks').once('value')
				.then((snapshot) => {
					if (snapshot.val() === null ) {
						var tasks = [];
					} else {
						const val = snapshot.val();		
						const taskKeys = Object.keys(val);
						var tasks = [];	
						for (let i = 0; i < taskKeys.length; i++) {
							tasks.push(val[taskKeys[i]]);
							tasks[i].taskKey = taskKeys[i];
							if (tasks[i].hasOwnProperty('timeintervals')) {
								let intervalKeys = Object.keys(tasks[i]['timeintervals'])
								let timeintervals = [];
								for (let j = 0; j < intervalKeys.length; j++) {
									timeintervals.push(val[taskKeys[i]]['timeintervals'][intervalKeys[j]]);
									timeintervals[j].intervalKey = intervalKeys[j];
								}
								tasks[i].timeintervals = timeintervals;
							}
						}
					}
					dispatch(successfulLogin(user, tasks));
				})
				.catch((error) => {
					console.error(error)
				})
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = error.credential;
			console.error(errorMessage);
		});
	}
}

export const successfulLogin = (user, tasks) => {
	//console.log('inside successfulLogin action: ' + tasks)
	return {
		type: TaskActionTypes.SUCCESSFUL_LOGIN,
		user,
		tasks
	};
}

export function attemptSignOut() {
	return dispatch => {
		auth.signOut().then(function(){
			const user = null;
			dispatch(seccessfullSignOut());
		}).catch(function(error) {
			const errorMessage = error;
		})
	}
}

export const seccessfullSignOut = () => {
	return {
		type: TaskActionTypes.SUCCESSFUL_SIGNOUT
	}
}

export function addTask(task, project, client, uid) {
	let time = new Date().getTime();
	return dispatch => {
		const taskRef = database.ref(uid+'/tasks');
		taskRef.push({
			task: task,
			project: project,
			client: client,
			timecreated: time
		})
		.then((snapshot) => {
			const taskKey = snapshot.key
			dispatch(addTaskLocal(task, project, client, time, taskKey));
		}); /*TODO add Catch */
	}
}

export const addTaskLocal = (task, project, client, timecreated, taskKey) => {
return {
		type: TaskActionTypes.ADD_TASK,
		task,
		project,
		client,
		timecreated,
		taskKey
	};
}

export const selectTask = (taskKey) => {
	return {
		type: TaskActionTypes.SELECT_TASK,
		taskKey
	};
}

export function finishTask(time, startTime, stopTime, uid, taskKey) {
	return dispatch => {
		const taskRef = database.ref(uid+'/tasks/'+taskKey);
		const intervalRef = database.ref(uid+'/tasks/'+taskKey+'/timeintervals')
			taskRef.update({timefinished: stopTime})
			.then( () => {
				if (startTime !== null) {
					intervalRef.push(
						{
							startTime: startTime,
							stopTime: stopTime
						}
					).then((snapshot) => {
						const intervalKey = snapshot.key;
						dispatch(finishTaskLocal(time, startTime, stopTime, intervalKey));
					})
				} else {
					dispatch(finishTaskLocal(time, startTime, stopTime));
				}
			})
	}
}

export const finishTaskLocal = (time, startTime, stopTime, intervalKey) => {
	return {
		type: TaskActionTypes.FINISH_TASK,
		time,
		startTime,
		stopTime,
		intervalKey
	};
}

export function deleteTask(uid, taskKey, selectedTaskIndex) {
	return dispatch => {
		const taskRef = database.ref(uid+'/tasks/'+taskKey);
		taskRef.remove().then(() => {
			dispatch(deleteTaskLocal(taskKey, selectedTaskIndex));
		})
	}
}

export const deleteTaskLocal = (taskKey, selectedTaskIndex) => {
	return {
		type: TaskActionTypes.DELETE_TASK,
		taskKey,
		selectedTaskIndex
	}
}

export function pauseTask(time, startTime, stopTime, selectedTaskIndex, uid, taskKey) {
	return dispatch => {
		const timeRef = database.ref(uid+'/tasks/'+taskKey);
		const intervalRef = database.ref(uid+'/tasks/'+taskKey+'/timeintervals')
		timeRef.update({time: time})
		.then(intervalRef.push(
			{
				startTime: startTime,
				stopTime: stopTime
			}
		)
		.then((snapshot) => {
			const intervalKey = snapshot.key;
			dispatch(pauseTaskLocal(time, startTime, stopTime, selectedTaskIndex, intervalKey));
			})); /*TODO add Catch*/
	}
}

export const pauseTaskLocal = (time, startTime, stopTime, selectedTaskIndex, intervalKey) => {
	return {
		type: TaskActionTypes.PAUSE_TASK,
		time,
		startTime,
		stopTime,
		selectedTaskIndex,
		intervalKey
	}
}

export const openEdit = (taskKey) => {
	return {
		type: TaskActionTypes.OPEN_EDIT,
		taskKey
	}
}

export const closeEdit = () => {
	return {
		type: TaskActionTypes.CLOSE_EDIT
	}
}

//export function updateTask = (task, project, client, time, timeintervals, editTaskIndex)

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

export const resumeTask = (taskKey) => {
	return {
		type: TaskActionTypes.RESUME_TASK,
		taskKey
	}
}