import React from 'react';
import { PropTypes } from 'prop-types';

const UserMenu = props => (
	<div className='userMenu'>
		<p>{props.userEmail}</p>
		<button className='userMenuButton' onClick={ () => props.openCharts() }>Charts</button>
		<button className='userMenuButton' onClick={ () => props.attemptSignOut() }>Sign Out</button>
	</div>
);

UserMenu.propTypes = {
	attemptSignOut: PropTypes.func.isRequired,
	openCharts: PropTypes.func.isRequired,
	userEmail: PropTypes.string.isRequired
};


export default UserMenu;