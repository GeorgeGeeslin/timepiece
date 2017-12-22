import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { googleProvider } from '../firebase';
import GoogleButton from 'react-google-button'

export default class Login extends Component {
	static propTypes = {
		attemptLogin: PropTypes.func.isRequired,
		checkLoginStatus: PropTypes.func.isRequired,
		pendingLogin: PropTypes.bool.isRequired,
	};

	componentWillMount(){
		this.props.checkLoginStatus()
	}

	login(provider) {
		this.setState({pendingLogin: true})
		this.props.attemptLogin(googleProvider)
	}
	
	render() {
		return (
			<div>
				<h1>Timepiece</h1>
				<div className='signInContainer'>
					{this.props.pendingLogin === false && 
						<div>
							<GoogleButton className='googleSignIn' onClick={ () => this.login(googleProvider) } />
						</div>
					}
					{this.props.pendingLogin === true &&
						<div className='loader'>
						</div>
					}
				</div>
			</div>
		)
	}
}