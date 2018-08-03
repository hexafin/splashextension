import React, { Component } from 'react'
import Button from '../universal/Button'
import { colors, fonts } from '../../lib/constants'
import SecuredBy from '../universal/SecuredBy'
import ContentWrapper from '../universal/ContentWrapper'
import ContentTitle from '../universal/ContentTitle'
import Input from '../universal/Input'
import { Link, goTo } from "../../modules/app"
import firebaseApp from "../../firebase"
import firebase from "../../firebase"

export default class extends Component {
	constructor() {
		super()
		this.state = {
			phone: '',
			errorMessage: '',
			phoneIsValid: false
		}
	}

	componentDidMount() {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('link-button', {
		  'size': 'invisible',
		  'callback': function(response) {
		    // reCAPTCHA solved, allow signInWithPhoneNumber.
		    console.log("captcha")
		  }
		});
	}

	validatePhone(event) {
		const phone = event.target.value

		if (phone.length >= 10) {
			this.setState({ phoneIsValid: true, phone: phone })
		} else {
			this.setState({
				phone: phone,
				phoneIsValid: false
			})
		}
	}

	onSubmit() {
		firebase.auth().signInWithPhoneNumber(this.state.phone, window.recaptchaVerifier).then(confirmationResult => {
			window.confirmationResult = confirmationResult
			goTo("CONFIRM_CODE")
		}).catch(error => {
			alert("An error occurred: "+error.toString())
		})
	}

	render() {
		const isLinking = false
		return (
			<ContentWrapper>
				<ContentTitle>What's your phone number?</ContentTitle>
				<div style={{ height: '25px' }} />
				<Input
					isValid
					autoFocus
					type="text"
					placeholder="+19876543210"
					value={this.state.phone}
					showCheckmark={this.state.phoneIsValid}
					handleChange={e => this.validatePhone(e)}
					shakeAnimation={this.state.shakeInput}
				/>

				<div id="recaptcha-container"></div>

				<Button
					disableClickOnly={isLinking}
					disabled={!this.state.phoneIsValid && this.state.phone.length > 10}
					loading={isLinking}
					id={"link-button"}
					onClick={() => this.onSubmit()}
				>
					Send me a code
				</Button>

				<SecuredBy />
			</ContentWrapper>
		)
	}
}