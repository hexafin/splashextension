import React, { Component } from "react"
import { colors } from "../../lib/constants"

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
		const cc_format = value => {
			var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
			var matches = v.match(/\d{4,16}/g)
			var match = (matches && matches[0]) || ""
			var parts = []

			for (var i = 0, len = match.length; i < len; i += 4) {
				parts.push(match.substring(i, i + 4))
			}

			if (parts.length) {
				return parts.join(" ")
			} else {
				return value
			}
		}
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

		const getFieldContent = () => {
			if (label == "Card Number") {
				return cc_format(children)
			}
			if (label == "Expiry") {
				return `${children.substring(0, 2)}/${children.substring(2, 4)}`
			}
			return children
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
					<div>{getFieldContent()}</div>
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
							padding: 0 10px;
							height: 22px;
							font-size: 13px;
							opacity: 0;
							border-radius: 3px;
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
