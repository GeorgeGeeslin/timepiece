import React from 'react';
import { PropTypes } from 'prop-types';

const UserMenu = props => (
	<div className='userMenu'>
		<p>{props.userEmail}</p>
		<button className='signOut' onClick={ () => attemptSignOut() }>Sign Out</button>
		<button onClick={ () => openCharts() }>Charts</button>
	</div>
);

UserMenu.propTypes = {
	attemptSignOut: PropTypes.func.isRequired,
	openCharts: PropTypes.func.isRequired,
	userEmail: PropTypes.string.isRequired
};


export default UserMenu;