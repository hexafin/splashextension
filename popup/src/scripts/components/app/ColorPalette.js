import React from 'react'
import { defaults, colors } from '../../lib/constants'

var colorsMock = ['#ff3366', '#333', 'blue', 'green', 'purple']
const width = 200
const ColorPalette = (props) => (
	<div className="wrapper">
		{colorsMock.map((color, index) => <Color className="color" position={index} key={index} width={width} color={color} />)}
		<style jsx>{`
			.wrapper {
				display: flex
			}
			`}
		</style>
	</div>

)
const computeWidth = index => {
	switch(index) {
		case 0:
			return 5
		case 1:
			return 4
		case 2:
			return 3
		case 3:
			return 1
		case 4: 
			return '10%'
	}
}


const Color = ({color, position, active}) => {

	let classes = ['color']
	if (position == 0) {
		classes.push('roundLeftCorners')
	}
	if (position == 4) {
		classes.push('roundRightCorners')
	}

	return (
	<div className={classes.join(' ')} style={{background: color}}>
		<div className="color-name">{color}</div>
	<style jsx>{`
			.color {
				height: 50px
				flex-grow: ${computeWidth(position)}
				transition: all 150ms ${defaults.bezier}
				cursor: pointer
				display: flex
				justify-content: center
				align-items: center
			}
			.color:hover {
				flex-grow: 5
			}

			.roundLeftCorners {
				border-top-left-radius: 3px
				border-bottom-left-radius: 3px
			}

			.roundRightCorners {
				border-top-right-radius: 3px
				border-bottom-right-radius: 3px
			}

			.color-name {
				opacity: 0
				transition: all 0.1s ${defaults.bezier}
				color: white
				text-transform: uppercase
				font-weight: 500
			}

			.color:hover .color-name {
				opacity: 1
				letter-spacing: 0.6px
			}


		`}
	</style>
	</div>
		)

}


export default ColorPalette