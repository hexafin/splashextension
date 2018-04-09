import React from "react"
import Button from "../universal/Button"
import waitForCardImg from "../../assets/waitForCard.png"
import { colors, fonts } from "../../lib/constants"
import SecuredBy from "../universal/SecuredBy"
import ContentWrapper from "../universal/ContentWrapper"
import ContentTitle from "../universal/ContentTitle"

export default ({ splashtag, goTo }) => (
	<ContentWrapper>
		<ContentTitle>
			Creating your <br /> magic card
		</ContentTitle>
		<img
			className="WaitForCard-image"
			src={chrome.extension.getURL(waitForCardImg)}
		/>

		<style jsx global>
			{`
				.WaitForCard-image {
					height: 116px;
					margin: 30px auto 23px;
				}
			`}
		</style>
	</ContentWrapper>
)
