import React from 'react';
import { PropTypes } from 'prop-types';

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
				</ul>
			</div>
		)
	} 
	else {
		return null;
	}
};

ActiveTask.propTypes = {
	selectedTask: PropTypes.object
}

export default ActiveTask;