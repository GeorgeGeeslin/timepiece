import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {
	static propTypes = {
		//buildBorderArray: PropTypes.func.isRequired,
		//buildColorArray: PropTypes.func.isRequired,
		//dataArray: PropTypes.array.isRequired,
	//	start: PropTypes.string.isRequired,
	//	end: PropTypes.string.isRequired
	}

	/*state = {
		labels: this.lineChartLabels(this.props.start, this.props.end, this.props.dataArray)
	}*/

	/*findFirstStart = (dataArray) => {

	}*/
	/*componentDidMount() {
		let labelArray = this.lineChartLabels(this.props.start, this.props.end, this.props.dataArray)
		this.setState({labels: labelArray});
	}*/

	/*componentDidUpdate(prevProps) {
		if (prevProps.start !== this.props.start || prevProps.end !== this.props.end) {
			let labelArray = this.lineChartLabels(this.props.start, this.props.end, this.props.dataArray)
			this.setState({labels: labelArray});			
		}
	}*/

	render() {
		//const labels = this.lineChartLabels (this.props.state, this.props.end, this.props.dataArray);
		return(
			<div>
				<Line 
				height={50}
				data={{
					labels: ["2018-01-01", "2018-01-02", "2018-01-03", "2018-01-04", "2018-01-05", "2018-01-06", "2018-01-07"],
					datasets: [{
						fill: false,
						label: "task1",
						data: [5, 2.6, 3,,,,],
						backgroundColor: "rgba(255, 99, 132, 0.2)",
						borderColor: "rgba(255,99,132,1)",
						borderWidth: 1
					}, {
						fill: false,
						label: "task2",
						data: [,,,4,,3,4],
						backgroundColor: "rgba(54, 162, 235, 0.2)",
						borderColor: "rgba(54, 162, 235, 1)",
						borderWidth: 1
					}]
				}}
					options={{
						title: {
							display: true,
							text: "Hours per Day"
						},
						maintainAspectRatio: true,
						legend: {
							position: "bottom"
						},
			      scales: {
			        xAxes: [{
			          type: "time",
			          time: {
			            unit: 'day',
			            round: 'day',
			            displayFormats: {
			              day: 'MMM DD'
			            }
			          }
			        }],
			        yAxes: [{
			          ticks: {
			            beginAtZero: true
			          }
			        }]
			      },
	      		legend: {
							position: "bottom"
						},
		    }}
	    	/>
			</div>
		)
	}
}