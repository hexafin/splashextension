import React, { Component } from "react"
import { colors, defaults } from "../../lib/constants"

const Input = ({
    isValid,
    showCheckmark,
    value,
    placeholder,
    handleChange
}) => (
    <div className="input-bar">
        <input
            onChange={handleChange}
            value={value}
            type="text"
            placeholder={placeholder}
        />
        {showCheckmark && <Checkmark />}
        <style jsx global>
            {`
                input {
                    width: 220px;
                    font-size: 18px;
                    padding: 0 20px;
                    color: ${!isValid ? "#ff3366" : colors.dark};
                    border: none;
                    height: 63px;
                    outline: none;
                    box-shadow: rgba(63, 63, 63, 0.09) 0 6px 34px 0;
                    border-radius: 4px;
                    -webkit-appearance: none;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
