import React, { Component } from 'react'
import Button from '../universal/Button'
import successImg from '../../assets/success.png'
import cardSmall from '../../assets/cardSmall.png'
import { colors, fonts, defaults } from '../../lib/constants'
import SecuredBy from '../universal/SecuredBy'
import ContentWrapper from '../universal/ContentWrapper'
import ContentTitle from '../universal/ContentTitle'
import Card from '../universal/Card'
import ExpandableBox from '../universal/ExpandableBox'
import { creditCard } from '../../lib/creditCard'

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showCard: true
		}
		this.toggleCard = this.toggleCard.bind(this)
	}

	componentDidMount() {
		console.log('exp', creditCard.getExpiryField())
		console.log('number', creditCard.getNumberField())
		console.log('cvc', creditCard.getCVCField())
	}

	toggleCard() {
		this.setState({ showCard: !this.state.showCard })
	}

	render() {
		const { card, amount, goTo } = this.props
		// TODO: use card details from redux state

		const { showCard } = this.state
		return (
			<ContentWrapper>
				<ContentTitle>
					Card created. Click the numbers to copy! <br />
				</ContentTitle>
				<img
					className="CardCreated-image"
					src={chrome.extension.getURL(successImg)}
				/>
				<div
					onClick={() => console.log('click')}
					className="CardCreated-cardHeaderSection"
				>
					<img className="CardCreated-cardSmall" src={cardSmall} />
					<div className="CardCreated-cardHeader">
						USD ${parseFloat(amount).toFixed(2)}
					</div>
				</div>
				{showCard && (
					<div className="CardCreated-cardWrap">
						<Card
							expiration={{ month: '09', year: '20' }}
							number="4323444433323493"
							cvc="665"
							postal="802223"
						/>
					</div>
				)}
				<div className="CardCreated-support">
					<ExpandableBox title="My card won't work">
						We apologize, bitcoin > banks. Check that everything is correct, but
						don’t worry, we’ll automatically return the money to your Splash
						account if you don’t use it within one hour.
					</ExpandableBox>
					<div className="CardCreated-text">
						<a onClick={() => goTo('PROMPT_FOR_PAY')}>
							Wrong amount? Start over!
						</a>
					</div>
					<div className="CardCreated-text final">
						Need help? <a href="mailto:support@hexafinancial.com">Reach out!</a>
					</div>
				</div>
				<div style={{ height: '20px' }} />

				<style jsx global>
					{`
						.CardCreated-image {
							height: 96px;
							margin: 30px auto 33px;
							position: relative;
							right: 4px;
						}

						.CardCreated-cardHeaderSection {
							display: flex;
							align-items: center;
							// cursor: pointer;
						}

						.CardCreated-cardSmall {
							width: 50px;
						}

						.CardCreated-cardWrap {
							margin: 20px 0 0;
						}

						.CardCreated-cardHeader {
							margin-left: 12px;
							font-weight: 500;
							user-select: none;
							color: ${colors.primary};
							// color: ${showCard ? colors.primary : colors.fontdark};
						}

						.CardCreated-cardHeader:hover {
							color: ${colors.primaryHover};
						}

						.CardCreated-link {
							cursor: pointer;
						}
						.CardCreated-link:hover {
							color: ${colors.primaryHover};
						}

						.CardCreated-support {
							margin-top: 25px;
						}

						.CardCreated-text {
							text-align: left;
							font-weight: 500;
							color: ${colors.grey};
							font-size: 14px;
							transition: all 150ms ease;
							margin-bottom: 7px;
						}

						.CardCreated-text .final {
							margin-bottom: 0;
						}
					`}
				</style>
			</ContentWrapper>
		)
	}
}
