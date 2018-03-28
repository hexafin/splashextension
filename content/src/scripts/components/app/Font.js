import React from 'react'
import { colors, fonts } from '../../lib/constants'

import { fontToArray } from '../../lib/fontUtils'

const Font = ({ displayFontFamily, displayFontWeight, actualFontFamily, actualFontWeight, fontAsArray  }) => {
console.log('font', displayFontFamily, displayFontWeight)
	return (
		<div className="font">
			<div
				style={{fontFamily: actualFontFamily, fontWeight: actualFontWeight}}
				className="font-name">
				{displayFontFamily}
			</div>
			<div className="font-weight">
				{displayFontWeight}
			</div>
			<style jsx global>{`
				.font-name {
					font-size: 25px;
					line-height: 32px;
					text-transform: capitalize;
				}

				.font-weight {
					font-size: 12px;
					color: ${colors.fontgrey};
					text-transform: capitalize;
				}
				`}
			</style>
		</div>

	)
}



export default Font