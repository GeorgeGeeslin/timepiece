import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import BarChart from '../components/BarChart';

const now = new Date();
const currDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const weekStart = new Date(currDay.getTime() - (currDay.getDay() * 86400000)).getTime();
const weekEnd = new Date(((6 - (currDay.getDay() + 1)) * 86400000) + 86400000 + currDay.getTime()).getTime();
const monthStart = new Date(currDay.getFullYear(), currDay.getMonth(), 1).getTime();
const monthEnd = new Date(currDay.getFullYear(), currDay.getMonth() + 1, 0, 23, 59, 59).getTime();

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
		display: "task",
		range: "all",
		start: "",
		end: "",
		dataArray: this.props.tasks
	}

/*
	componentWillMount() {
		this.setState({
			height: this.barChartHeight(this.state.dataArray.length),
			data: this.barChartData(this.state.dataArray)
		});
	};

	componentDidUpdate(prevProps) {
		console.log("update!")
		if (prevProps.display !== this.state.display) {
			this.getChartData()
		}
	}
*/
	formatUnixTime(dateString) {
		const year = dateString.slice(0,4);
		const month = dateString.slice(5,7) - 1;
		const day = dateString.slice(8,10);
		return new Date(year,month,day).getTime();
	};

	getChartData = (e) => {
		if (e) e.preventDefault();		
		let taskLevelData = [];
		//Translate start and end strings to timestamps. 
		if (this.state.start === "") {
			var startTs = 0;
		} else {
			var startTs = this.formatUnixTime(this.state.start);
		}
		if (this.state.end === "") {
			var endTs = Infinity; 
		} else {
			var endTs = this.formatUnixTime(this.state.end) + 86399000;
		}
    
    //Check to see if date range is something other than "All Time"
		if (this.state.start !== "" && this.state.end !== "") {
			//Filter tasks at time interval level:
			//I only care about total time of intervals, not keeping individual intervals intact.
			//But must handle intervals that bridge or overlap the start and end dates.
			//An Array of objets is built containing Task, Project, Client, and Time.
			//Time is rounded down from milliseconds to seconds.	
			for (let i = 0; i < this.props.tasks.length; i++) {
				let task = this.props.tasks[i];
				let taskTotal = 0;
				taskLevelData.push({
					client: this.props.tasks[i].client,
					project: this.props.tasks[i].project,
					task: this.props.tasks[i].task,
					time: taskTotal
				})
				if (task.timeintervals !== undefined && task.timeintervals.length > 0) {
					for (let j = 0; j < task.timeintervals.length; j++) {
						let timeinterval = task.timeintervals[j];
						// Time interval starts before date range and ends after date range.
						if (timeinterval.startTime <= startTs && timeinterval.stopTime >= endTs) {
							taskTotal = taskTotal + Math.floor((endTs - startTs) / 1000);
							taskLevelData[i].time = taskTotal;
						// Time interval starts before date range and ends during date range.
						} else if (timeinterval.startTime <= startTs && timeinterval.stopTime <= endTs && timeinterval.stopTime >= startTs) {
							taskTotal = taskTotal + Math.floor((timeinterval.stopTime - startTs) / 1000);
							taskLevelData[i].time = taskTotal;
						// Time interval starts during date range and ends after date range.
						} else if (timeinterval.startTime >= startTs && timeinterval.stopTime >= endTs && timeinterval.startTime <= endTs) {
							taskTotal = taskTotal + Math.floor((endTs - timeinterval.startTime) / 1000);
							taskLevelData[i].time = taskTotal;
						// Time interval starts and stops within date range.
						} else if (timeinterval.startTime >= startTs && timeinterval.stopTime <= endTs) {
							taskTotal = taskTotal + Math.floor((timeinterval.stopTime - timeinterval.startTime) / 1000);
							taskLevelData[i].time = taskTotal;
						}
					}
				}
			}
		} else {
			taskLevelData = this.props.tasks;
		}

		//Check to see if display is something other than tasks.
		//If it is an array of Objects will be built with the display name, total time, 
		//and number of aggregate tasks.
		if (this.state.display !== "task") {
			let displayLabels = [];
			//let displayTimes = [];
			//let numberOfTasks = [];
			let displayLevelData = [];
			const display = this.state.display

			taskLevelData.forEach((task) => {
				if (displayLabels.includes(task[display]) === false) {
					displayLabels.push(task[display]);
				}
			})

			for (let i = 0; i < displayLabels.length; i++) {
				let totalTime = 0;
				let taskCount = 0;
				for (let j = 0; j < taskLevelData.length; j++) {
					if (displayLabels[i] === taskLevelData[j][display]) {	
						totalTime = totalTime + taskLevelData[j].time;
						taskCount++
					}
				}
				displayLevelData.push({
					[display]: displayLabels[i],
					time: totalTime,
					taskCount: taskCount
				})
			}
			this.setState({
				dataArray: displayLevelData
			});
		} else {
			this.setState({
				dataArray: taskLevelData
			});
		}
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

	formatDateString = (timeStamp) => {
		const date = new Date(timeStamp);
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		let year = date.getFullYear();
		return year + '-' + month + '-' + day;
	}
/*
	formatTimeStamp = (dateString) => {
		console.log(this.state.start);
	}
*/
	selectDisplay = (e) => {
		this.setState({display: e.target.value});
	}
	
	selectRange = (e) => {
		if (e.target.value === "week") {
			this.setState({
				range: "week",
				start: this.formatDateString(weekStart),
				end: this.formatDateString(weekEnd)
			})
		} else if (e.target.value === "month") {
			this.setState({
				range: "month",
				start: this.formatDateString(monthStart),
				end: this.formatDateString(monthEnd)
			})
		} else if (e.target.value === "all") {
			this.setState({
				range: "all",
				start: "",
				end: ""
			})
		} else if (e.target.value === "custom") {
			this.setState({
				range: "custom"
			})
		}
	}

	onChangeDateStart = (e) => {
		this.setState({
			range: "custom",
			start: e.target.value
		});
	}

	onChangeDateStop = (e) => {
		this.setState({
			range: "custom",
			end: e.target.value
		});
	}

	render () {	
		return (
			<Grid>
				<h1>Charts and Graphs</h1>
				<form id='chartSettings' onSubmit={this.getChartData}>
					<Row className="chartSettings">
						<Col className="radioGroup" xs={6}>
							<p>Display:</p>
							<div className="radio-button">
								<input 
									type="radio"
									value="task"
									htmlFor="tasks"
									checked={this.state.display === "task"}
									onChange={this.selectDisplay}
								/>
								<label htmlFor="tasks">Tasks</label>
							</div>
							<div className="radio-button">
								<input
									type="radio"
									value="project"
									htmlFor="projects"
									checked={this.state.display === "project"}
									onChange={this.selectDisplay}
								/>
								<label htmlFor="projects">Projects</label>
							</div>
							<div className="radio-button">
								<input 
									type="radio"
									value="client"
									htmlFor="clients"
									checked={this.state.display === "client"}
									onChange={this.selectDisplay}
								/>	
								<label htmlFor="clients">Clients</label>
							</div>
						</Col>
						<Col className="radioGroup" xs={6}>
							<p>Date Range:</p>
							<div className="radio-button">
								<input 
									type="radio"
									value="all"
									htmlFor="all"
									checked={this.state.range === "all"}
									onChange={this.selectRange}
								/>
							  <label htmlFor="all">All Time</label>
						  </div>
						  <div className="radio-button">
								<input 
									type="radio"
									value="week"
									htmlFor="week"
									checked={this.state.range === "week"}
									onChange={this.selectRange}
								/>
								<label htmlFor="week">This Week</label>
							</div>
							<div className="radio-button">
								<input 
									type="radio"
									value="month"
									htmlFor="month"
									checked={this.state.range === "month"}
									onChange={this.selectRange}
								/>
								<label htmlFor="month">This Month</label>
							</div>	
							<div className="radio-button">
								<input 
									type="radio"
									value="custom"
									htmlFor="custom"
									checked={this.state.range === "custom"}
									onChange={this.selectRange}
								/>
								<label htmlFor="custom">Custom</label>
							</div>
						</Col>
						<Col xs={12} sm={4}>	
							<p>Custom Date Range:</p>
							<input 
								id="start"
								className="time-input"
								type="date"
								value={this.state.start}
								onChange={this.onChangeDateStart}
							/>
							<input 
								id="end"
								className="time-input"
								type="date"
								value={this.state.end}
								onChange={this.onChangeDateStop}
							/>
							<input 
								className='control-buttons'
								type='submit'
								value='Apply'
								form='chartSettings'
							/>
						</Col>
					</Row>
				</form>
				<Row>
					<Col sm={12}>
						<BarChart data={this.barChartData(this.state.dataArray)}
							height={this.barChartHeight(this.state.dataArray.length)}
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}