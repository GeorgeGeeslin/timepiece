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

	barChartData = (dataArray) => {
		if (dataArray.length > 0 ) {
			let labels = [];
			if (dataArray[0].hasOwnProperty("display")) {
				labels = dataArray.map((item) => (
					item.display
				));
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
		} else {
			return {
				labels: ["No time recorded in the provided date range."],
				datasets : [{
					label: "Hours",
					data: [100],
					borderWidth: 1,
				}]
			}
		}
	}

	barChartHeight(length) {
		if (length === 0) {
			return 250;
		}	else if (length > 0 && length <= 5 ) {
			return	100 * length;
		} else if (length > 5 && length <= 10) {
			return	50 * length;
		} else {
			return 30 * length;
		}
	}

	render() {	

//	console.log(document.getElementById("barChart").offsetWidth)	
		return (
			<div id="barChart">
				{ this.props.dataArray.length > 0 && 
					<HorizontalBar
						className="barChart"
						data={this.barChartData(this.props.dataArray)}
						width={100}
						height={this.barChartHeight(this.props.dataArray.length)}
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
									}
								}],
								yAxes: [{
									ticks: {
										mirror: true,
										padding: -10
									}
								}]
							}
						}}
					/>
				}
				{ this.props.dataArray.length === 0 &&
					<HorizontalBar
						className="barChart"
						data={{
							labels: ["No data for the provided date range."],
							datasets : [{
								label: "Hours",
								data: [0],
							}]
						}}
						width={100}
						height={225}
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
									}
								}],
								yAxes: [{
									ticks: {
										mirror: true,
										padding: ((document.getElementById("barChart").offsetWidth / 2) -85) * -1
									}
								}]
							}
						}}
					/>
				}
			</div>
		)
	}
}