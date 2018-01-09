import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import UserMenu from './UserMenu.js';

export default class UserHeader extends Component {
	static propTypes = {
		attemptSignOut: PropTypes.func.isRequired,
		openCharts: PropTypes.func.isRequired,
		openUserMenu: PropTypes.func.isRequired,
		closeUserMenu: PropTypes.func.isRequired,
		showUserMenu:PropTypes.bool.isRequired,
		user: PropTypes.object.isRequired
	}

	toggleUserMenu = () => {
		if (this.props.showUserMenu === false ) {
			this.props.openUserMenu();
		} else {
			this.props.closeUserMenu();
		}
	}

	render () {
		return (
			<div>
				<div className='masthead'>
					<span className={['timepieceLogo', 'mastheadLogo'].join(' ')}>Timepiece</span>
					<button className='userAvatar' onClick={ () => this.toggleUserMenu()}>
						<img src={this.props.user.photoURL} alt='User Icon' />
					</button>
					<span className='displayName'>{this.props.user.displayName}</span>
				</div>
				{ this.props.showUserMenu === true && 
					<UserMenu className='userMenu'
						userEmail={this.props.user.email}
						attemptSignOut={this.props.attemptSignOut}
						openCharts={this.props.openCharts}
					/>
				}
			</div>
		)
	} 
};

