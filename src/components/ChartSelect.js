import React from 'react';
import { PropTypes } from 'prop-types';
import { Modal /*,Grid, Col, Row*/ } from 'react-bootstrap';

const ChartSelect = props => (
	<Modal show={props.showChartScreen} /* className=? */ > 
		<Modal.Header>
			<h2>Charts</h2>
		</Modal.Header>
		<Modal.Body>
			<div>CHARTS GO HERE</div>
		</Modal.Body>
	</Modal>
)

export default ChartSelect;