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
		createUser: true
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

	showSignIn = (e) => {
		if (e) e.preventDefault();
		this.setState({
			userName: '',
			email: '',
			password: '',
			createUser: false
		})
	}

	showSignUp = (e) => {
		if (e) e.preventDefault();
		this.setState({
			userName: '',
			email: '',
			password: '',
			createUser: true
		})
	}


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
						<div className='signInSignUp' style={{maxWidth: '500px', width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px', textAlign: 'center'}}>
							<form  onSubmit={this.createUser}>
								<input id='userName'
									type='text'
									value={this.state.userName}
									onChange={this.onUserNameChange}
									placeholder='User Name'
								/>
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
									value='Sign Up'
								/>
							</form>
							<a href='#' onClick={() => this.showSignIn()}>
								Already have an account? Sign In
							</a>
						</div>
					}
					{this.props.pendingLogin === false && this.state.createUser === false &&
						<div className='signInSignUp' style={{maxWidth: '500px', width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px', textAlign: 'center'}}>
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
							<a href='#' onClick={() => this.showSignUp()}>
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