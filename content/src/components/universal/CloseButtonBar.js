import React, { Component } from "react"
import CloseButton from "./CloseButton"
import { colors, fonts } from "../../lib/constants"
import { closeExtension } from "../../index"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

const CloseButtonBar = () => (
	<div className="CloseButtonBar">
		<CloseButton onClick={() => closeExtension()} />
		<style jsx global>
			{`
				.CloseButtonBar {
					display: flex;
					justify-content: flex-end;
					max-width: 100%;
					padding: 10px 10px 0 0;
				}
			`}
		</style>
	</div>
)

export default CloseButtonBar
