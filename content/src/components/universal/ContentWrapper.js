import React from "react"
import CloseButtonBar from "./CloseButtonBar"
export default ({ children, noCloseButton }) => (
	<div>
		{!noCloseButton && <CloseButtonBar />}
		<div className="ContentWrapper">
			{children}
			<style jsx global>{`
				.ContentWrapper {
					padding: 0 22px 13px;
					display: flex;
					justify-content: center;
					flex-direction: column;
				}
			`}</style>
		</div>
	</div>
)
