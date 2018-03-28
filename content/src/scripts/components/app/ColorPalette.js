import React from 'react'
import { defaults, colors } from '../../lib/constants'
import { connect } from 'react-redux'
import Color from './Color'

const ColorPalette = ({siteColors}) => (
	<div className="colorpalette">
		{siteColors.map((color, index) => <Color className="color" position={index} key={index} color={color} />)}
		<style jsx global>{`
			.colorpalette {
				display: flex;
			}
			`}
		</style>
	</div>

)

const mapStateToProps = state => {
	return {
		siteColors: state.app.colors 
	}
}

export default connect(mapStateToProps)(ColorPalette)