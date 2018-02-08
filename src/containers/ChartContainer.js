import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import BarChart from '../components/BarChart';
import EmptyBarChart from '../components/EmptyBarChart';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';

const now = new Date();
const currDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const weekStart = new Date(currDay.getTime() - (currDay.getDay() * 86400000)).getTime();
const weekEnd = new Date(((6 - (currDay.getDay() + 1)) * 86400000) + 86400000 + currDay.getTime()).getTime();
const monthStart = new Date(currDay.getFullYear(), currDay.getMonth(), 1).getTime();
const monthEnd = new Date(currDay.getFullYear(), currDay.getMonth() + 1, 0, 23, 59, 59).getTime();

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
function formatLabel(str, maxwidth) {
  var sections = [];
  var words = str.split(" ");
  var temp = "";
  words.forEach(function(item, index) {
    if (temp.length > 0) {
      var concat = temp + ' ' + item;
        if (concat.length > maxwidth) {
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
      if(index == (words.length-1)) {
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
*/
export default class ChartContainer extends Component {
	static propTypes = {
		tasks: PropTypes.array.isRequired,
		closeUserMenu: PropTypes.func.isRequired
	}

	state = {
		display: "task",
		range: "all",
		start: "",
		end: "",
		dataArray: this.getFirstData(),
		displayHeading: "Task",
		status: "all",
		lineChartDates: this.lineChartDates("", "", this.props.tasks.filter((task) => (task.time > 0)))
	}

	 getHours = (sec) => 
  		Math.round(sec/3600 * 100) / 100;

	formatUnixTime(dateString) {
		const year = dateString.slice(0,4);
		const month = dateString.slice(5,7) - 1;
		const day = dateString.slice(8,10);
		return new Date(year,month,day).getTime();
	};

	buildColorArray(size) {
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

	buildBorderArray(size) {
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

	getFirstData() {
		return this.props.tasks.filter((task) => (task.time > 0))
	}
	

	getChartData = text => e => {
		if (e) e.preventDefault();
		console.log(text)
		//variables used in function
		let taskLevelData = [];
		let tasksMatchingStatus = [];
		let displayHeading = this.state.display.charAt(0).toUpperCase() +  
					this.state.display.substr(1)

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

		//filter tasks according to status 
		if (this.state.status === "all") {
			tasksMatchingStatus = this.props.tasks;
		} else if (this.state.status === "current") {
			displayHeading = displayHeading + " (Current)"; 
			tasksMatchingStatus = this.props.tasks.filter((task) => (
				(task.timefinished === null || task.timefinished === undefined)
			));
		} else if (this.state.status === "finished") {
			displayHeading = displayHeading + " (Finished)"; 
			tasksMatchingStatus = this.props.tasks.filter((task) => (
				(task.timefinished !== null && task.timefinished !== undefined)
			));
		}
    
    //Check to see if date range is something other than "All Time"
		if (this.state.start !== "" || this.state.end !== "") {
			//Filter tasks at time interval level:
			//I only care about total time of intervals, not keeping individual intervals intact.
			//But must handle intervals that bridge or overlap the start and end dates.
			//An Array of objects is built containing Task, Project, Client, and Time.
			//Time is rounded down from milliseconds to seconds.	
			for (let i = 0; i < tasksMatchingStatus.length; i++) {
				let task = tasksMatchingStatus[i];
				let taskTotal = 0;
				taskLevelData.push({
					client: tasksMatchingStatus[i].client,
					project: tasksMatchingStatus[i].project,
					task: tasksMatchingStatus[i].task,
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
			taskLevelData = taskLevelData.filter((task) => (task.time > 0));
		} else {
			taskLevelData = tasksMatchingStatus.filter((task) => (task.time > 0));
		}


		//Check to see if display is something other than tasks.
		//If it is, an array of Objects will be built with the display name, total time, 
		//and number of aggregate tasks.
		if (this.state.display !== "task") {
			let displayLabels = [];
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
				if (displayLabels[i].trim() === "") {
					displayLevelData.push({
						display: "[blank]",
						time: totalTime,
						taskCount: taskCount
					})
				} else {
					displayLevelData.push({
						display: displayLabels[i],
						time: totalTime,
						taskCount: taskCount
					})
				}
			}		
			
			this.setState({
				dataArray: displayLevelData,
				displayHeading: displayHeading,
				//lineChartDates: this.lineChartDates(this.state.start, this.state.end, dataArray),
				//lineChartData: this.lineChartData()
			});
		} else {
			this.setState({
				dataArray: taskLevelData,
				displayHeading: displayHeading,
				//lineChartDates: this.lineChartDates(this.state.start, this.state.end, dataArray),
				//lineChartData: this.lineChartData()
			});
		}
	}

	lineChartDates(start, end, dataArray) {
		console.log("--------------------------------------------")
		let lineChartData = [];
		let labelArray = [];
		let startDate;
		let endDate;

		//let startHolder = Infinity;
		//let stopHolder = 0;

		//const fill



		if (start !== "" && end !== "") {
			let s = new Date(start);
			let e = new Date(end);
			let offSet = new Date(start).getTimezoneOffset()*60*1000;
			startDate = new Date(s.getTime() + offSet);
			endDate = new Date(e.getTime() + offSet);
		} else if (start === "" && end !== "") {
			//findEarlistInterval()
			
		} else if (start !== "" && end === "") {
			//findLatestInterval(dataArray)
		} else {
			//findEarlistInterval(dataArray)
			//findLatestInterval(dataArray)
		}
		const dayCount = ((endDate - startDate) / 86400000) + 1 ;
		
		function addDays(date, days) {
			let result = new Date(date);
			result.setDate(result.getDate() + days);
			return result;
		}

		for (let i = 0; i < dayCount; i++) {
			let date = addDays(startDate, i);
			let year = date.getFullYear();
			let days = ("0" + date.getDate()).slice(-2);
			let month = ("0" + (date.getMonth() + 1)).slice(-2);
			let dateString = year+"-"+month+"-"+days;
			labelArray.push(dateString);
		}
		lineChartData.dateLabels = labelArray;
		return lineChartData;
	}

/*
	findEarliestInterval(dataArray) {
		let start;
		for (let i = 0; i < dataArray.length; i++) {

			for (let j = 0; j < dataArray[i].)

		}
	}
*/

	formatDateString = (timeStamp) => {
		const date = new Date(timeStamp);
		let month = ('0' + (date.getMonth() + 1)).slice(-2);
		let day = ('0' + date.getDate()).slice(-2);
		let year = date.getFullYear();
		return year + '-' + month + '-' + day;
	}

	selectDisplay = (e) => {
		this.setState({display: e.target.value});
	}

	selectStatus = (e) => {
		this.setState({status: e.target.value});
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
			<Grid onClick= { () => this.props.closeUserMenu()}>
				<h1>Charts and Graphs</h1>
				<form id='chartSettings' onSubmit={this.getChartData("test!")}>
					<Row className="chartSettings">
						<Col className="radioGroup" xs={6} sm={4} md={3}>
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
						<Col className="radioGroup" xs={6} sm={4} md={3}>
							<p>Task Status:</p>
							<div className="radio-button">
								<input 
									type="radio"
									value="all"
									htmlFor="all"
									checked={this.state.status === "all"}
									onChange={this.selectStatus}
								/>
								<label htmlFor="all">All</label>
							</div>
							<div className="radio-button">
								<input 
									type="radio"
									value="current"
									htmlFor="current"
									checked={this.state.status === "current"}
									onChange={this.selectStatus}
								/>
								<label htmlFor="current">Current</label>
							</div>
							<div className="radio-button">
								<input 
									type="radio"
									value="finished"
									htmlFor="finished"
									checked={this.state.status === "finished"}
									onChange={this.selectStatus}
								/>
								<label htmlFor="finished">Finished</label>
							</div>														
						</Col> 
						<Col className="radioGroup" xs={6} sm={4} md={3}>
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
						<Col xs={6} sm={12} md={3}>	
							<p>Custom Date Range:</p>
							<label htmlFor="start">Start:</label>
							<input 
								id="start"
								className="time-input"
								type="date"
								value={this.state.start}
								onChange={this.onChangeDateStart}
							/>
							<label htmlFor="end">Stop:</label>
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
						{ this.state.dataArray.length > 0 && 
							<BarChart 
								display={this.state.display}
								getHours={this.getHours}
								dataArray={this.state.dataArray}
								buildBorderArray={this.buildBorderArray}
								buildColorArray={this.buildColorArray}
								displayHeading={this.state.displayHeading}
							/>
						}
						{ this.state.dataArray.length === 0 &&
							<EmptyBarChart 
								displayHeading={this.state.displayHeading}
							/>
						}
						<LineChart 
							buildBorderArray={this.buildBorderArray}
							buildColorArray={this.buildColorArray}
							displayHeading={this.state.displayHeading}
							dataArray={this.state.dataArray}
							lineChartDates={this.state.lineChartDates}
						/>
						<PieChart 
						/>
					</Col>
				</Row>
			</Grid>
		)
	}
}