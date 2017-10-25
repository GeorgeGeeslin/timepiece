import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

export default class Summary extends Component {

	render() {
		return (
			<div>
				<h2>Summary Stats</h2>
				<Grid className='tasks'>
					<Row>
						<Col sm={12} md={6}>
							<p><span className='taskLabel'>OPEN TASKS: </span>100</p>
							<p><span className='taskLabel'>OPEN PROJECTS: </span>100</p>
							<p><span className='taskLabel'>OPEN CLIENTS: </span>100</p>
						</Col>
						<Col sm={12} md={6}>
							<p><span className='taskLabel'>FINISHED TASKS: </span>100</p>
							<p><span className='taskLabel'>TOTAL PROJECTS: </span>100</p>
							<p><span className='taskLabel'>TOTAL CLIENTS: </span>100</p>
						</Col>
					</Row>
					<p><span className='taskLabel'>TIME THIS WEEK: </span>100</p>
					<p><span className='taskLabel'>TIME THIS MONTH: </span>100</p>
					<p><span className='taskLabel'>TOTAL TIME SPENT: </span>100</p>
					<div className='task-button-container'>
						<button className='task-buttons'>Charts and Time Sheets</button>
					</div>
				</Grid>
			</div>
		)
	}
}