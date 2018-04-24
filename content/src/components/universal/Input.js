import React, { Component } from 'react'
import { colors, defaults, fonts } from '../../lib/constants'
import Checkmark from './Checkmark'
const Input = ({
    isValid,
    showCheckmark,
    value,
    placeholder,
    handleChange,
    type,
    autoFocus
}) => (
    <div className="input-bar">
        <input
            onChange={handleChange}
            value={value}
            type={type}
            step="0.01"
            autoFocus={autoFocus}
            placeholder={placeholder}
        />
        {showCheckmark && <Checkmark />}
        <style jsx global>
            {`
                input {
                    width: 100%;
                    font-size: 18px;
                    padding: 0 20px;
                    font-weight: 500;
                    color: ${!isValid ? '#ff3366' : colors.dark};
                    border: none;
                    height: 63px;
                    outline: none;
                    box-shadow: rgba(63, 63, 63, 0.09) 0 6px 34px 0;
                    border-radius: 4px;
                    -webkit-appearance: none;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    box-sizing: border-box;
                    font-family: ${fonts.primary};
                }

                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    /* display: none; <- Crashes Chrome on hover */
                    -webkit-appearance: none;
                    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
                }

                .input-bar {
                    position: relative;
                }

                input::placeholder {
                    color: ${colors.grey};
                }

                input:focus {
                    outline: none;
                }
            `}
        </style>
    </div>
)

export default Input
