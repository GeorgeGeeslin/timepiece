import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

export default class UserHeader extends Component {
	static propTypes = {
		attemptSignOut: PropTypes.func.isRequired,
		openCharts: PropTypes.func.isRequired,
		user: PropTypes.object.isRequired
	}

	state = {
		profileDropDown: false,
		userIconDisabled: false
	}

	componentDidUpdate(prevState, prevProps) {
		if (prevProps.profileDropDown === false && this.state.profileDropDown === true) {
			document.getElementById("userProfileDropDown").focus();
		}
	}

	openDropDown = (dropDown) => {
		if (dropDown === false && this.state.userIconDisabled === false) {
			this.setState({
				profileDropDown: true,
				userIconDisabled: true
			});
		} 
	}

	closeDropDown = (dropDown) => {
		if (dropDown === true) {
			this.setState({
				profileDropDown: false,
				userIconDisabled: false
			});
		}
	}

	render () {
		return (
			<div>
			<div className='masthead'>
				<button onClick={ () => this.props.openCharts()}>Charts</button>
				<span className={['timepieceLogo', 'mastheadLogo'].join(' ')}>Timepiece</span>
				{ this.state.userIconDisabled === true &&
					<button className='userAvatar'>
						<img src={this.props.user.photoURL} alt='User Icon' />
					</button>
				}
				{ this.state.userIconDisabled === false &&
					<button onClick={ () => this.openDropDown(this.state.profileDropDown)} 
					disabled={this.state.userIconDisabled} className='userAvatar'>
					<img src={this.props.user.photoURL} alt='User Icon' />
				</button>
				}
				<span className='displayName'>{this.props.user.displayName}</span>
			</div>
				{ this.state.profileDropDown === true &&
					<Grid>
						<Row>
							<Col tabIndex='0' className='userProfileDropDown' sm={12} md={4} lg={3} id='userProfileDropDown'
								onBlur={ () => this.closeDropDown(this.state.profileDropDown)}>
							<p>{this.props.user.email}</p>
							<p className='signOut' onClick={ () => this.props.attemptSignOut()}>Sign Out</p>
							<button onClick={ () => this.props.openCharts()}>Charts</button>
							</Col>
						</Row>
					</Grid>
			  }
			</div>
		)
	} 
};

