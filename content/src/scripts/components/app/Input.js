import React, {Component} from "react"
import {colors, defaults} from "../../lib/constants"

class Input extends Component {
    render() {
        const {
            name,
            type,
            onChange,
            value
        } = this.props
        return (
            <input type={type || "text"} key={name} id={name} value={value} name={name} 
                onChange={() => onChange(document.getElementById(name).value)}
                style={{
                    padding: 15,
                    outline: "none",
                    border: "none",
                    boxShadow: "rgba(37,53,70,.15) 0 6px 25px -3px",
                    width: 180
                }}/>
        )
    }
}

export default Input