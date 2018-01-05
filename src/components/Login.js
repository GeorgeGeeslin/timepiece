import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { googleProvider, facebookProvider } from '../firebase';
import GoogleButton from 'react-google-button'
const fbLogo = require("../images/fb_logo50.png");



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
		this.props.attemptLogin(provider)
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
					{this.props.pendingLogin === true &&
						<div className='loader'>
						</div>
					}
				</div>
			</div>
		)
	}
}''