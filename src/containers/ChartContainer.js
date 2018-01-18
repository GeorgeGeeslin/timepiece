import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import BarChart from '../components/BarChart';

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

function formatLabel(str, maxwidth){
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function(item, index){
        if(temp.length > 0)
        {
            var concat = temp + ' ' + item;

            if(concat.length > maxwidth){
                sections.push(temp);
                temp = "";
            }
            else{
                if(index == (words.length-1))
                {
                    sections.push(concat);
                    return;
                }
                else{
                    temp = concat;
                    return;
                }
            }
        }

        if(index == (words.length-1))
        {
            sections.push(item);
            return;
        }

        if(item.length < maxwidth) {
            temp = item;
        }
        else {
            sections.push(item);
        }

    });

    return sections;
}

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

export default class ChartContainer extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired
	}

	state = {
		display: 'task',
		durration: 'all',
		start: null,
		end: null,
		dataArray: this.props.tasks
	}

	barChartData = (dataArray) => {
		const display = this.state.display;
		const labels = dataArray.map((item) => (
			item[display]
		));
		const data = dataArray.map((item) => (
			getHours(item.time)
		));
		const color = buildColorArray(labels.length)	
		const border = buildBorderArray(labels.length)

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
		if (length <= 5 ) {
			return	50 * length;
		} else if (length > 5 && length <= 10) {
			return	40 * length;
		} else {
			return 30 * length;
		}
	}

	getChartData = (display, durration, start, end) => {
		
	}
 

	render () {
		const height = this.barChartHeight(this.state.dataArray.length)

		const data = this.barChartData(this.state.dataArray)
		return (
			<div>
				<h1>Charts and Graphs</h1>
				<form id='chartSettings' onSubmit={this.getChartData}>
					<input 
						className='tasks-buttons'
						type='submit'
						value='Apply'
						form='chartSettings'
					/>
				</form>
				<BarChart data={data}
					height={height}
				/>
			</div>
		)
	}
}