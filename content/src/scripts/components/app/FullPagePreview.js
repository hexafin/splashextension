import React from 'react'
import { defaults } from '../../lib/constants'

const FullPagePreview = ({image}) => (
	<div style={{backgroundImage: `url(${image})`}}className="FullPagePreview-wrapper">
		<style jsx global>{`
			.FullPagePreview-wrapper {
		    box-shadow: rgba(37,53,70,.3) 0 6px 46px -6px;
		    height: 124px;
		    width: 105px;
		    overflow: hidden;
		    border-radius: 3px;
		    margin-top: 3px;
		    background-size: cover;
		    background-repeat: no-repeat;
			}
		`}
		</style>
	</div>
)

export default FullPagePreview