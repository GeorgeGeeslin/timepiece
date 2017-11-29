import React from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

const FinishedTask = props => (
	<Grid className='tasks'>
		<Row>		
		<Col sm={12}>
			<p><span className='taskLabel'>TASK: </span>{props.task}</p>
			<p><span className='taskLabel'>PROJECT: </span>{props.project}</p>
			<p><span className='taskLabel'>CLIENT: </span>{props.client}</p>
		</Col>
		<Col className='task-button-container' sm={12}>
			<button 
				className='task-buttons'
				onClick={ () => props.resumeTask(props.taskKey)}>
				RESUME 
			</button>
			<button 
				className='task-buttons'
				onClick={ () => props.deleteTask(props.uid, props.taskKey, props.selectedTaskIndex)}>
				DELETE
			</button>
			<button
				className='task-buttons'
				onClick={ () => props.openEdit(props.taskKey)}>
				EDIT
			</button>
		</Col>
		</Row>
	</Grid>
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