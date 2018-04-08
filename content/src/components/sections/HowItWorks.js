import React from "react"
import Button from "../universal/Button"
import { colors, fonts } from "../../lib/constants"
import SecuredBy from "../universal/SecuredBy"
import ContentWrapper from "../universal/ContentWrapper"
import ContentTitle from "../universal/ContentTitle"
import ContentBody from "../universal/ContentBody"
import LineItem from "../universal/LineItem"
import { Lock, SmileLogo } from "../universal/Icons"

const dollarSign = (
	<div className="splashExt-howItWorks-dollarSign">
		$
		<style jsx global>
			{`
				.splashExt-howItWorks-dollarSign {
					font-size: 18px;
					font-weight: 600;
					color: ${colors.primaryMedium};
				}
			`}
		</style>
	</div>
)

const authorizeLock = (
	<Lock color={colors.primaryMedium} height="15px"/>
)

const graphicSplash = (
	<SmileLogo color={colors.primaryMedium} width="12px"/>
)

export default ({ splashtag, goTo }) => (
	<ContentWrapper>
		<ContentTitle left>It's easy.</ContentTitle>
		<ContentBody>
			<LineItem graphic={dollarSign} title="Confirm amount" content="Make sure the total is correct"/>
			<LineItem graphic={authorizeLock} title="Authorize on your phone" content="Securely confirm your purchase through the Splash app"/>
			<LineItem graphic={graphicSplash} title="Pay with magic card" content="We create a one-time card and autofill everything. Just click pay!"/>
		</ContentBody>
		<Button onClick={() => goTo("ENTER_AMOUNT")}>Pay with Bitcoin</Button>
		<SecuredBy />
		<style jsx global>
			{``}
		</style>
	</ContentWrapper>
)
