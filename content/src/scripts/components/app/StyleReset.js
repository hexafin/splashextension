import React from 'react'
import { colors, fonts } from '../../lib/constants'

const totalReset = {
	all: 'initial',
	fontFamily: `${fonts.primary}`
}
const StyleReset = (props) => (
	<div id="pineapple" style={totalReset}>
		<div id="pa-extra">
			<div className="pineapple-base">
			{props.children}
			</div>
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

