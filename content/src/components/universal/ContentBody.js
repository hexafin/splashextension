import React from "react"
export default ({ children }) => (
	<div className="splashExt-contentBody">
		{children}
		<style jsx global>{`
			.splashExt-contentBody {
				padding-top: 10px;
				padding-bottom: 10px;
				display: flex;
				flex-direction: column;
			}
		`}</style>
	</div>
)
