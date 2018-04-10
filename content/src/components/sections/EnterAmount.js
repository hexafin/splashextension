import React from "react"
import Button from "../universal/Button"
import { colors, fonts } from "../../lib/constants"
import SecuredBy from "../universal/SecuredBy"
import ContentWrapper from "../universal/ContentWrapper"
import ContentTitle from "../universal/ContentTitle"
import Input from "../universal/Input"
import { SmileLogo } from "../universal/Icons"

export default ({ splashtag, amount, goTo, isStartingTransaction, startTransaction, updateAmount }) => (
	<ContentWrapper>
		<ContentTitle>How much money (in USD) do you need?</ContentTitle>
		<div style={{ height: "25px" }} />
		<Input isValid autoFocus type="number" placeholder="e.g. 24.99" handleChange={(e) => {
			updateAmount(e.target.value)
		}}/>
		<Hint>
			After you authorize on your phone, we’ll load this amount on a magic
			one-time credit card.
		</Hint>

		<Button 
			disabled={isStartingTransaction} 
			loading={isStartingTransaction} 
			onClick={() => startTransaction(splashtag, amount)}>
			
			Confirm USD amount
		</Button>

		<SecuredBy />
		<style jsx global>
			{``}
		</style>
	</ContentWrapper>
)

const Hint = ({ children }) => (
	<div className="Hint">
		<SmileLogo width="60px" color={colors.primary} />
		<div className="Hint-content">{children}</div>
		<style jsx global>{`
			.Hint {
				display: flex;
				margin: 30px 0 10px;
				padding: 0 3px;
			}

			.Hint svg {
				margin-top: 4px;
			}

			.Hint-content {
				text-align: left;
				margin-left: 12px;
				font-weight: 500;
				color: ${colors.grey};
				font-size: 14px;
			}
		`}</style>
	</div>
)
