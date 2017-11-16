import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

export default class UserHeader extends Component {
	/*static propTypes = {
	
	}*/

	state = {
		profileDropDown: false
	}

	toggleDropDown = (dropDown) => {
			this.setState({profileDropDown: !dropDown});	
	}

	render () {
		return (
			<div>
			<div className='masthead'>
				<button tabIndex='0' 
					onClick={ (e) => this.toggleDropDown(this.state.profileDropDown, e) }className='userAvatar'>
					<img src={this.props.user.photoURL} alt='User Icon' />
				</button>
				<span className='displayName'>{this.props.user.displayName}</span>
			</div>
				{ this.state.profileDropDown === true &&
					<Grid>
						<Row>
							<Col className='userProfileDropDown' sm={12} md={4} lg={3}>
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

