import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Modal } from 'react-bootstrap';

export default class EditTask extends Component {

	render() {
		return (
			<Modal show={this.props.showEditScreen} className='edit-modal'>
				<Modal.Header closeButton>
					<Modal.Title>Edit Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h1>Testing This thing out</h1>
					<p>There should be words here. Hopefully you're reading words now.</p>
				</Modal.Body>
				<Modal.Footer>
					<button onClick={this.props.closeEdit}>Close</button>
				</Modal.Footer>
			</Modal> 
		)
	}
}