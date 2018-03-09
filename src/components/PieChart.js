import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Pie } from 'react-chartjs-2';

export default class PieChart extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
	}

	render() {
		return (
			<div style={{paddingTop: "50px"}}>
				<h2>{this.props.title}</h2>
				<Pie
					data={this.props.data}
					height={150}
					options={{
						title: {
							display: false,
							text: "Pie Chart Title"
						},
						legend: {
							position: "bottom"
						}
					}}
				/>
			</div>
		)
	}
}

