import * as TaskActionTypes from '../actiontypes/task';
import {database, auth, googleProvider} from '../firebase';

export function checkLoginStatus() {
	return dispatch => {
		dispatch(pendingLogin());
		auth.getRedirectResult().then((result) => {
			auth.onAuthStateChanged((user) => {
				if (user) {
					dispatch(getUserData(user));
				} else {
					dispatch(clearLogin());
				}
			})
		}).catch((error) => {
			//If a user uses a gmail address with the facebook provider, later logs in with the same email address
			//on using gmail provider, subsequent attempts on the facebook provider will fail due to firebase considering
			//the google provider to be the authoritative provider for gmail addresses. 
			//The code in this catch block will reattempt login using the existing google provider info.
			auth.fetchProvidersForEmail(error.email).then((result) => {
				const authProvider = result[0];
				if (authProvider === 'google.com') {
					googleProvider.setCustomParameters({login_hint: error.email});
					auth.signInWithRedirect(googleProvider).then((result) => {
						// successfull login here will cause a page load due to redirect and 
						//this function will be called again, triggering getRedirectResult() 
					}).catch((error) => {
						console.error(error)
						dispatch(clearLogin());
					})
				}
			}).catch((error) => {
				console.error(error)
				dispatch(clearLogin());
			})
		})
	}
}

function getUserData(user) {
	return dispatch => {
		var tasks = [];
		const uid = user.uid;
		database.ref(uid+'/tasks').once('value')
		.then((snapshot) => {
			if (snapshot.val() === null) {
			} else {
				const val = snapshot.val();
				const taskKeys = Object.keys(val);
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
					} else {
						tasks[i].timeintervals = [];
					}
				}			
			}
			dispatch(successfulLogin(user, tasks));
		}).catch((error) => {
			console.error(error)
		})
	}
}

export function attemptLogin(provider) {
	return dispatch => {
		dispatch(pendingLogin())
		//results of signInWithRedirect are returned by getRedirectResult()
		//which is called by checkLoginStatus() (called from within Login.js) when the page reloads after redirect.
		auth.signInWithRedirect(provider).then((result) => {

		}).catch((error) => {
			console.error(error)
			dispatch(loginError(error.code, error.message));
		})
	}
}

export const loginError = (code, message) => {
	return {
		type: TaskActionTypes.LOGIN_ERROR,
		code,
		message
	}
}

export const pendingLogin = () => {
	return {
		type: TaskActionTypes.PENDING_LOGIN
	}
}

export const clearLogin = () => {
	return {
		type: TaskActionTypes.CLEAR_LOGIN
	}
}

export const successfulLogin = (user, tasks) => {
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
	let timecreated = new Date().getTime();
	return dispatch => {
		const taskRef = database.ref(uid+'/tasks');
		taskRef.push({
			task: task,
			project: project,
			client: client,
			timecreated: timecreated,
			time: 0
		})
		.then((snapshot) => {
			const taskKey = snapshot.key
			dispatch(addTaskLocal(task, project, client, timecreated, taskKey));
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

export const openConfirmDelete = (taskKey) => {
	return {
		type: TaskActionTypes.OPEN_CONFIRM_DELETE,
		taskKey
	}
}

export const closeConfirmDelete = (taskKey) => {
	return {
		type: TaskActionTypes.CLOSE_CONFIRM_DELETE
	}
}

export const openCharts = () => {
	return {
		type: TaskActionTypes.OPEN_CHARTS
	}
}

export const closeCharts = () => {
	return {
		type: TaskActionTypes.CLOSE_CHARTS
	}
}

export const openUserMenu = () => {
	return {
		type: TaskActionTypes.OPEN_USER_MENU
	}
}

export const closeUserMenu = () => {
	return {
		type: TaskActionTypes.CLOSE_USER_MENU
	}
}

export function updateTask(uid, task, project, client, time, timecreated, timefinished, timeintervals, editTaskIndex) {
	return dispatch => {
		const taskRef = database.ref(uid+'/tasks/'+editTaskIndex);
		const intervalRef = database.ref(uid+'/tasks/'+editTaskIndex+'/timeintervals');
		if (timeintervals.length > 0) {
			var intervals = {}
			var newIntervals = [];
			for (let i = 0; i < timeintervals.length; i++) {
				if (timeintervals[i].hasOwnProperty('intervalKey')) {
					let obj = {startTime: timeintervals[i].startTime, stopTime: timeintervals[i].stopTime}
					let key = timeintervals[i].intervalKey;
					intervals[key] = obj;
				} else {
					newIntervals.push(timeintervals[i]);
				}
			}
			taskRef.set({
				task: task,
				project: project,
				client: client,
				time: time,
				timecreated: timecreated,
				timefinished: timefinished,
				timeintervals: intervals
			})
			.then(
				newIntervals.forEach(function(interval){
					intervalRef.push(interval)
				})
			)
		} else {
			taskRef.set({
				task: task,
				project: project,
				client: client,
				time: time,
				timecreated: timecreated,
				timefinished: timefinished		
			})
		}
		dispatch(updateTaskLocal(task, project, client, time, timeintervals, editTaskIndex));
	}
}

export const updateTaskLocal = (task, project, client, time, timeintervals, editTaskIndex) => {
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

export function resumeTask(uid, taskKey) {
	return dispatch => {
		const taskRef = database.ref(uid+'/tasks/'+taskKey);
		taskRef.update({timefinished: null})
		.then(() => {
			dispatch(resumeTaskLocal(taskKey));
		})
	}
}

export const resumeTaskLocal = (taskKey) => {
	return {
		type: TaskActionTypes.RESUME_TASK,
		taskKey
	}
}