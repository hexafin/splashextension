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
    autoFocus,
    shakeAnimation
}) => {
    const classes = ['']
    if (shakeAnimation) {
        classes.push('shakeAnimation')
    }

    return (
        <div className="input-bar">
            <input
                onChange={handleChange}
                value={value}
                className={classes.join(' ')}
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
                        box-shadow: rgba(63, 63, 63, 0.13) 0 6px 34px 0;
                        border-radius: 4px;
                        -webkit-appearance: none;
                        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                        box-sizing: border-box;
                        font-family: ${fonts.primary};
                        transition: all 150ms ease;
                        border: solid 1px rgba(0, 0, 0, 0);
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

                    .shakeAnimation {
                        animation: shake 0.82s
                            cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
                        transform: translate3d(0, 0, 0);
                        backface-visibility: hidden;
                        perspective: 1000px;
                        border: solid 1px #ff3366;
                    }
                `}
            </style>
        </div>
    )
}

export default Input
