import React, { Component } from "react"
import { colors, fonts } from "../../lib/constants"

const Button = ({ children, disabled, onClick, width }) => {
	let classes = []
	if (disabled) {
		classes.push("disabled")
	}
	return (
		<button className={classes.join(" ")} onClick={onClick}>
			{children}

			<style jsx global>
				{`
					button {
						margin: 0;
						margin-left: 12px;
						top: -2px;
						font-size: 18px;
						height: 63px;
						padding: 18px 25px;
						background: #5c16ff;
						color: white;
						border-radius: 4px;
						border: none;
						width: 188px;
						font-family: ${fonts.primary};
						box-shadow: rgba(63, 63, 63, 0.08) 0 6px 14px 0;
						transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
					}

					@media (max-width: 550px) {
						button {
							width: 100%;
							margin-left: 0;
							margin-top: 18px;
						}
					}

					button:focus {
						outline: 0;
					}

					button:hover {
						background: ${colors.primaryHover};
						color: white;
						cursor: pointer;
						transform: scale(1.02);
					}

					.disabled {
						background: #e4e3e5;
					}

					.disabled:hover {
						transform: scale(1);
						background: #e4e3e5;
					}
				`}
			</style>
		</button>
	)
}

export default Button
