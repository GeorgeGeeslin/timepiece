import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

const ConfirmDelete = props => (
	<Grid>
		<Row style={{height: "106px"}}>
			<Col>
						<p>Delete this task?</p>
						<button className='task-buttons' 
							onClick={ () => props.deleteTask(props.uid, props.confirmDeleteTaskIndex, props.selectedTaskIndex)}>
							DELETE 
						</button>
						<button className='task-buttons' onClick={props.closeConfirmDelete}>
							CANCEL
						</button>
			</Col>
		</Row>
	</Grid>
);

ConfirmDelete.propTypes = {
//	showConfirmDelete: PropTypes.bool.isRequired,
//	closeConfirmDelete: PropTypes.func.isRequired,
//	confirmDeleteTaskIndex: PropTypes.string.isRequired,
//	uid: PropTypes.string.isRequired,
//	selectedTaskIndex: PropTypes.string,
//	deleteTask: PropTypes.func.isRequired
}

export default ConfirmDelete;

