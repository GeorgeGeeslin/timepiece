import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Pie } from 'react-chartjs-2';

export default class PieChart extends Component {
	static propTypes = {

	}

	render() {
		return (
			<div>
				<Pie
					data={{
						labels: ["task1", "task2", "task3", "task4"],
						datasets: [{
							data: [5, 3.6, 3, 2.5],
							backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1"],
							borderColor: ["rgba(255,99,132,1)","rgba(54, 162, 235, 1)",'rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'],
							borderWidth: 1
						}]
					}}
					options={{
						title: {
							display: true,
							text: "Pie Chart Title"
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

