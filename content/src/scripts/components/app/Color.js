import React, { Component } from 'react'
import { defaults, colors } from '../../lib/constants'
import chroma from 'chroma-js'

class Color extends Component {
	constructor(props) {
		super(props)
		this.state = {
			copySuccess: false,
		}
	}

	handleMouseLeave() {
		setTimeout(() => {
			this.setState({
				copySuccess: false,
			})
		}, 150)
	
	}

	render() {
		const { color, position } = this.props

		const copyToClipboard = color => {
			const dummy = document.createElement('input')
			dummy.type = "text"
			dummy.style = "opacity: 0, pointer-events: none, position: fixed, left: 0, top: 0, width: 200px, height: 200px"
			dummy.value = color
			document.body.appendChild(dummy)
			dummy.select()
			document.execCommand('copy')
			dummy.parentNode.removeChild(dummy)
			this.setState({copySuccess: true})
		}


		let classes = ['color']
		if (position == 0) {
			classes.push('roundLeftCorners')
		}
		if (position == 4) {
			classes.push('roundRightCorners')
		}

		let colorNameClasses = ['color-name']
		if (this.state.copySuccess) {
			colorNameClasses.push('color-copySuccess')
		}
		return (
			<div onMouseLeave={() => this.handleMouseLeave()}
					onClick={() => copyToClipboard(color)} 
					className={classes.join(' ')} 
					style={{background: color}}>
				<div className={colorNameClasses.join(' ')}>
					{this.state.copySuccess ? 'Copied!' : color}
				</div>
			<style jsx global>{`
					.color {
						height: 50px;
						flex-grow: ${computeWidth(position)};
						transition: all 150ms ${defaults.bezier};
						cursor: pointer;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.color:hover {
						flex-grow: 5;
					}

					.roundLeftCorners {
						border-top-left-radius: 3px;
						border-bottom-left-radius: 3px;
					}

					.roundRightCorners {
						border-top-right-radius: 3px;
						border-bottom-right-radius: 3px;
					}

					.color-name {
						opacity: 0;
						transition: all 0.1s ${defaults.bezier};
						color: white;
						text-transform: uppercase;
						font-weight: 500;
					}

					.color-copySuccess {
						text-transform: initial;
					}

					.color:hover .color-name {
						opacity: 1;
						letter-spacing: 0.6px;
					}


				`}
			</style>
			</div>
		)
	}

}


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


export default Color