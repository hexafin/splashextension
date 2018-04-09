import React, { Component } from "react"
import { colors, fonts, defaults } from "../../lib/constants"

export default class extends Component {
	constructor(props) {
		super(props)
		this.boxHeight = 33
		this.state = {
			isOpen: false,
			height: this.boxHeight
		}
	}

	handleClick() {
		// if (e.target.nodename == 'A') return
		// console.log(e.target.tagName)
		this.setState({
			isOpen: !this.state.isOpen,
			height:
				this.state.height == this.boxHeight
					? this.boxHeight + this.refs.body.clientHeight + 10
					: this.boxHeight
		})
	}

	render() {
		const { title, children } = this.props
		const { type } = this.props

		return (
			<div
				style={{ height: `${this.state.height}` + "px" }}
				className="expandable-box"
			>
				<div
					onClick={() => this.handleClick()}
					className="expandable-box-header"
				>
					<div style={{ marginRight: "15px" }}>{title}</div>
				</div>
				<div
					ref="body"
					style={{ visibility: "none", opacity: this.state.isOpen ? 1 : 0 }}
					className="expandable-box-body"
				>
					{children}
				</div>
				<style jsx global>{`
					.expandable-box {
						max-width: 100%;
						overflow: hidden;
						transition: all 200ms cubic-bezier(0.4, 0, 0.06, 1.16);
					}

					.expandable-box-header {
						display: flex;
						cursor: pointer;
						user-select: none;
						justify-content: space-between;
						text-align: left;
						font-weight: 500;
						color: ${colors.grey};
						font-size: 14px;
						margin-top: 7px;
						transition: all 150ms ease;
					}

					.expandable-box-body {
						transition: all 100ms ease;
						pointer-events: none;
						user-select: none;
						font-size: 14px;
					}
				`}</style>
			</div>
		)
	}
}
