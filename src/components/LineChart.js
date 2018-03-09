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
			<div style={{paddingTop: "50px", height: "350px"}}>
				<h2>{this.props.title}</h2>
				<Line 	
					data={this.props.data}
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
			          type: "time",
			          time: {
			            unit: 'day',
			            round: 'day',
			            displayFormats: {
			              day: 'MMM DD'
			            }
			          },
			          gridLines: {
									color: "#405175"
								}
			        }],
			        yAxes: [{
			          ticks: {
			            beginAtZero: true,
			          },
			          gridLines: {
									color: "#405175"
								}
			        }]
			      },
	      		legend: {
							position: "bottom"
						},
						layout: {
							padding: {
								left: 10
							}
						}
		    }}
	    	/>
			</div>
		)
	}
}