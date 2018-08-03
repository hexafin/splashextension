import React, { Component } from 'react'
import Button from '../universal/Button'
import { colors, fonts } from '../../lib/constants'
import SecuredBy from '../universal/SecuredBy'
import ContentWrapper from '../universal/ContentWrapper'
import ContentTitle from '../universal/ContentTitle'
import Input from '../universal/Input'
import { SmileLogo } from '../universal/Icons'

export default class extends Component {
	constructor() {
		super()
		this.state = {
			code: '',
			errorMessage: '',
			codeIsValid: false
		}
	}

	validateCode(event) {
		const code = event.target.value

		if (code.length == 6) {
			this.setState({ codeIsValid: true, code: code })
		} else {
			this.setState({
				code: code,
				codeIsValid: false
			})
		}
	}

	onSubmit() {
		// TODO
	}

	render() {
		const isVerifyingCode = false
		return (
			<ContentWrapper>
				<ContentTitle>Enter the code we just sent you</ContentTitle>
				<div style={{ height: '25px' }} />
				<Input
					isValid
					autoFocus
					type="number"
					placeholder="e.g. 24.99"
					value={this.state.code}
					showCheckmark={this.state.codeIsValid}
					handleChange={e => this.validateCode(e)}
					shakeAnimation={this.state.shakeInput}
				/>

				<Button
					disableClickOnly={isVerifyingCode}
					disabled={!this.state.codeIsValid && this.state.code.length > 0}
					loading={isVerifyingCode}
					onClick={() => this.onSubmit()}
				>
					Link extension
				</Button>

				<SecuredBy />
			</ContentWrapper>
		)
	}
}