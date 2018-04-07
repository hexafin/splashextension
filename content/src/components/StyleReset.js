import React from "react"
import { colors, fonts } from "../lib/constants"

const totalReset = {
	all: "initial",
	fontFamily: `${fonts.primary}`
}
const StyleReset = props => (
	<div id="splash" style={totalReset}>
		<div id="splash-extra">
			<div className="splash-base">{props.children}</div>
		</div>
		<style jsx global>
			{`
				.splash-base {
					text-rendering: optimizeLegibility;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					transition: all 125ms ease;
				}
				a {
					transition: all 150ms ease;
					color: ${colors.grey};
					text-decoration: none;
					font-weight: 500;
					font-family: ${fonts.primary};
				}
				a:hover {
					color: ${colors.primaryHover};
				}
			`}
		</style>
	</div>
)

export default StyleReset
