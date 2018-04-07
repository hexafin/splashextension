import React from "react"
import {Cross} from "./Icons"

const CloseButton = () => (
	<div className="splashExtCloseButton-wrapper" onClick={() => {console.log("TODO")}}>
		<Cross/>
		<style jsx global>
			{`
				.splashExtCloseButton-wrapper {
					position: absolute;
					top: 10px;
					right: 10px;
					width: 30px;
					height: 30px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 15px;
					background: #FFFFFF;
				}
				.splashExtCloseButton-wrapper:hover {
					background: #FBFBFB;
					cursor: pointer;
				}
			`}
		</style>
	</div>
)

export default CloseButton