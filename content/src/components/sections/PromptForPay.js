import React from "react"
import Button from "../universal/Button"
import CloseButton from "../universal/CloseButton"
import { Lock, SplashSmile, Cross } from "../universal/Icons"
import { colors, defaults } from "../../lib/constants"

export default ({ splashtag, goTo }) => (
	<div className="promptForPay-wrapper">
		<CloseButton/>
		<div className="promptForPay-title">
			Hey @{splashtag}, <br /> you can pay with Bitcoin.
		</div>
		<div className="promptForPay-body">
			<div className="promptForPay-logoWrapper">
				<div className="promptForPay-logo">
					<SplashSmile/>
				</div>
			</div>
		</div>
		<div className="promptForPay-explanationLink">
			How does it work?
		</div>
		<Button onClick={() => goTo("ENTER_SPLASHTAG")}>Pay with Bitcoin</Button>
		<div className="promptForPay-footer">
			<Lock/>
			<div className="promptForPay-footerText">
				Payment secured by Splash
			</div>
		</div>
		<style jsx global>
			{`
				.promptForPay-wrapper {
					padding: 30px;
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
				}
				.promptForPay-title {
					font-size: 16px;
					width: 200px;
					text-align: left;
					font-weight: 500;
					padding-bottom: 10px;
				}
				.promptForPay-body {
					padding-top: 10px;
					padding-bottom: 10px;
				}
				.promptForPay-logoWrapper {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80px;
					height: 80px;
					background: #FFFFFF;
					border-radius: 40px;
					box-shadow: ${defaults.shadow};
				}
				.promptForPay-explanationLink {
					font-size: 13px;
					font-weight: 500;
					padding: 10px;
					padding-bottom: 20px;
					color: ${colors.grey};
				}
				.promptForPay-explanationLink:hover {
					cursor: pointer;
				}
				.promptForPay-footer {
					margin-top: 10px;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
				}
				.promptForPay-footerText {
					font-size: 13px;
					font-weight: 500;
					margin-left: 6px;
					color: ${colors.grey};
				}
			`}
		</style>
	</div>
)
