import React from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

const CurrentTask = props => (
	<Grid className='tasks'>
		<Row style={{marginLeft: '0px'}}>
			<Row style={{width: '100%'}}>
				<Col xs={12} sm={9}>
					<p><span className='taskLabel'>TASK: </span>{props.task}</p>
					<p><span className='taskLabel'>PROJECT: </span>{props.project}</p>
					<p><span className='taskLabel'>CLIENT: </span>{props.client}</p>
				</Col>
				<Col xs={12} sm={3} className='timeLabelContainer'>
					<p className='timeLabel'>{props.formatTime(props.secondsElapsed)}</p>
				</Col>
			</Row>
			<Col className='task-button-container' sm={12}>
				<button
					className='task-buttons' 
					onClick={() => props.selectTask(props.taskKey)}>
					SELECT
				</button>
				<button
					className='task-buttons'
					onClick={ () => props.openConfirmDelete(props.taskKey)}>
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

CurrentTask.propTypes = {
	selectTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired,
	openEdit: PropTypes.func.isRequired,
	client: PropTypes.string.isRequired,
	project: PropTypes.string.isRequired,
	task: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	taskKey: PropTypes.string.isRequired,
	uid: PropTypes.string.isRequired,
	formatTime: PropTypes.func.isRequired,
	secondsElapsed: PropTypes.number.isRequired,
	openConfirmDelete: PropTypes.func.isRequired
};

export default CurrentTask;