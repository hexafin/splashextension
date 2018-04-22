export const isCheckoutPage = () => {
	const regex = /card|cc|cvc|cvv|exp/
	let hasCreditCardInput = false
	const inputs = document.getElementsByTagName("input")
	console.log("inputs", inputs)
	for (var input of inputs) {
		if (regex.test(input.name) || regex.test(input.autocomplete)) {
			console.log("credit card related: ", input)
			hasCreditCardInput = true
		}
	}
	console.log("hasinput", hasCreditCardInput)
	return hasCreditCardInput
}

export const creditCard = {
	getExpiryField: () => {
		const expiry = document.querySelector('[autocomplete="cc-exp"]')
		return expiry
	},
	getNumberField: () => {
		const number = document.querySelector('[autocomplete="cc-number"]')
		return number
	},
	getCVCField: () => {
		const cvc = document.querySelector('[autocomplete="cc-csc"]')
		return cvc
	}
}
