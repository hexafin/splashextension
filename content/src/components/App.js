import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors, defaults, fonts } from '../lib/constants'
import Button from './universal/Button'
import { LogoSmallColor } from './universal/Icons'
import Input from './universal/Input'
import StyleReset from './StyleReset'
import axios from 'axios'
import EnterPhoneNumber from './sections/EnterPhoneNumber'
import PromptForPay from './sections/PromptForPay'
import HowItWorks from './sections/HowItWorks'
import EnterAmount from './sections/EnterAmount'
import WaitForAuthorization from './sections/WaitForAuthorization'
import WaitForCard from './sections/WaitForCard'
import CardCreated from './sections/CardCreated'
// import Landing from './sections/Landing'
import ConfirmCode from './sections/ConfirmCode'
// import SuccessfullyLinked from './sections/SuccessfullyLinked'
import {
	goTo,
	startTransaction,
	updateAmount,
	updateCard
} from '../modules/app'

const Components = {
	// LANDING: Landing,
	ENTER_PHONE_NUMBER: EnterPhoneNumber,
	CONFIRM_CODE: ConfirmCode,
	// SUCCESSFULLY_LINKED: SuccessfullyLinked,
	PROMPT_FOR_PAY: PromptForPay,
	HOW_IT_WORKS: HowItWorks,
	ENTER_AMOUNT: EnterAmount,
	WAIT_FOR_AUTHORIZATION: WaitForAuthorization,
	WAIT_FOR_CARD: WaitForCard,
	CARD_CREATED: CardCreated
}

const App = props => {
	const ActiveComponent = Components[props.activeComponent]
	return (
		<StyleReset>
			<style
				dangerouslySetInnerHTML={{
					__html: `
       @keyframes shake {
                        10%,
                        90% {
                            transform: translate3d(-1px, 0, 0);
                        }

                        20%,
                        80% {
                            transform: translate3d(2px, 0, 0);
                        }

                        30%,
                        50%,
                        70% {
                            transform: translate3d(-4px, 0, 0);
                        }

                        40%,
                        60% {
                            transform: translate3d(4px, 0, 0);
                        }
                    }
    `
				}}
			/>
			<ActiveComponent {...props} />
		</StyleReset>
	)
}

const mapStateToProps = state => {
	return {
		...state.app
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{ goTo, startTransaction, updateAmount, updateCard },
		dispatch
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
