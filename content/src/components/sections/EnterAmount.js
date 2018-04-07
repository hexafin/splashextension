import React from "react"
import Button from "../universal/Button"
import { colors, fonts } from "../../lib/constants"
import SecuredBy from "../universal/SecuredBy"
import ContentWrapper from "../universal/ContentWrapper"
import ContentTitle from "../universal/ContentTitle"
import Input from "../universal/Input"
export default ({ splashtag, goTo }) => (
	<ContentWrapper>
		<ContentTitle left>Enter the final amount you need in USD</ContentTitle>
		<Input isValid placeholder="e.g. $24.99" />
		<Button onClick={() => goTo("ENTER_AMOUNT")}>Pay with Bitcoin</Button>
		<SecuredBy />
		<style jsx global>
			{``}
		</style>
	</ContentWrapper>
)
