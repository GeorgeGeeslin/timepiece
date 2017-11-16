import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

export default class UserHeader extends Component {
	/*static propTypes = {
	
	}*/

	state = {
		profileDropDown: false
	}

	componentDidUpdate(prevProps) {
		console.log(prevProps)
		if (prevProps.profileDropDown === false && this.state.profileDropDown === true) {
			document.getElementById("userProfileDropDown").focus();
		}
	}

	toggleDropDown = (dropDown) => {
		this.setState({profileDropDown: !dropDown});
	}

	closeDropDown = (dropDown) => {
		if (dropDown === true) {
			this.setState({profileDropDown: false});
		}
	}

	render () {
		return (
			<div>
			<div className='masthead'>
				<button tabIndex='0' onClick={ () => this.toggleDropDown(this.state.profileDropDown)}className='userAvatar' id='userAvatar'>
					<img src={this.props.user.photoURL} alt='User Icon' />
				</button>
				<span className='displayName'>{this.props.user.displayName}</span>
			</div>
				{ this.state.profileDropDown === true &&
					<Grid>
						<Row>
							<Col tabIndex='0' className='userProfileDropDown' sm={12} md={4} lg={3} id='userProfileDropDown'
								onBlur={ () => this.closeDropDown(this.state.profileDropDown)}>
							<p>{this.props.user.email}</p>
							<button className='control-buttons' onClick={ () => this.props.attemptSignOut()}>Sign Out</button>
							</Col>
						</Row>
					</Grid>
			  }
			</div>
		)
	} 
};

