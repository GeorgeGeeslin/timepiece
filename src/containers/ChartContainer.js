import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import BarChart from '../components/BarChart';

const getHours = (sec) =>
  Math.round(sec/3600 * 100) / 100;

const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];

const borderColor = [
  'rgba(255,99,132,1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];
/*
const tasks = [
	{
		client: "Me",
		project: "Studying SQL",
		task: "Reading 'Use the index, Luke'",
		time: 2414
	},
	{
		client: "Leslie Hillberry",
		project: "Vendor deduction register",
		task: "Add vendor Id to report",
		time: 3028
	},
	{
		client: "Me",
		project: "Slacking off",
		task: "Coffee break",
		time: 893
	}
]
*/

function buildColorArray(size) {
	let arr = [];
	if (size <= 6) {
		return arr = backgroundColor.slice(0, size);
	} else {
		for (var i = 0; i < Math.floor(size/6); i++) {
			Array.prototype.push.apply(arr, backgroundColor)
		}
		if (size % 6 !== 0) {
			Array.prototype.push.apply(arr, backgroundColor.slice(0, size % 6))
		}
		return arr;
	}
}

function buildBorderArray(size) {
	let arr = [];
	if (size <= 6) {
		return arr = borderColor.slice(0, size);
	} else {
		for (var i = 0; i < Math.floor(size/6); i++) {
			Array.prototype.push.apply(arr, borderColor)
		}
		if (size % 6 !== 0) {
			Array.prototype.push.apply(arr, borderColor.slice(0, size % 6))
		}
		return arr;
	}
}

function barChartData(tasks) {
	const labels = tasks.map((tasks) => (
		tasks.task
	));
	const data = tasks.map((tasks) => (
		getHours(tasks.time)
	));
	const color = buildColorArray(tasks.length)	
	const border = buildBorderArray(tasks.length)

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

export default class ChartContainer extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired
	}

	render () {
		const data = barChartData(this.props.tasks)
		return (
			<div>
				<BarChart data={data}/>
			</div>
		)
	}
}