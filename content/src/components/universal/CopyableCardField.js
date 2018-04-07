import React, { Component } from "react"
import { colors, fonts, defaults } from "../../lib/constants"

export default class extends Component {
	constructor(props) {
		super(props)
		this.state = {
			copySuccess: false
		}
	}

	handleMouseLeave() {
		setTimeout(() => {
			this.setState({
				copySuccess: false
			})
		}, 150)
	}

	render() {
		const { children, label } = this.props
		const copyToClipboard = content => {
			const dummy = document.createElement("input")
			dummy.type = "text"
			dummy.style =
				"opacity: 0, pointer-events: none, position: fixed, left: 0, top: 0, width: 200px, height: 200px"
			dummy.value = children
			document.body.appendChild(dummy)
			dummy.select()
			document.execCommand("copy")
			dummy.parentNode.removeChild(dummy)
			this.setState({ copySuccess: true })
		}

		return (
			<div
				onMouseLeave={() => this.handleMouseLeave()}
				onClick={() => copyToClipboard(children)}
				className="fieldWrapper"
			>
				<div className="fieldLabel">{label}</div>
				<div className="fieldName">
					<div className="fieldName-copyWrap">
						<div className="fieldName-copyBtn">
							{this.state.copySuccess ? "Copied!" : "Copy"}
						</div>
					</div>
					<div>{children}</div>
				</div>
				<style jsx global>
					{`
						.fieldWrapper {
							cursor: pointer;
						}

						.fieldWrapper:hover .fieldName {
							text-shadow: 0 0 20px ${colors.primary};
							color: transparent;
							transition: all 120ms ease;
						}

						.fieldWrapper:hover .fieldName-copyBtn {
							text-shadow: none;
							opacity: 1;
						}

						.fieldName {
							font-weight: 500;
							color: ${colors.primary};
							display: inline-block;
						}

						.fieldName-copyWrap {
							position: relative;
							width: 0;
							height: 0;
							display: flex;
							justify-content: center;
							margin: 0 auto;
						}

						.fieldName-copyBtn {
							background: white;
							color: ${colors.primary};
							background: white;
							padding: 5px 10px;
							height: 14px;
							font-size: 13px;
							opacity: 0;
							border-radius: 3px;
							width: 70px;
							transition: all 120ms ease;
							box-shadow: rgba(37, 53, 70, 0.1) 0 2px 17px 0px;
							display: flex;
							justify-content: center;
							align-items: center;
							position: relative;
							top: -2px;
						}

						.fieldName-copyBtn:hover {
							text-shadow: none;
						}

						.fieldLabel {
							font-size: 12px;
							text-transform: uppercase;
							color: #b3b3ff;
							font-weight: 600;
						}
					`}
				</style>
			</div>
		)
	}
}

