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


	/*componentDidMount() {
		console.log('did mount')
	//	this.setState({pendingLogin: true})
	//	this.props.checkLoginStatus()
	}*/

	componentWillMount(){
		console.log('will mount')
		//this.setState({pendingLogin: true})
		this.props.checkLoginStatus()
	}

/*	componentDidUpdate() {
		//console.log(this.props.pendingLogin)
		console.log("componentDidUpdate")
	}*/

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
						<div>
							<h2>LOADING</h2>
						</div>
					}
				</div>
			</div>
		)
	}
}