import React, { Component } from 'react'
import { colors, fonts } from '../../lib/constants'
import LoadingCircle from './LoadingCircle'
const Button = ({
	children,
	onClick,
	disableClickOnly,
	disabled = false,
	loading = false
}) => {
	let classes = ['splash-btn']

	if (disabled) {
		classes.push('disabled')
	}
	return (
		<button
			disabled={disableClickOnly}
			className={classes.join(' ')}
			onClick={onClick}
		>
			{!loading && children}
			{loading && <LoadingCircle />}
			<style jsx global>
				{`
					.splash-btn {
						top: -2px;
						font-size: 18px;
						// background: #5c16ff;
						background: ${colors.primary};
						color: white;
						height: 51px;
						border-radius: 4px;
						border: none;
						width: 188px;
						font-weight: 500;
						font-family: ${fonts.primary};
						box-shadow: rgba(63, 63, 63, 0.08) 0 6px 14px 0;
						transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
						width: 100%;
						margin-left: 0;
						margin-top: 18px;
						box-sizing: border-box;
						text-transform: none;
						letter-spacing: initial;
					}

					.splash-btn:focus {
						outline: 0;
					}

					.splash-btn:hover {
						background: ${colors.primaryHover};
						color: white;
						cursor: pointer;
						transform: scale(1.01);
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
