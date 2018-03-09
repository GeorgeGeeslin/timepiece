import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';

export default class BarChart extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		height: PropTypes.number.isRequired
	}

	render() {
		return (
			<div style={{height: this.props.height+"px"}}>
				<h2>{this.props.title}</h2>
				<HorizontalBar
					data={this.props.data}
					height={this.props.height}
					options={{
						title: {
							display: false,
							text: this.props.title
						},
						maintainAspectRatio: false,
						legend: {
							position: "bottom"
						},
						scales: {
							xAxes: [{
								ticks: {
									beginAtZero: true
								},
								gridLines: {
									color: "#1e2f51"
								}
							}],
							yAxes: [{
								barThickness: 20,
								ticks: {
									mirror: true,
									padding: -10
								},
								gridLines: {
									color: "#1e2f51"
								}
							}]
						}
					}}
				/>
			</div>
		)
	}
}