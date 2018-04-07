import React, { Component } from "react"
import { colors, fonts } from "../../lib/constants"

const Button = ({ children, disabled, onClick }) => {
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
						top: -2px;
						font-size: 16px;
						font-weight: 600;
						height: 50px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						background: ${colors.primary};
						color: white;
						border-radius: 4px;
						border: none;
						width: 200px;
						font-family: ${fonts.primary};
						box-shadow: rgba(63, 63, 63, 0.08) 0 6px 14px 0;
						transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
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
