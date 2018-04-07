import React from "react"
import CopyableCardField from "./CopyableCardField"
import { Drop } from "./Icons"
import { colors } from "../../lib/constants"

const Card = ({ number, expiration, cvc, postal }) => (
	<div className="CardWrapper">
		<div className="Card">
			<CopyableCardField label="Card Number">{number}</CopyableCardField>
			<div className="Card-drop">
				<Drop height="16px" color={colors.primary} />
			</div>
			<div className="Card-row">
				<CopyableCardField label="Expiration">09/12</CopyableCardField>
				<CopyableCardField label="CVC">949</CopyableCardField>
				<CopyableCardField label="Postal">10002</CopyableCardField>
			</div>
		</div>
		<style jsx global>{`
			.Card {
				background: #efeffd;
				border-radius: 5px;
				padding: 15px;
				position: relative;
			}

			.Card-row {
				margin-top: 15px;
				display: flex;
				justify-content: space-between;
			}

			.Card-drop {
				position: absolute;
				right: 15px;
				top: 16px;
			}
		`}</style>
	</div>
)

export default Card
