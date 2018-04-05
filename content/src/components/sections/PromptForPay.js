import React from "react"
import Button from "../universal/Button"

export default ({ splashtag, goTo }) => (
	<div>
		<div className="promptForPay-title">
			Hey @{splashtag}, <br /> you can pay with Bitcoin.
		</div>
		<div>How does it work?</div>
		<Button onClick={() => goTo("ENTER_SPLASHTAG")}>Pay with Bitcoin</Button>
		<div>Payment secured by Splash</div>
		<style jsx global>
			{`
				.promptForPay-title {
					font-weight: 500;
				}
			`}
		</style>
	</div>
)
