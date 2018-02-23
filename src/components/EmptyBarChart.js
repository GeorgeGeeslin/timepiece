import React from 'react';
import { PropTypes } from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';

const EmptyBarChart = props => (
	<div style={{height: "225px"}}>
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
					text: props.title
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
						barThickness: 100,
						ticks: {
							mirror: true,
							padding: ((window.innerWidth / 2) -125) * -1
						},
						gridLines: {
							color: "#1e2f51"
						}
					}]
				}
			}}
		/>	
	</div>
);

EmptyBarChart.propTypes = {
	title: PropTypes.string.isRequired
};

export default EmptyBarChart;



