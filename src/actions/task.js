import * as TaskActionTypes from '../actiontypes/task';
import {database, auth} from '../firebase';

export function attemptLogin(provider) {
	return dispatch => {
		auth.signInWithPopup(provider).then(function(result){
			const token = result.credential.accessToken;
			const user = result.user;
			console.log(user.displayName)
			dispatch(successfulLogin(user));
		}).catch(function(error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = error.credential;
		});
	}
}

export const successfulLogin = (user) => {
	return {
		type: TaskActionTypes.SUCCESSFUL_LOGIN,
		user
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

/*export const addSection = (name) => {
  let key = database.ref('/').push().key
  let model = sectionModel(key, name, firebase.database.ServerValue.TIMESTAMP)
  return database.ref('/'+ key).set(model)
}*/

export const selectTask = (taskKey) => {
	return {
		type: TaskActionTypes.SELECT_TASK,
		taskKey
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

export const deleteTask = (taskKey, selectedTaskIndex) => {
	return {
		type: TaskActionTypes.DELETE_TASK,
		taskKey,
		selectedTaskIndex
	}
}

//set time property 
//push startTime and StopTime properties to array 
//
export function pauseTask(time, startTime, stopTime, selectedTaskIndex, uid, taskKey) {
	return dispatch => {
		const timeRef = database.ref(uid+'/'+taskKey);
		const intervalRef = database.ref(uid+'/'+taskKey+'/timeintervals')
		taskRef.set({time: time})
		.then(intervalRef.push(
			{
				startTime: startTime,
				stopTime: stopTime
			}
		))
			.then(() => {
				dispatch(pauseTaskLocal(time, startTime, stopTime, selectedTaskIndex));
			}); /*TODO add Catch*/
	}
}

export const pauseTaskLocal = (time, startTime, stopTime, selectedTaskIndex) => {
	return {
		type: TaskActionTypes.PAUSE_TASK,
		time,
		startTime,
		stopTime,
		selectedTaskIndex
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