import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { colors, defaults, fonts } from "../lib/constants"
import Button from "./universal/Button"
import { LogoSmallColor } from "./universal/Icons"
import Input from "./universal/Input"
import StyleReset from "./StyleReset"
import axios from "axios"
import EnterSplashtag from "./sections/EnterSplashtag"
import PromptForPay from "./sections/PromptForPay"
import HowItWorks from "./sections/HowItWorks"
import EnterAmount from "./sections/EnterAmount"
import WaitForAuthorization from "./sections/WaitForAuthorization"
import WaitForCard from "./sections/WaitForCard"
import CardCreated from "./sections/CardCreated"
import { goTo, startTransaction, updateAmount, updateCard } from "../modules/app"

const Components = {
	ENTER_SPLASHTAG: EnterSplashtag,
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
	return bindActionCreators({ goTo, startTransaction, updateAmount, updateCard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
