import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';

export default class BarChart extends Component {
	static propTypes = {
//		dataArray: PropTypes.array.isRequired,
//		display: PropTypes.string.isRequired,
//		getHours: PropTypes.func.isRequired,
//		buildColorArray: PropTypes.func.isRequired,
//		buildBorderArray: PropTypes.func.isRequired,
	//	displayHeading: PropTypes.string.isRequired
	//	title: PropTypes.string.isRequired,
		data: PropTypes.object.isRequired

	}

	state = {
		height: 280//this.barChartHeight(this.props.data.labels.length)
	}
/*
	componentDidUpdate(prevProps) {
		if (prevProps.data.labels.length !== this.props.data.labels.length) {
			document.getElementById("barChart").focus();
			this.setState({height: this.barChartHeight(this.props.data.labels.length)})
		}
	}
*/
	barChartHeight(length) {
		return (30 * length) + 100;
	}

	render() {
		const barChart = {
			height: this.state.height+"px",
			transition: "height 1s",
			transitionDelay: "2s"
		};

	
//<div style={{height: this.state.height+"px"}}>
////					height={this.state.height}
		return (
			<div id="barChart" style={{height: this.state.height+"px"}}>
				<HorizontalBar
					data={this.props.data}
					height={this.state.height}
					options={{
						title: {
							display: true,
							text: "this.props.title"
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