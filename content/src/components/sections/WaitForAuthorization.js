import React from "react"
import Button from "../universal/Button"
import authorizeImg from "../../assets/authorize.png"
import { colors, fonts } from "../../lib/constants"
import SecuredBy from "../universal/SecuredBy"
import ContentWrapper from "../universal/ContentWrapper"
import ContentTitle from "../universal/ContentTitle"

export default ({ splashtag, goTo }) => (
	<ContentWrapper>
		<ContentTitle>
			Authorize purchase on <br /> your phone
		</ContentTitle>
		<img
			className="WaitForAuthorization-image"
			src={chrome.extension.getURL(authorizeImg)}
		/>
		<div className="WaitForAuthorization-text">
			Open the Splash app to authorize your purchase
		</div>
		<div className="WaitForAuthorization-text">
			Don’t have the app?{" "}
			<a href="https://splashwallet.io" target="_blank">
				Download here
			</a>
		</div>
		<div style={{ marginBottom: "20px" }} className="WaitForAuthorization-text">
			Wrong amount?{" "}
			<span
				className="WaitForAuthorization-link"
				onClick={() => goTo("CARD_CREATED")}
			>
				Cancel transaction
			</span>
		</div>

		<style jsx global>
			{`
				.WaitForAuthorization-image {
					height: 116px;
					margin: 30px auto 23px;
				}

				.WaitForAuthorization-link {
					cursor: pointer;
				}
				.WaitForAuthorization-link:hover {
					color: ${colors.primaryHover};
				}

				.WaitForAuthorization-text {
					text-align: center;
					font-weight: 500;
					color: ${colors.grey};
					cursor: pointer;
					font-size: 14px;
					padding: 0 10px;
					margin-top: 7px;
					transition: all 150ms ease;
				}
			`}
		</style>
	</ContentWrapper>
)
