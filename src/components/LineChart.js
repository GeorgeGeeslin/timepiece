import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {
	static propTypes = {

	}

	render() {
		return(
			<div>
				<Line data={{
					labels: ["2018-01-01", "2018-01-02", "2018-01-03"],
					datasets: [{
						label: "Hours",
						data: [5,2.5, 3],
						borderColor: "rgba(220,20,20,1)",
       			backgroundColor: "rgba(220,20,20,0.5)"
					}]
				}}
					options={{
						title: {
							display: true,
							text: "Hours per Day"
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