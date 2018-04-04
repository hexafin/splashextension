import React, { Component } from "react";
import { connect } from "react-redux";
import { colors, defaults, fonts } from "../lib/constants";
import Button from "./universal/Button"
import {LogoSmallColor} from "./universal/Icons"
import Input from "./universal/Input"
import axios from "axios"

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			domain: this.url,
			relativeAmount: null
		}

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		axios.post("https://us-central1-hexa-splash.cloudfunctions.net/initializeTransaction", {
			userId: "TGntKESxtoez4eKnc27R6wgsjr43",
			extensionId: "sample-extension-id",
			relativeAmount: this.state.relativeAmount,
			relativeCurrency: "USD",
			domain: this.state.domain
		}).then(response => {
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
	}

	render() {
		console.log("props", this.props);
		console.log("state", this.state)

		return (
			<div style={styles.wrapper}>
				<div style={styles.header}>
					<div style={styles.logoWrapper}>
						<div style={styles.logo}>
							<LogoSmallColor/>
						</div>
						<div style={styles.title}>Splash</div>
					</div>
					<div style={styles.subtitle}>
						Buy real things with bitcoin
					</div>
				</div>
				<div style={styles.body}>

					How much do you want to spend?

					<Input name={"amount"} type={"number"} value={this.state.relativeAmount}
						onChange={event => {
							console.log(event.target)
							this.setState(prevState => {
								return {
									...prevState,
									relativeAmount: event.target.value
								}
							})
					}}/>
				</div>
				<div style={styles.footer}>
					<Button onClick={this.handleClick}>
						Make a magic card
					</Button>
				</div>
			</div>
		);
	}
}

const styles = {
	wrapper: {
		flex: 1,
		minHeight: 200,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between"
	},
	logoWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		paddingBottom: 10
	},
	header: {
		display: "flex",
		flexDirection: "column",
		padding: 15
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		color: colors.darkGray,
		fontFamily: fonts.primary
	},
	subtitle: {
		fontSize: 14,
		fontWeight: "500",
		color: colors.darkGray,
		fontFamily: fonts.primary
	},
	logo: {
		padding: 5,
		marginRight: 5
	},
	body: {
		padding: 15,
		fontFamily: fonts.primary
	},
	footer: {
		padding: 15,
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around"
	}
}

const mapStateToProps = (state = initialState) => {
	return {
		...state.app,
		...state.user
	};
};

export default connect(mapStateToProps)(App);