import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class UserMenu extends Component {
	static propTypes = {
		attemptSignOut: PropTypes.func.isRequired,
		openCharts: PropTypes.func.isRequired,
		closeCharts: PropTypes.func.isRequired,
		closeUserMenu: PropTypes.func.isRequired,
		userEmail: PropTypes.string.isRequired,
		showChartScreen: PropTypes.bool.isRequired

	}

	toggleCharts = () => {
		if (this.props.showChartScreen === false) {
			this.props.openCharts();
			this.props.closeUserMenu();
		} else {
			this.props.closeCharts();
			this.props.closeUserMenu();
		}
	}

	render () {
		return (
			<div className='userMenu'>
				<p>{this.props.userEmail}</p>
				<button className='userMenuButton' onClick={ () => this.toggleCharts() }>Charts</button>
				<button className='userMenuButton' onClick={ () => this.props.attemptSignOut() }>Sign Out</button>
			</div>
		)
	}
};



