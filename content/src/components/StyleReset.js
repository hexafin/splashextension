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
				.pineapple-base {
					text-rendering: optimizeLegibility;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}
			`}
		</style>
	</div>
)

export default StyleReset
