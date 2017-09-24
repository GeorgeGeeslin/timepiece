import React from 'react';
import { PropTypes } from 'prop-types';

//onClick={() => props.selectTask(props.timeKey)}>
const CurrentTask = props => (
	<div className='currentTask'>
		
		<div>
			<p>{props.task}</p>
			<p>{props.project}</p>
		</div>
		<div>
			<button onClick={ () => props.selectTask(props.timeKey)}>Select Task</button>
			<button onClick={ () => props.deleteTask(props.timeKey)}>Delete Task</button>
		</div>
		<hr/>
	</div>
);


/*   PROPTPYES ARE LIKELY TO CHANGE AS THIS COMPONENT IS DEVELOPED FURTHER
CurrentTask.propTypes = {
	selectTask: PropTypes.func.isRequired,
	client: PropTypes.string.isRequired,
	project: PropTypes.string.isRequired,
	task: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	timeKey: PropTypes.number.isRequired
};
*/

export default CurrentTask;