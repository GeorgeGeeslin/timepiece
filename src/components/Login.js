import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { googleProvider } from '../firebase';

export default class Login extends Component {
	//static propTypes = {

		//};
	
	render() {
		return (
			<div>
				<h3 onClick={ () => this.props.attemptLogin(googleProvider) }>Sign In With Google</h3>
				<h3 onClick={ () => this.props.attemptSignOut()}>Sign Out</h3>
			</div>
		)
	}
}