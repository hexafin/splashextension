import React from "react"
import Button from "../universal/Button"
import { colors, fonts } from "../../lib/constants"
import SecuredBy from "../universal/SecuredBy"
import ContentWrapper from "../universal/ContentWrapper"
import ContentTitle from "../universal/ContentTitle"

export default ({ splashtag, goTo }) => (
	<ContentWrapper>
		<ContentTitle left>It's easy.</ContentTitle>
		<Button onClick={() => goTo("ENTER_AMOUNT")}>Pay with Bitcoin</Button>
		<SecuredBy />
		<style jsx global>
			{``}
		</style>
	</ContentWrapper>
)
