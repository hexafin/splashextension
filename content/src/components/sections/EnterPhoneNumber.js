import React from 'react'
import Button from '../universal/Button'
import { colors, fonts } from '../../lib/constants'
import SecuredBy from '../universal/SecuredBy'
import ContentWrapper from '../universal/ContentWrapper'
import ContentTitle from '../universal/ContentTitle'
import Input from '../universal/Input'
import { SmileLogo } from '../universal/Icons'
import SplashCircle from '../../assets/Splash-Circle.png'

export default class EnterPhoneNumber extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	phoneNumberValue: '',
	  };
	}

	render() {
		const {
				goTo,
				Authenticate,
				isAuthenticating,
				errorAuthenticating,
			} = this.props
		return(
		<ContentWrapper>
			<ContentTitle center>
				Welcome to Splash!
			</ContentTitle>
			<img
				className="Splash-image"
				src={chrome.extension.getURL(SplashCircle)}
			/>
			<div className="MiddleContent">
				Enter your phone number to <br/> connect your account
			</div>
			<Input
				isValid
				autoFocus
				type="number"
				placeholder="e.g. 9171234567"
				handleChange={e => {
					const value = e.target.value.substring(0, 10)
					this.setState({'phoneNumberValue': value})
				}}
				value={this.state.phoneNumberValue}
			/>
			<div className="WaitForCode-text">
				We’ll send your phone <br/> a confirmation code
			</div>
			<Button
				id="sign-in-button"
				loading={isAuthenticating}
				disabled={isAuthenticating}
				onClick={() => Authenticate(this.state.phoneNumberValue)}
			>
				Get my code
			</Button>
			<SecuredBy />
			<style jsx global>
				{`
					.Splash-image {
						height: 48px;
						width: 113px;
						margin: 15px auto 15px;
						position: relative;
						right: 4px;
					}
					.MiddleContent {
						font-weight: 600;
						font-size: 13px;
						text-align: center;
						margin-bottom: 12px;
					}
					.WaitForCode-text {
						text-align: center;
						font-weight: 500;
						color: ${colors.grey};
						font-size: 14px;
						transition: all 150ms ease;
						padding-top: 18px;
					}
					`}
			</style>
		</ContentWrapper>
	)}
}