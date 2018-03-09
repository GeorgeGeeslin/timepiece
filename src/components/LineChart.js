import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
	//	height: PropTypes.number.isRequired
	}



	render() {
		return(
			<div>
				<Line 
				height={300}
				data={this.props.data}
					options={{
						title: {
							display: true,
							text: this.props.title
						},
						maintainAspectRatio: false,
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
			          },
			          gridLines: {
									color: "#1e2f51"
								}
			        }],
			        yAxes: [{
			     //   	id: "task 1",
			          ticks: {
			            beginAtZero: true,
			          },
			          gridLines: {
									color: "#1e2f51"
								}
			        }]
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