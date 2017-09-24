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
			<div className="activeTask">
				<span className="taskLabel">Working On:</span>
				<ul>
					<li>
						<span className="taskLabel">TASK: </span>
						{selectedTask.task}
					</li>
					<li>
						<span className="taskLabel">PROJECT: </span>
						{selectedTask.project}
					</li>
					<li>{formatTime(selectedTask.time)}</li>
				</ul>
			</div>
		)
	} 
	else {
		return(<div className="activeTask"><p>No Task Selected</p></div>)
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