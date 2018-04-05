import React from "react"
import Input from "../universal/Input"
import Button from "../universal/Button"

const EnterSplashtag = () => (
	<div>
		<div className="title">Hey! Enter your splashtag</div>
		<Input placeholder="Your splashtag" value="hey" isValid={true} />
		<Button onClick={() => console.log("click")}>Login</Button>
		<style jsx global>
			{`
				.title {
					background: yellow;
					height: 100px;
				}
			`}
		</style>
	</div>
)

export default EnterSplashtag
