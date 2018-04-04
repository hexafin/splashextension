import React, {Component} from "react"
import { colors, fonts } from '../../lib/constants'

class Button extends Component {
	render() {
		console.log("props", this.props);

		return (
			<button style={styles.wrapper} disabled={this.props.disabled} onClick={this.props.onClick}>
				{this.props.children}
			</button>
		);
	}
}

const styles = {
	wrapper: {
		padding: 10,
		backgroundColor: colors.primary,
		border: "none",
		color: "white",
		borderRadius: 5,
		fontWeight: "600",
		fontSize: 16,
		fontFamily: fonts.primary
	}
}

export default Button