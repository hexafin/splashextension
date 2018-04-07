import React from "react"
import { Lock } from "./Icons"
import { colors } from "../../lib/constants"

const SecuredBy = () => (
	<div className="SecuredBy">
		<Lock color={colors.iconGrey} height="12px" />
		<div className="SecuredBy-text">Payment secured by Splash</div>
		<style jsx global>
			{`
				.SecuredBy {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 0 auto;
					padding: 8px;
				}
				.SecuredBy-text {
					color: ${colors.grey};
					font-weight: 500;
					font-size: 14px;
					margin-top: 1px;
					margin-left: 5px;
				}
			`}
		</style>
	</div>
)

export default SecuredBy
