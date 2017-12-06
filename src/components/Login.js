import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { googleProvider } from '../firebase';
import GoogleButton from 'react-google-button'

export default class Login extends Component {
	//static propTypes = {

		//};
		//
	componentDidMount() {
		this.props.checkLoginStatus()
	}
	
	render() {
		return (
			<div>
			<h1>Timepiece</h1>
				<div className='signInContainer'>
					<GoogleButton className='googleSignIn' onClick={ () => this.props.attemptLogin(googleProvider) } />
				</div>
			</div>
		)
	}
}