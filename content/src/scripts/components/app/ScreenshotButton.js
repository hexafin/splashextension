import React from 'react'
import { CameraIcon } from '../common/Icons'
import { colors } from '../../lib/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../actions/user'

const ScreenshotButton = ({ hasScreenshotted, handleScreenshotClick }) => (
		<div className="ScreenshotButton" onClick={handleScreenshotClick}>
			<CameraIcon color={hasScreenshotted ? colors.primary : colors.fontdark}/>

			<style jsx global>{`
				.ScreenshotButton:hover {
					cursor: pointer;
				}
			`}
			</style>
		</div>
)

const mapStateToProps = state => {
	return state.user
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(userActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenshotButton)