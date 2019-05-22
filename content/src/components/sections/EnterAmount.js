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
			amount: '',
			errorMessage: '',
			amountIsValid: false
		}
	}

	validateAmount(event) {
		const amount = event.target.value

		const match = /[1-9]\d*(?:\.\d{0,2})?/.test(amount)

		function countDecimals(num) {
			var sep = String(23.32).match(/\D/)[0]
			var b = String(num).split(sep)
			return b[1] ? b[1].length : 0
		}
		const numDigits = countDecimals(amount)
		if (numDigits > 2) {
			return
		}

		if (match) {
			console.log('is true')
			this.setState({ amountIsValid: true, amount: amount })
		} else {
			this.setState({
				amount: amount,
				amountIsValid: false
			})
		}
	}

	onSubmit() {
		if (this.state.amount > 0.5) {
			this.props.startTransaction(this.props.splashtag, this.state.amount)
		} else {
			this.setState({ shakeInput: true }, () => {
				const self = this
				setTimeout(() => self.setState({ shakeInput: false }), 600)
			})
		}
	}

	render() {
		const {
			splashtag,
			amount,
			user_id,
			extension_uuid,
			goTo,
			isStartingTransaction,
			startTransaction,
			updateAmount
		} = this.props

		return (
			<ContentWrapper>
				<ContentTitle>How much money (in USD) do you need?</ContentTitle>
				<div style={{ height: '25px' }} />
				<Input
					isValid
					autoFocus
					type="number"
					placeholder="e.g. 24.99"
					handleChange={e => {
						updateAmount(e.target.value)
					}}
				/>
				<Hint>
					After you authorize on your phone, we’ll load this amount on a magic
					one-time credit card.
				</Hint>

				<Button
					disabled={isStartingTransaction}
					loading={isStartingTransaction}
					onClick={() => startTransaction(splashtag, amount, user_id, extension_uuid)}
				>
					Confirm USD amount
				</Button>
				<SecuredBy />
			</ContentWrapper>
		)
	}
}

const Hint = ({ children }) => (
	<div className="Hint">
		<SmileLogo width="60px" color={colors.primary} />
		<div className="Hint-content">{children}</div>
		<style jsx global>{`
			.Hint {
				display: flex;
				margin: 30px 0 10px;
				padding: 0 3px;
				max-height: 54px;
			}

			.Hint svg {
				margin-top: 4px;
			}

			.Hint-content {
				text-align: left;
				margin-left: 12px;
				font-weight: 500;
				color: ${colors.grey};
				font-size: 14px;
			}
		`}</style>
	</div>
)
