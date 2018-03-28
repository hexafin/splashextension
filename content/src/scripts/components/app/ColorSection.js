import React from 'react'
import {colors} from '../../lib/constants'
import ColorPalette from './ColorPalette'

const ColorSection = () => (
	<div className="colorSection">
  	<div className="colorSection-title">COLORS</div>
 	 	<ColorPalette />
 	 	<style jsx global>{`
 	 		.colorSection {
 	 			margin-bottom: 18px;
 	 		}
			.colorSection-title {
		    font-size: 14px;
        color: ${colors.fontgrey};
        margin-bottom: 14px;
			}
 	 		`}
 	 	</style>
  </div>

)

export default ColorSection