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
import { goTo } from "../modules/app"

const Components = {
	ENTER_SPLASHTAG: EnterSplashtag,
	PROMPT_FOR_PAY: PromptForPay
}

const App = ({ activeComponent, goTo }) => {
	const ActiveComponent = Components[activeComponent]
	return (
		<StyleReset>
			<ActiveComponent />
		</StyleReset>
	)
}

// handleClick(e) {
// 	axios
// 		.post(
// 			"https://us-central1-hexa-splash.cloudfunctions.net/initializeTransaction",
// 			{
// 				userId: "TGntKESxtoez4eKnc27R6wgsjr43",
// 				extensionId: "sample-extension-id",
// 				relativeAmount: this.state.relativeAmount,
// 				relativeCurrency: "USD",
// 				domain: this.state.domain
// 			}
// 		)
// 		.then(response => {
// 			console.log(response)
// 		})
// 		.catch(error => {
// 			console.log(error)
// 		})
// }

const mapStateToProps = state => {
	return {
		...state.app
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ goTo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
