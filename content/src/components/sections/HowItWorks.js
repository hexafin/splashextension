import React from "react"
import Button from "../universal/Button"
import { colors, fonts } from "../../lib/constants"
import SecuredBy from "../universal/SecuredBy"
import ContentWrapper from "../universal/ContentWrapper"
import ContentTitle from "../universal/ContentTitle"
import confirmBullet from "../../assets/confirmBullet.png"
import cardBullet from "../../assets/cardBullet.png"
import authorizeBullet from "../../assets/authorizeBullet.png"


export default ({ splashtag, goTo }) => (
	<ContentWrapper>
		<ContentTitle left>It's easy.</ContentTitle>
		<div style={{ height: "10px" }} />
		<BulletPoint icon={confirmBullet} title="Confirm Amount">
			Make sure the total is correct
		</BulletPoint>
		<BulletPoint icon={authorizeBullet} title="Authorize on your phone">
			Securely confirm your purchase through the Splash app
		</BulletPoint>
		<BulletPoint icon={cardBullet} title="Pay with magic card">
			We create a one-time card and autofill everything. Just click pay!{" "}
		</BulletPoint>
		<div style={{ height: "10px" }} />
		<Button onClick={() => goTo("ENTER_AMOUNT")}>Pay with Bitcoin</Button>
		<SecuredBy />
		<style jsx global>
			{``}
		</style>
	</ContentWrapper>
)

const BulletPoint = ({ children, title, icon }) => (
	<div className="BulletPoint">
		<img className="BulletPoint-icon" src={icon} />
		<div className="BulletPoint-content">
			<div className="BulletPoint-title">{title}</div>
			<div className="BulletPoint-body">{children}</div>
		</div>
		<style jsx global>{`
			.BulletPoint {
				display: flex;
				margin-top: 15px;
			}
			.BulletPoint-icon {
				width: 40px;
				height: 40px;
			}
			.BulletPoint-content {
				margin-left: 10px;
			}
			.BulletPoint-title {
				font-weight: 500;
			}
			.BulletPoint-body {
				color: ${colors.grey};
				font-size: 14px;
			}
		`}</style>
	</div>
)
