import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Bar, HorizontalBar } from 'react-chartjs-2';

export default class BarChart extends Component {
	static propTypes = {
		dataArray: PropTypes.array.isRequired,
		display: PropTypes.string.isRequired,
		getHours: PropTypes.func.isRequired,
		buildColorArray: PropTypes.func.isRequired,
		buildBorderArray: PropTypes.func.isRequired,
		displayHeading: PropTypes.string.isRequired
	}

	state = {
		height: this.barChartHeight(this.props.dataArray.length)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.dataArray.length !== this.props.dataArray.length) {
			this.setState({height: this.barChartHeight(this.props.dataArray.length)})
		}
	}

	barChartData = (dataArray) => {
		let labels = [];
		if (dataArray[0].hasOwnProperty("display")) {
			labels = dataArray.map((item) => {
				let taskDisplay = item.display;
				let taskCount = item.taskCount;
				let taskLabel = taskDisplay + ": " + taskCount + " task(s)"; 
				return taskLabel;
			});
		} else {
			labels = dataArray.map((item) => (
				item.task
			));
		}
		const data = dataArray.map((item) => (
			this.props.getHours(item.time)
		));
		const color = this.props.buildColorArray(labels.length)	
		const border = this.props.buildBorderArray(labels.length)

		const chartData = {
			labels: labels,
			datasets: [{
				label: "Hours",
				data: data,
				backgroundColor: color,
				borderColor: border,
				borderWidth: 1
			}]
		}
		return chartData;
	}

	barChartHeight(length) {
		return (30 * length) + 100;
	}

	render() {
		return (
			<div style={{height: this.state.height+"px"}}>
				<HorizontalBar
					data={this.barChartData(this.props.dataArray)}
					height={this.state.height}
					options={{
						title: {
							display: true,
							text: "Hours per " + this.props.displayHeading
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