import React from "react"
import { colors } from "../../lib/constants"

export default ({ title, content, graphic }) => (
	<div className="splashExt-lineItem">
		<div className="splashExt-lineItem-graphic">
			{graphic}
		</div>
		<div className="splashExt-lineItem-text">
			<div className="splashExt-lineItem-title">{title}</div>
			<div className="splashExt-lineItem-content">{content}</div>
		</div>
		<style jsx global>{`
			.splashExt-lineItem {
				padding-top: 15px;
				padding-bottom: 15px;
				display: flex;
				flex-direction: row;
			}
			.splashExt-lineItem-graphic {
				width: 40px;
				height: 40px;
				border-radius: 20px;
				margin-right: 10px;
				background: ${colors.primaryLight};
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.splashExt-lineItem-text {
				display: flex;
				flex-direction: column;
				flex: 1;
			}
			.splashExt-lineItem-title {
				font-size: 16px;
				font-weight: 600;
			}
			.splashExt-lineItem-content {
				font-size: 14px;
				font-weight: 600;
				color: ${colors.grey};
			}
		`}</style>
	</div>
)