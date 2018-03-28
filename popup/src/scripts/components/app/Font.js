import React from 'react'
import { colors } from '../../lib/constants'


const Font = ({ displayFontName, displayFontWeight, actualFontFamily, actualFontWeight  }) => (
	<div className="font">
		<div className="font-name">
			{displayFontName}
		</div>
		<div className="font-weight">
			{displayFontWeight}
		</div>
		<style jsx>{`
			.font-name {
				font-family: ${actualFontFamily};
				font-weight: 400;
				font-size: 25px;
			}
			.font-weight {
				font-size: 12px;
				color: ${colors.fontgrey};
			}


			`}
		</style>
	</div>
)


export default Font