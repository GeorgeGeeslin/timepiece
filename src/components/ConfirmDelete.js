import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Grid, Col, Row } from 'react-bootstrap';

const ConfirmDelete = props => (
	<Grid>
		<Row>
			<Col>
				<Modal show={props.showConfirmDelete} className='edit-modal'>
					<Modal.Header >
						<p>Delete this task?</p>
					</Modal.Header> 
					<Modal.Footer>
						<button className='task-buttons' 
							onClick={ () => props.deleteTask(props.uid, props.confirmDeleteTaskIndex, props.selectedTaskIndex)}>
							DELETE 
						</button>
						<button className='task-buttons' onClick={props.closeConfirmDelete}>
							CANCEL
						</button>
					</Modal.Footer>
				</Modal>
			</Col>
		</Row>
	</Grid>
);

ConfirmDelete.propTypes = {
	showConfirmDelete: PropTypes.bool.isRequired,
	closeConfirmDelete: PropTypes.func.isRequired,
	confirmDeleteTaskIndex: PropTypes.string.isRequired,
	uid: PropTypes.string.isRequired,
	selectedTaskIndex: PropTypes.string,
	deleteTask: PropTypes.func.isRequired
}

export default ConfirmDelete;

