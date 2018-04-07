import React from "react"

export default ({ children, left }) => (
	<div className="ContentTitle">
		{children}
		<style jsx global>{`
			.ContentTitle {
				font-weight: 600;
				font-size: 18px;
				text-align: ${left ? "left" : "center"};
			}
		`}</style>
	</div>
)
