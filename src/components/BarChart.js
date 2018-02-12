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
		height: this.barChartHeight(this.props.data.labels.length)
	}

	componentDidUpdate(prevProps) {
		if (this.props.data.labels.length !== this.props.data.labels.length) {
			this.setState({height: this.barChartHeight(this.props.data.labels.length)})
		}
	}

/*
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
*/
	barChartHeight(length) {
		return (30 * length) + 100;
	}

	render() {
	
	const chartData = {
		labels: ["Slacking off: 1 task(s)", "Expenditures by category report: 1 task(s)", "Project 3", "Project 4"],
		datasets: [{
			label: "Hours",
			data: [5, 3.6, 3, 2.5],
			backgroundColor: [
			  'rgba(255, 99, 132, 0.2)',
			  'rgba(54, 162, 235, 0.2)',
			  'rgba(255, 206, 86, 0.2)',
			  'rgba(75, 192, 192, 0.2)',
			  'rgba(153, 102, 255, 0.2)',
			  'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
			  'rgba(255,99,132,1)',
			  'rgba(54, 162, 235, 1)',
			  'rgba(255, 206, 86, 1)',
			  'rgba(75, 192, 192, 1)',
			  'rgba(153, 102, 255, 1)',
			  'rgba(255, 159, 64, 1)'
			],
			borderWidth: 1
		}]
	}
//<div style={{height: this.state.height+"px"}}>
////					height={this.state.height}
		return (
			<div style={{height: this.state.height+"px"}}>
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