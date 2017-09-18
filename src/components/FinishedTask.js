import React from 'react';
import { PropTypes } from 'prop-types';


//onClick={() => props.selectTask(props.timeKey)}>	
const FinishedTask = props => (
	<div className='currentTask'>		

		<div>
			<h3>{props.task}</h3>
			<h3>{props.project}</h3>
		</div>
		<div>
			<button onClick={ () => props.selectTask(props.timeKey)}>Select Task</button>
			<button onClick={ () => props.deleteTask(props.timeKey)}>Delete Task</button>
		</div>
		<hr/>
	</div>
);

/*   PROPTPYES ARE LIKELY TO CHANGE AS THIS COMPONENT IS DEVELOPED FURTHER
FinishedTask.propTypes = {
	selectTask: PropTypes.func.isRequired,
	client: PropTypes.string.isRequired,
	project: PropTypes.string.isRequired,
	task: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	timeKey: PropTypes.number.isRequired
};
*/
export default FinishedTask;