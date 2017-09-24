import React from 'react';
import { PropTypes } from 'prop-types';

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