import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Bar, HorizontalBar } from 'react-chartjs-2';

export default class BarChart extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	}

	render() {		
		return (
			<div>
				<HorizontalBar
					data={this.props.data}
					width={100}
					height={this.props.height}
					options={{
						maintainAspectRatio: false,
						legend: {
							position: "bottom"
						},
						scales: {
							xAxes: [{
								ticks: {
									beginAtZero: true
								}
							}],
							yAxes: [{
								ticks: {
									mirror: true
								}
							}]
						}
					}}
				/>
			</div>
		)
	}
}