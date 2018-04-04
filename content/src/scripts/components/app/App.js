import React, { Component } from "react";
import { connect } from "react-redux";
import { colors, defaults, fonts } from "../../lib/constants";
import Button from "./Button"
import {LogoSmallColor} from "./Icons"
import axios from "axios"

class App extends Component {
	render() {
		console.log("props", this.props);

		return (
			<div style={styles.wrapper}>
				<div style={styles.header}>
					<div style={styles.logo}>
						<LogoSmallColor/>
					</div>
					<div style={styles.title}>Splash</div>
				</div>
				<div style={styles.body}>
					How much is your transaction for?
				</div>
				<div style={styles.footer}>
					<Button onClick={() => {

						axios.post("https://us-central1-hexa-splash.cloudfunctions.net/initializeTransaction", {
							userId: "TGntKESxtoez4eKnc27R6wgsjr43",
							extensionId: "sample-extension-id",
							relativeAmount: 100,
							relativeCurrency: "USD",
							domain: "test.com"
						}).then(response => {
							console.log(response)
						}).catch(error => {
							console.log(error)
						})

					}}>Create transaction</Button>
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
		flexDirection: "column"
	},
	header: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		padding: 15
	},
	title: {
		fontSize: 20,
		fontWeight: "600",
		color: colors.darkGray
	},
	logo: {
		padding: 5,
		marginRight: 5
	},
	body: {
		padding: 15
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