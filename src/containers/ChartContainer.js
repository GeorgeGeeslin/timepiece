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
		displayHeading: "Task",
		status: "all",
		chartData: this.getFirstData()
	}

	getFirstData() {
		const tasks = this.props.tasks.filter((task) => (task.time > 0))
	
		//Create an array of background colors for chart items based on number of items in an array.
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

		//Create an array of background colors for chart items based on the number of items in an array.
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

		function getLineStartandStop(tasks) {
			let firstStart = Infinity;
			let lastStop = 0;
			tasks.forEach((task) => {
				task.timeintervals.forEach((interval) => {
					if (interval.startTime < firstStart) {
						firstStart = interval.startTime;
					}
					if (interval.stopTime > lastStop) {
						lastStop = interval.stopTime;
					}
				})
			})
			return {firstStart: firstStart, lastStop: lastStop}
		}

		function getLineChartDates(start, end) {
			let labelArray = [];
			let startDate;
			let endDate;

			let s = new Date(start);
			let e = new Date(end);
			let offSet = new Date(start).getTimezoneOffset()*60*1000;

			startDate = new Date(s.getTime() + offSet);
			endDate = new Date(e.getTime() + offSet);
				
			const dayCount = ((endDate - startDate) / 86400000);
			
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
			return labelArray;
		}

		function getBarChartHeight(length) {
				return (30 * length) + 100;
			}

		function barAndPieData(tasks) {
			const barChartTitle = "Hours per Task";
			const pieChartTitle = "Tasks";	
			let chartData = {};

			const labels = tasks.map((task) => (
					task.task
				))
				const times = tasks.map((task) => (
					Math.round(task.time/3600 * 100) / 100
				))

				chartData = {
					labels: labels,
					datasets: [{
						label: "Hours",
						data: times,
						backgroundColor: buildColorArray(tasks.length),
						borderColor: buildBorderArray(tasks.length),
						borderWidth: 1
					}]
				}
				
			return {
				barChartTitle: barChartTitle,
				pieChartTitle: pieChartTitle,
				barChartData: chartData,
				pieChartData: chartData,
				//barChartHeight: getBarChartHeight(chartData.labels.length)
			}
		}

		function getLineChartData(tasks, display, labels) {
			const lineChartTitle = "Task Hours by Day";
			let datasets = [];

				function dateToString(date) {
					let month = ('0' + (date.getMonth() + 1)).slice(-2);
					let day = ('0' + date.getDate()).slice(-2);
					let year = date.getFullYear();
					return year + '-' + month + '-' + day;
				}

				function mapDataToLabels(arr, labels) {
					let data = [];
					let j = 0;
					for (let i = 0; i < arr.length; i++) {
						let unmatched = true;
						let labelLength = (labels.length - 1);
						while (unmatched) { 
							if (arr[i].date === labels[j]) {
								data.push(arr[i].time);
								unmatched = false;
							} else {
								data.push(null);
							}
							if (j >= labelLength) {
								unmatched = false;
							}
							j++;
						} // End While Loop
					} // End for Loop
					return data;
				};

				function processLineTasks(tasks, labels) {
					tasks.forEach((task) => { //each task is its own dataset
						let label = task.task;
						let data = [];
						let mappedData = [];
						let includedDates = [];

					task.timeintervals.forEach((interval) => { 
						const s = new Date(interval.startTime);
						const e = new Date(interval.stopTime);

						const start = new Date(s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate());
						const end = new Date(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());

						const dayCount = Math.round((end.getTime() - start.getTime()) / (86400000))
																						
						if (dayCount === 0) {
							let date = dateToString(start);
							let time = interval.stopTime - interval.startTime;
							time = parseFloat(Number(Math.round(time/36000) / 100).toFixed(2));
							if ( includedDates.includes(date) === false ) {
								includedDates.push(date);
								data.push({date: date, time: time})
							} else {
								let index = data.findIndex(x => x.date === date);
								const prevTime = data[index].time;
								data[index].time = parseFloat(Number(prevTime + time).toFixed(2));
							}	
						} else {
							//First day in multi-day continuous task
							for(let i = 0; i <= dayCount; i++) {
								if (i === 0) {
									let date = dateToString(start);
									let time = new Date(start.getTime() + 86400000) - interval.startTime;
									time = parseFloat(Number(Math.round(time/36000) /100).toFixed(2));
									if (includedDates.includes(date) === false ) {
										includedDates.push(date);
										data.push({date: date, time: time});								
									} else {
										let index = data.findIndex(x => x.date === date);
										const prevTime = data[index].time;
										data[index].time = parseFloat(Number(prevTime + time).toFixed(2));
									}
								//Last day in multi-day task continuous task
								} else if (i === dayCount) {
									let date = dateToString(end)
									let time = interval.stopTime - end.getTime();
									time = parseFloat(Number(Math.round(time/36000) /100).toFixed(2));
									if (includedDates.includes(date) === false) {
										includedDates.push(date);
										data.push({date: date, time: time});
									} else {
										let index = data.findIndex(x => x.date === date);
										const prevTime = data[index].time;
										data[index].time = parseFloat(Number(prevTime + time).toFixed(2));
									}
								//In between days in mult-day continous task
								} else if (i > 0 && i < dayCount) {
									let day = new Date(start.getTime() + (i * 86400000));
									let date = dateToString(day);
									let time = 24;
									if (includedDates.includes(date) === false) {
										includedDates.push(date);
										data.push({date: date, time: time});						
									} else {
										let index = data.findIndex(x => x.date === date);
										const prevTime = data[index].time;
										data[index].time = parseFloat(Number(prevTime + time).toFixed(2));
									}
								}
							}
						}
					}) // End of interval forEach.

					data = data.sort((a, b) => { 
						const date1 = new Date(a.date);
						const date2 = new Date(b.date);
						return  date1 - date2 
					});
					mappedData = mapDataToLabels(data, labels);
					datasets.push({
						label: label, 
						data: mappedData, 
						borderWidth: 1, 
						fill: false,
					});
				}) // End of task forEach.
					let colorArray = buildColorArray(datasets.length)
					let borderArray = buildBorderArray(datasets.length)
					datasets.forEach((dataset, index) => {
						dataset.backgroundColor = colorArray[index];
						dataset.borderColor = borderArray[index];
					})
				let chartData = {
					labels: labels,
					datasets: datasets
				}
				return {
					lineChartTitle: lineChartTitle,
					data: chartData
				} 
			}
			return processLineTasks(tasks, labels);
		}
		/* End of Line Chart Helper Functions */ 
		let chartData = {
			barChartData: {},
			pieChartData: {},
			lineChartData: {}
		}; 
		const startAndStop = getLineStartandStop(tasks);
		const lineChartLabels = getLineChartDates(startAndStop.firstStart, startAndStop.lastStop);
		const lineChartData = getLineChartData(tasks, "task", lineChartLabels);
		const barAndPie = barAndPieData(tasks);
		const barChartHeight = getBarChartHeight(barAndPie.barChartData.labels.length);

		chartData.barChartTitle = barAndPie.barChartTitle;
		chartData.pieChartTitle = barAndPie.pieChartTitle;
		chartData.barChartData = barAndPie.barChartData;
		chartData.pieChartData = barAndPie.pieChartData;
		chartData.barChartHeight = barChartHeight;
		chartData.lineChartData = lineChartData
		
		return chartData;
		//return barAndPieData(tasks);
	}
	
	getChartData = e => {
		if (e) e.preventDefault();

		/* !!!!HELPER FUNCTIONS START!!!! */

		//Create an array of background colors for chart items based on number of items in an array.
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

		//Create an array of background colors for cart items based on the number of items in an array.
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

		// Get datestring start and end date strings. Get placeholders for when they are empty strings.
		function formatStartStop(dateString, type) {
			if (type === "start") {
				if (dateString === "") {
					return 0;
				} else {
					const year = dateString.slice(0,4);
					const month = dateString.slice(5,7) - 1;
					const day = dateString.slice(8,10);
					return new Date(year,month,day).getTime();
				}
			} else if (type === "stop") {
				if (dateString === "") {
				return Infinity;
				} else {
					const year = dateString.slice(0,4);
					const month = dateString.slice(5,7) - 1;
					const day = dateString.slice(8,10);
					return new Date(year,month,day).getTime() + 86399000;
				}
			}
		};

		//Get a date string for every date within the provided date range. 
		function getLineChartDates(start, end) {
			let labelArray = [];
			let startDate;
			let endDate;

			let s = new Date(start);
			let e = new Date(end);
			let offSet = new Date(start).getTimezoneOffset()*60*1000;

			startDate = new Date(s.getTime());
			endDate = new Date(e.getTime()); 
				
			const dayCount = ((endDate - startDate) / 86400000);
			
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
			return labelArray;
		}

		//Filter tasks by completion status and remove tasks with 0 time.
		function filterByStatus(status, tasks) {
			if (status === "all") {
				return tasks.filter((task) => (task.time > 0));
			} else if (status === "current") {
				return tasks.filter((task) => (
					task.time > 0 && (task.timefinished === null || task.timefinished === undefined)
				))
			} else if (status === "finished") {
				return tasks.filter((task) => (
					task.time > 0 && (task.timefinished !== null && task.timefinished !== undefined)
				))
			} 
		}

		//Filter tasks by date range.
		//Also get firstStart and lastStop timestamp for Line Chart date labels. 
		function filterByDate(tasks, start, end, startTs, endTs) {
		let firstStart = Infinity
		let lastStop = 0;
			let tempTasks = [];
			//Check that date range is something other than "All Time"
			if (start !== "" || end !== "") {
				for (let i = 0; i < tasks.length; i ++) {
					let currTask = tasks[i];
					let taskTime = 0;
					tempTasks.push({
						client: currTask.client,
						project: currTask.project,
						task: currTask.task,
						timeintervals: []
					})
					for (let j = 0; j < currTask.timeintervals.length; j++) {
						let timeinterval = currTask.timeintervals[j];
						let currInterval;

						// Time interval starts before date range and ends after date range.
						if (timeinterval.startTime <= startTs && timeinterval.stopTime >= endTs) {
							taskTime = taskTime + Math.floor((endTs - startTs) / 1000);
							currInterval = {startTime: startTs, stopTime: endTs};
							tempTasks[i].time = taskTime;
							tempTasks[i].timeintervals.push(currInterval);
							if (startTs < firstStart) {
								firstStart = startTs;
							}
							if (endTs > lastStop) {
									lastStop = endTs;
								}

						// Time interval starts before date range and ends during date range.					
						} else if (timeinterval.startTime <= startTs && timeinterval.stopTime <= endTs && timeinterval.stopTime >= startTs) {
							taskTime = taskTime + Math.floor((timeinterval.stopTime - startTs) / 1000);
							currInterval = {startTime: startTs, stopTime: timeinterval.stopTime};
							tempTasks[i].time = taskTime;
							tempTasks[i].timeintervals.push(currInterval);
							if (startTs < firstStart) {
								firstStart = startTs;
							}
							if (timeinterval.stopTime > lastStop) {
								lastStop = timeinterval.stopTime;
							}


						// Time interval starts during date range and ends after date range.							
						} else if (timeinterval.startTime >= startTs && timeinterval.stopTime >= endTs && timeinterval.startTime <= endTs)  {
							taskTime = taskTime + Math.floor((endTs - timeinterval.startTime) / 1000);
							currInterval = {startTime: timeinterval.startTime, stopTime: endTs};
							tempTasks[i].time = taskTime;
							tempTasks[i].timeintervals.push(currInterval);		
							if (timeinterval.startTime < firstStart) {
								firstStart = timeinterval.startTime
							}
							if (endTs > lastStop) {
								lastStop = endTs;
							}												

						// Time interval starts and stops within date range.
						} else if (timeinterval.startTime >= startTs && timeinterval.stopTime <= endTs) {
							taskTime = taskTime + Math.floor((timeinterval.stopTime - timeinterval.startTime) / 1000);
							currInterval = {startTime: timeinterval.startTime, stopTime: timeinterval.stopTime};
							tempTasks[i].time = taskTime;
							tempTasks[i].timeintervals.push(currInterval);		
							if (timeinterval.startTime < firstStart) {
								firstStart = timeinterval.startTime
							}
							if (timeinterval.stopTime > lastStop) {
								lastStop = timeinterval.stopTime;
							}												
						}
					} // End inner loop (time intervals).
				} //End outer loop (tasks).
				return {
					tasks: tempTasks.filter((task) => (task.time > 0)),
					firstStart: firstStart,
					lastStop: lastStop
				};
			} else {
			//Date filter is "All Time" return all tasks.
			let intervalArray = [];
			tasks.forEach((task) => {
				task.timeintervals.forEach((interval) => {
					intervalArray.push(interval.startTime);
					intervalArray.push(interval.stopTime);
				})
			})
			Array.max = function(array) {
				return Math.max.apply(Math, array)
			}
			Array.min = function(array) {
				return Math.min.apply(Math, array);
			}
			firstStart = Array.min(intervalArray);
			lastStop = Array.max(intervalArray)		
				return {
					tasks: tasks,
					firstStart: firstStart,
					lastStop: lastStop
				};  
			}
		}

		function barAndPieData(tasks, display, displayHeading) {
			const barChartTitle = "Hours per " + displayHeading;
			const pieChartTitle = displayHeading;	
			let chartData = {};
			let displayLabels = [];
			let displayLevelData = [];
			let chartLabels = [];
			let times = [];

			if (display !== "task") {

				//Build Array of unique display (Project or Client) labels 
				tasks.forEach((task) => {
					if (displayLabels.includes(task[display]) === false) {
						displayLabels.push(task[display]);
					}
				})	

				//Loop through unique labels and sum elapsed times and create task count.
				for (let i = 0; i < displayLabels.length; i++) {
					let totalTime = 0;
					let taskCount = 0;
					for (let j = 0; j < tasks.length; j++) {
						if (displayLabels[i] === tasks[j][display]) {
							totalTime = totalTime + tasks[j].time;
							taskCount++
						}
					}
					if (displayLabels[i].trim() === "") {
						displayLevelData.push({
							displayLabel: "[blank]",
							taskCount: taskCount
						})
					} else {
						displayLevelData.push({
							displayLabel: displayLabels[i],
							taskCount: taskCount
						})
					}
					chartLabels.push(displayLevelData[i].displayLabel + ": " + taskCount + " task(s)");
					times.push(Math.round(totalTime/3600 * 100) / 100);

					chartData = {
						labels: chartLabels,
						datasets: [{
							label: "Hours",
							data: times,
							backgroundColor: buildColorArray(displayLabels.length),
							borderColor: buildBorderArray(displayLabels.length),
							borderWidth: 1
						}]
					}
				}
			} else {
					const labels = tasks.map((task) => (
						task.task
					))
					const times = tasks.map((task) => (
						Math.round(task.time/3600 * 100) / 100
					))

					chartData = {
						labels: labels,
						datasets: [{
							label: "Hours",
							data: times,
							backgroundColor: buildColorArray(tasks.length),
							borderColor: buildBorderArray(tasks.length),
							borderWidth: 1
						}]
					}
			}
			return {
				barChartTitle: barChartTitle,
				pieChartTitle: pieChartTitle,
				barChartData: chartData,
				pieChartData: chartData
			}
		}

		function getLineChartData(tasks, display, labels) {
			const lineChartTitle = displayHeading + " Hours by Day";
			let datasets = [];

				function dateToString(date) {
					let month = ('0' + (date.getMonth() + 1)).slice(-2);
					let day = ('0' + date.getDate()).slice(-2);
					let year = date.getFullYear();
					return year + '-' + month + '-' + day;
				}

				function mapDataToLabels(arr, labels) {
					let data = [];
					let j = 0;
					for (let i = 0; i < arr.length; i++) {
						let unmatched = true;
						let labelLength = (labels.length - 1);
						while (unmatched) { 
							if (arr[i].date === labels[j]) {
								data.push(arr[i].time);
								unmatched = false;
							} else {
								data.push(null);
							}
							if (j >= labelLength) {
								unmatched = false;
							}
							j++;
						} // End While Loop
					} // End for Loop
					return data;
				};

				function processLineTasks(tasks, display) {
					tasks.forEach((task) => { //each task is its own dataset
						let label;
						if (display) {
							label = task.display;
						} else {
							label = task.task;
						}
						let data = [];
						let mappedData = [];
						let includedDates = [];

					task.timeintervals.forEach((interval) => { 
						const s = new Date(interval.startTime);
						const e = new Date(interval.stopTime);

						const start = new Date(s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate());
						const end = new Date(e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate());

						const dayCount = Math.round((end.getTime() - start.getTime()) / (86400000))
																						
						if (dayCount === 0) {
							let date = dateToString(start);
							let time = interval.stopTime - interval.startTime;
							time = parseFloat(Number(Math.round(time/36000) / 100).toFixed(2));
							if ( includedDates.includes(date) === false ) {
								includedDates.push(date);
								data.push({date: date, time: time})
							} else {
								let index = data.findIndex(x => x.date === date);
								const prevTime = data[index].time;
								data[index].time = parseFloat(Number(prevTime + time).toFixed(2));
							}	
						} else {
							//First day in multi-day continuous task
							for(let i = 0; i <= dayCount; i++) {
								if (i === 0) {
									let date = dateToString(start);
									let time = new Date(start.getTime() + 86400000) - interval.startTime;
									time = parseFloat(Number(Math.round(time/36000) /100).toFixed(2));
									if (includedDates.includes(date) === false ) {
										includedDates.push(date);
										data.push({date: date, time: time});								
									} else {
										let index = data.findIndex(x => x.date === date);
										const prevTime = data[index].time;
										data[index].time = parseFloat(Number(prevTime + time).toFixed(2));
									}
								//Last day in multi-day task continuous task
								} else if (i === dayCount) {
									let date = dateToString(end)
									let time = interval.stopTime - end.getTime();
									time = parseFloat(Number(Math.round(time/36000) /100).toFixed(2));
									if (includedDates.includes(date) === false) {
										includedDates.push(date);
										data.push({date: date, time: time});
									} else {
										let index = data.findIndex(x => x.date === date);
										const prevTime = data[index].time;
										data[index].time = parseFloat(Number(prevTime + time).toFixed(2));
									}
								//In between days in mult-day continous task
								} else if (i > 0 && i < dayCount) {
									let day = new Date(start.getTime() + (i * 86400000));
									let date = dateToString(day);
									let time = 24;
									if (includedDates.includes(date) === false) {
										includedDates.push(date);
										data.push({date: date, time: time});						
									} else {
										let index = data.findIndex(x => x.date === date);
										const prevTime = data[index].time;
										data[index].time = parseFloat(Number(prevTime + time).toFixed(2));
									}
								}
							}
						}
					}) // End of interval forEach.
					data = data.sort((a, b) => { 
						const date1 = new Date(a.date);
						const date2 = new Date(b.date);
						return  date1 - date2 
					});
					mappedData = mapDataToLabels(data, labels);
					datasets.push({label: label, data: mappedData, borderWidth: 1, fill: false});
				}) // End of task forEach.
					let colorArray = buildColorArray(datasets.length)
					let borderArray = buildBorderArray(datasets.length)
					datasets.forEach((dataset, index) => {
						dataset.backgroundColor = colorArray[index];
						dataset.borderColor = borderArray[index];
					})
					let chartData = {
						labels: labels,
						datasets: datasets
					}
					return {
						lineChartTitle: lineChartTitle,
						data: chartData
					} 
				}
				/* End of Line Chart Helper Functions */ 

				if (display !== "task") {
					let taskObj = [];

					tasks.forEach((task) => {
						let included = taskObj.filter(obj => obj.display === task[display] || (obj.display === "[blank]" && task[display] === ""));
						if (included.length < 1) {
							if (task[display] === "") {
								taskObj.push({display: "[blank]", taskCount: 1, timeintervals: task.timeintervals})
							} else {
								taskObj.push({display: task[display], taskCount: 1, timeintervals: task.timeintervals})			
							}
						} else {
							let index = taskObj.findIndex(obj => (obj.display === task[display] || (obj.display ==="[blank]" && task[display] === "")));
							taskObj[index].taskCount = taskObj[index].taskCount + 1;
							taskObj[index].timeintervals = taskObj[index].timeintervals.concat(task.timeintervals)
						}
					}) 
					return processLineTasks(taskObj, display);					 
				} else {
					return processLineTasks(tasks);
				}
			}

		function getBarChartHeight(length) {
			return (30 * length) + 100;
		}
		/* !!!!HELPER FUNCTIONS END!!!! */

		/* !!!!WORK STARTS HERE!!!! */ 
		let chartData = {
			barChartData: {},
			pieChartData: {},
			lineChartData: {}
		}; 

		//Translate start and end strings to timestamps. 
		const startTs = formatStartStop(this.state.start, "start");
		const endTs = formatStartStop(this.state.end, "stop");
		let firstStart;
		let lastStop;

		//Proper cased display heading for use in Chart Titles. 
		const displayHeading = this.state.display.charAt(0).toUpperCase() +  
			this.state.display.substr(1);


		const lineChartTitle = displayHeading + " Hours by Day";

		let tasks = filterByStatus(this.state.status, this.props.tasks)
		tasks = filterByDate(tasks, this.state.start, this.state.end, startTs, endTs);
		let barAndPie = barAndPieData(tasks.tasks, this.state.display, displayHeading);
		let barChartHeight = getBarChartHeight(barAndPie.barChartData.labels.length);
		if (this.state.start === "") {
			firstStart = tasks.firstStart;
		} else {
			firstStart = startTs;
		}
		if (this.state.end === "") {
			lastStop = tasks.lastStop;
		} else {
			lastStop = endTs;
		}
		let lineChartLabels = getLineChartDates(firstStart, lastStop);
		let lineChartData = getLineChartData(tasks.tasks, this.state.display, lineChartLabels);

		chartData.barChartTitle = barAndPie.barChartTitle;
		chartData.pieChartTitle = barAndPie.pieChartTitle;
		chartData.barChartData = barAndPie.barChartData;
		chartData.pieChartData = barAndPie.pieChartData;
		chartData.barChartHeight = barChartHeight;
		chartData.lineChartData = lineChartData
		
		this.setState({chartData: chartData});
	}	

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
				<form id='chartSettings' onSubmit={this.getChartData}>
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
						{ this.state.chartData.barChartData.labels.length > 0 && 
							<BarChart 
								data={this.state.chartData.barChartData}
								title={this.state.chartData.barChartTitle}
								height={this.state.chartData.barChartHeight}
							/>
						}
						{ this.state.chartData.barChartData.labels.length === 0 &&
							<EmptyBarChart 
								title={this.state.chartData.barChartTitle}
							/>
						}
						{this.state.chartData.lineChartData.data.datasets > 0 && 
							<LineChart
								title={this.state.chartData.lineChartData.lineChartTitle}
								data={this.state.chartData.lineChartData.data}
							/>
						}
						<PieChart
							data={this.state.chartData.pieChartData}
							title={this.state.chartData.pieChartTitle}
						/>

					</Col>
				</Row>
			</Grid>
		)
	}
}