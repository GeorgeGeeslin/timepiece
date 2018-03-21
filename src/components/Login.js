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
		createUser: false,
		emailError: false,
		passwordError: false,
		confirmPasswordError: false
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

	toggleSignUp = (e) => {
		if (e) e.preventDefault();
		if (this.state.createUser === false) {
			const signUpState = () => {
				this.setState({
					userName: '',
					email: '',
					password: '',
					confirmPassword: '',
					createUser: true,
					emailError: false,
					passwordError: false,
					confirmPasswordError: false
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
					createUser: false,
					emailError: false,
					passwordError: false,
					confirmPasswordError: false
				})
			}
			let forum = document.getElementById('signUp');
			forum.classList.add('signup-transition');
			setTimeout(signInState, 250);
		}
	};

	validateCreateUser = (e) => {
		if (e) e.preventDefault();
		let errorExists = false;
		let emailError = false;
		let passwordError = false;
		let confirmPasswordError = false;
		function validEmail(email) {
			const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
			return String(email).search (filter) != -1;
		}
		if (validEmail(this.state.email) === false || this.state.email === '') {
			const emailField = document.getElementById('email');
			emailField.classList.add('inputError');
			emailError = true;
			errorExists = true;
		}

		if (this.state.password.length < 7) {
			const passwordField = document.getElementById('password');
			passwordField.classList.add('inputError');
			passwordError = true;
			errorExists = true;
		}

		if (this.state.password !== this.state.confirmPassword) {
			const confirmPasswordField = document.getElementById('confirm_password');
			confirmPasswordField.classList.add('inputError');
			confirmPasswordError = true;
			errorExists = true;
		}
		this.createUser(emailError, passwordError, confirmPasswordError, errorExists)
	}

	createUser = (emailError, passwordError, confirmPasswordError, errorExists) => {
		if (errorExists) {
		console.log("create user")
			this.setState({
				emailError: emailError,
				passwordError: passwordError,
				confirmPasswordError: confirmPasswordError
			})
		} else {
			//Success
		}
	}


/*
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
							<form  onSubmit={this.validateCreateUser}>
								{this.state.emailError && <span className='inputErrorSpan'>Invalid Email Address</span>}
								<input id='email'
									type='text'
									value={this.state.email}
									onChange={this.onEmailChange}
									placeholder='Email'
								/>
								{this.state.passwordError && <span className='inputErrorSpan'>Password Is Too Short</span>}
								<input id='password'
									type='password'
									value={this.state.password}
									onChange={this.onPasswordChange}
									placeholder='Password (8 or more characters)'
								/>
								{this.state.confirmPasswordError && <span className='inputErrorSpan'>Password Does Not Match</span>}
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