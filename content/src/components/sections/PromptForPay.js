import React from "react"
import Button from "../universal/Button"
import promptGraphic from "../../assets/promptGraphic.png"
import { colors, fonts } from "../../lib/constants"
import SecuredBy from "../universal/SecuredBy"
import ContentWrapper from "../universal/ContentWrapper"
import ContentTitle from "../universal/ContentTitle"

export default ({ splashtag, goTo }) => (
	<ContentWrapper>
		<ContentTitle left>
			Hey @{splashtag}, <br /> you can pay with Bitcoin.
		</ContentTitle>
		<img
			className="promptForPay-image"
			src={chrome.extension.getURL(promptGraphic)}
		/>
		<div onClick={() => goTo("HOW_IT_WORKS")} className="promptForPay-tutorial">
			How does it work?
		</div>
		<Button onClick={() => goTo("ENTER_AMOUNT")}>Pay with Bitcoin</Button>
		<SecuredBy />
		<style jsx global>
			{`
				.promptForPay-image {
					height: 155px;
					margin: 0 auto;
				}

				.promptForPay-tutorial {
					text-align: center;
					font-weight: 500;
					color: ${colors.grey};
					cursor: pointer;
					transition: all 150ms ease;
				}

				.promptForPay-tutorial:hover {
					color: ${colors.primaryHover};
				}
			`}
		</style>
	</ContentWrapper>
)
