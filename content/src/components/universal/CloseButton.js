import React, { Component } from "react"
import { Cancel } from "./Icons"
import { colors, fonts } from "../../lib/constants"

class CloseButton extends Component {
	constructor(props) {
		super(props)
		this.handleMouseHover = this.handleMouseHover.bind(this)
		this.state = {
			isHovering: false
		}
	}

	handleMouseHover() {
		this.setState(this.toggleHoverState)
	}

	toggleHoverState(state) {
		return {
			isHovering: !state.isHovering
		}
	}

	render() {
		return (
			<div onClick={() => this.props.onClick()} className="CloseButton-circle">
				<Cancel color={colors.lightGrey} />
				<style jsx global>
					{`
						.CloseButton-circle {
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 20px;
							width: 30px;
							height: 30px;
							cursor: pointer;
						}

						.CloseButton-circle:hover {
							background: ${colors.hoverGrey};
						}
					`}
				</style>
			</div>
		)
	}
}

export default CloseButton
