import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { googleProvider, facebookProvider } from '../firebase';
import GoogleButton from 'react-google-button'
//import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const fbLogo = require("../images/fb_logo50.png");

export default class Login extends Component {
	static propTypes = {
		attemptLogin: PropTypes.func.isRequired,
		checkLoginStatus: PropTypes.func.isRequired,
		pendingLogin: PropTypes.bool.isRequired,
	};

	state = {
		userName:'',
		email: '',
		password: '',
		confirmPassword: '',
		createUser: false
	};

	componentWillMount(){
		this.props.checkLoginStatus()
	}

	login(provider) {
		this.setState({pendingLogin: true})
		this.props.attemptLogin(provider)
	}

	onUserNameChange = (e) => {
		const userNameField = document.getElementById("userName");
		if (userNameField.className === 'inputError') {
			userNameField.classList.remove('inputError')
		}
		const userName = e.target.value;
		this.setState({userName: userName});
	};

	onEmailChange = (e) => {
		const emailField = document.getElementById("email");
		if (emailField.className === 'inputError') {
			emailField.classList.remove('inputError')
		}
		const email = e.target.value;
		this.setState({email: email});
	};

	onPasswordChange = (e) => {
		const passwordField = document.getElementById("password");
		if (passwordField.className === 'inputError') {
			passwordField.classList.remove('inputError')
		}
		const password = e.target.value;
		this.setState({password: password});
	};

	onConfirmPasswordChange = (e) => {
		const passwordField = document.getElementById("password");
		if (passwordField.className === 'inputError') {
			passwordField.classList.remove('inputError')
		}
		const password = e.target.value;
		this.setState({confirmPassword: password});
	};

/*

	showSignIn = (e) => {
		const updateState = () => {
			this.setState({
				userName: '',
				email: '',
				password: '',
				confirmPassword: '',
				createUser: false
			})
		}
		if (e) e.preventDefault();
		const forum = document.getElementById('signUp');
		forum.classList.add('signin-transition');
		setTimeout(updateState, 250);
	}

	showSignUp = (e) => {
		if (e) e.preventDefault();

		//const forum = document.getElementById("")

		this.setState({
			userName: '',
			email: '',
			password: '',
			createUser: true
		})
	}
*/

toggleSignUp = (e) => {
	if (e) e.preventDefault();

	/*if (this.state.createUser === true) {
		const signInState = () => {
			this.setState({
				userName: '',
				email: '',
				password: '',
				confirmPassword: '',
				createUser: false
			})		
		}
		let forum = document.getElementById('signUp');
		forum.classList.add('signin-transition');
		setTimeout(signInState, 250);
		forum = document.getElementById('signIn');
		forum.classList.add('signup-transition')

	} else {

	}*/

	if (this.state.createUser === false) {
		const signUpState = () => {
			this.setState({
				userName: '',
				email: '',
				password: '',
				confirmPassword: '',
				createUser: true
			})	
		}
		let forum = document.getElementById('signIn');
		forum.classList.add('signin-transition');
		setTimeout(signUpState, 250);
	} else {
		const signInState = () => {
			this.setState({
				userName: '',
				email: '',
				password: '',
				confirmPassword: '',
				createUser: false
			})
		}
		let forum = document.getElementById('signUp');
		forum.classList.add('signup-transition');
		setTimeout(signInState, 250);
	}


}

/*
	createUser = (e) => {
		if (e) e.preventDefault();
		if (this.state.userName.length === 0) {
			const userNameField = document.getElementById("userName");
			userNameField.classList.add('inputError');
				this.setState({
					userName: '',
					password: ''
				})
		}
	}

	signIn = (e) => {
	
	}
*/


	render() {

		const fbLogoStyle = {
			display: 'inline-block',
		  float: 'left',
		  textAlign: 'center',
		  content: 'url('+fbLogo+')',
		  marginLeft: '-45px',
		  marginRight: '17px',
		  width: '48px'
		}

		return (
			<div>
				<h1 className='timepieceLogo' style={{marginTop: '25px'}}>Timepiece</h1>
				<div className='signInContainer'>
					{this.props.pendingLogin === false && 
						<div>
							<GoogleButton className='googleSignIn' onClick={ () => this.login(googleProvider) } />
						</div>
					}
					{this.props.pendingLogin === false &&
						<div className='signInSeparator'>
							<div className={['loginBtn', 'facebookSignIn'].join(' ')} onClick={ () => this.login(facebookProvider)}>
								<img src={fbLogo} style={fbLogoStyle}/>
								Sign in with Facebook
							</div>
						</div>
					}
					{this.props.pendingLogin === false && this.state.createUser === true && 
						<div id='signUp' className='signInSignUp' style={{maxWidth: '500px', width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px', textAlign: 'center'}}>
							<form  onSubmit={this.createUser}>
								<input id='email'
									type='text'
									value={this.state.email}
									onChange={this.onEmailChange}
									placeholder='Email'
								/>
								<input id='password'
									type='password'
									value={this.state.password}
									onChange={this.onPasswordChange}
									placeholder='Password'
								/>
								<input id="confirm_password"
									type='password'
									value={this.state.confirmPassword}
									onChange={this.onConfirmPasswordChange}
									placeholder='Confirm Password'
								/>
								<input className='control-buttons' style={{marginTop: '30px'}}
									type='submit'
									value='Sign Up'
								/>
							</form>
							<a href='#' onClick={() => this.toggleSignUp()}>
								Already have an account? Sign In
							</a>
						</div>
					}
					{this.props.pendingLogin === false && this.state.createUser === false &&
						<div id ='signIn' className='signInSignUp' style={{maxWidth: '500px', width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px', textAlign: 'center'}}>
							<form style={{maxWidth: "500px"}} onSubmit={this.signIn}>
								<input id='email'
									type='text'
									value={this.state.email}
									onChange={this.onEmailChange}
									placeholder='Email'
								/>
								<input id='password'
									type='password'
									value={this.state.password}
									onChange={this.onPasswordChange}
									placeholder='Password'
								/>
								<input className='control-buttons' style={{marginTop: '30px'}}
									type='submit'
									value='Sign In'
								/>
							</form>
							<a href='#' onClick={() => this.toggleSignUp()}>
								Don't have an account yet? Sign Up
							</a>							
						</div>
					}
					{this.props.pendingLogin === true &&
						<div className='loader'>
						</div>
					}
					{this.props.loginError === true && 
						<div className="validationError" style={{marginTop: "15px"}}>
							<p>{"Code: " + this.props.loginErrorCode}</p>
							<p>{"Message: " + this.props.loginErrorMsg}</p>
						</div>
					}
				</div>
			</div>
		)
	}
}