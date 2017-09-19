import React from 'react';
import { PropTypes } from 'prop-types';

//TODO put this function in one place to share across modules.
const formatTime = (sec) =>
	Math.floor(sec / 3600) % 60 + 
		':' + 
		('0' + Math.floor(sec / 60) % 60).slice(-2) + 
		':' + 
		('0' + sec % 60).slice(-2)


const ActiveTask = ({ selectedTask }) => {
	if(selectedTask) {
		return(
			<div>
				<ul>
					<li>
						<span>Task: </span>
						{selectedTask.task}
					</li>
					<li>
						<span>Project: </span>
						{selectedTask.project}
					</li>
					<li>{formatTime(selectedTask.time)}</li>
				</ul>
			</div>
		)
	} 
	else {
		return(<p>No Active Task</p>)
	}
};

ActiveTask.propTypes = {
	selectedTask: PropTypes.shape({
		client: PropTypes.string.isRequired,
		project: PropTypes.string.isRequired,
		task: PropTypes.string.isRequired,
		time: PropTypes.number.isRequired,
		timeKey: PropTypes.number.isRequired,
		timecreated: PropTypes.number.isRequired,
		timefinished: PropTypes.number
	})
}

export default ActiveTask;