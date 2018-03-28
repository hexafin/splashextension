import React from 'react'
import {colors } from '../../lib/constants'

const TrafficSection = () => (
	<div className="trafficSection">
		<div className="trafficSection-title">SITE TRAFFIC</div>

		<style jsx global>{`
			.trafficSection {

			}
			.trafficSection-title {
				font-size: 14px;
        color: ${colors.fontgrey};
        margin-bottom: 8px;
			}

			`}
		</style>
	</div>
)

export default TrafficSection