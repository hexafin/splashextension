import React from 'react'
import Font from './Font'
import { connect } from 'react-redux'
import { colors } from '../../lib/constants'

const FontSection = ({fonts}) => {

	console.log('fontsinfontsection', fonts)
	let topFonts = ['Avenir Next']

	if (fonts) {
		topFonts = fonts.slice(0,2)
	}
	console.log('topFonts', topFonts)

	return (
			<div className="fontSection">
        <div className="fontSection-title">FONTS</div>

			{topFonts.map((font, index) => {
							return <Font key={font.actualFontFamily + index} {...font} />
							})}

				<style jsx global>{`
						.fontSection {
							margin-bottom: 18px;
						}
					 .fontSection-title {
	            font-size: 14px;
	            color: ${colors.fontgrey};
	            margin-bottom: 5px;
	          }
					`}
				</style>
			</div>

	)
}

const mapStateToProps = state => {
	return {
		fonts: state.app.fonts
	}
}
export default connect(mapStateToProps)(FontSection)