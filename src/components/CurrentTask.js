import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

export default class CurrentTask extends Component {
	static propTypes = {
		selectTask: PropTypes.func.isRequired,
		deleteTask: PropTypes.func.isRequired,
		openEdit: PropTypes.func.isRequired,
		client: PropTypes.string.isRequired,
		project: PropTypes.string.isRequired,
		task: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		taskKey: PropTypes.string.isRequired,
		uid: PropTypes.string.isRequired,
		formatTime: PropTypes.func.isRequired,
		secondsElapsed: PropTypes.number.isRequired
	}

	state = {
		showConfirmDelete: false,
		height: "0px"
	}

	componentDidMount() {
		let task = document.getElementsByClassName("tasks")[0]
		let taskHeight = task.offsetHeight;
		this.setState({height: taskHeight+"px"})
	}

	openConfirmDelete() {
		this.setState({showConfirmDelete: true})
	}

	closeConfirmDelete() {
		this.setState({showConfirmDelete: false})
	}

	deleteTask() {
		this.props.deleteTask(this.props.uid, this.props.taskKey, this.props.selectedTaskIndex)
		this.setState({showConfirmDelete: false})
	}


	render () {
		let height = this.state.height

		return (
			<div>
			{ this.state.showConfirmDelete === false && 
			<Grid className='tasks'>
				<Row style={{marginLeft: '0px'}}>
					<Row style={{width: '100%'}}>
						<Col xs={12} sm={9}>
							<p><span className='taskLabel'>TASK: </span>{this.props.task}</p>
							<p><span className='taskLabel'>PROJECT: </span>{this.props.project}</p>
							<p><span className='taskLabel'>CLIENT: </span>{this.props.client}</p>
						</Col>
						<Col xs={12} sm={3} className='timeLabelContainer'>
							<p className='timeLabel'>{this.props.formatTime(this.props.secondsElapsed)}</p>
						</Col>
					</Row>
					<Col className='task-button-container' sm={12}>
						<button
							className='task-buttons' 
							onClick={() => this.props.selectTask(this.props.taskKey)}>
							SELECT
						</button>
						<button
							className='task-buttons'
							onClick={ () => this.openConfirmDelete()}>
							DELETE
						</button>
						<button
							className='task-buttons'
							onClick={ () => this.props.openEdit(this.props.taskKey)}>
							EDIT
						</button>
					</Col>
				</Row>
			</Grid>
		}
		{this.state.showConfirmDelete === true && 
		<Grid className='tasks' style={{height: height, position: "relative"}}>
			<Row style={{marginLeft: '0px'}}>
				<Col sm={12}>
						<h3>Delete this task?</h3>
						<p>{this.props.task}</p>
				</Col>
			</Row>
			<Row style={{marginLeft: '0px', position: "absolute", bottom: "0", width: "100%"}}>
				<Col className='task-button-container' sm={12}>
					<button className='task-buttons' 
						onClick={ () => this.deleteTask()}>
						DELETE 
					</button>
					<button className='task-buttons' 
						onClick={ () => this.closeConfirmDelete()}>
						CANCEL
					</button>
				</Col>
			</Row>
			</Grid>
		}
		</div>
		)
	}
}



