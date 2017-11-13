import React from 'react';
import { PropTypes } from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

const UserHeader = ({user}) => {
	if (user) {
		return (
						<div className='masthead'>
							<button className='userAvatar'>
								<img src={user.photoURL} alt='User Icon' />
							</button>
							<span className='displayName'>{user.displayName}</span>
						</div>
		)
	} 
	else {
		return null;
	}
};


/*
required prop types
 */

export default UserHeader;