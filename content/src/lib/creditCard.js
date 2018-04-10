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
		const expiry = document.querySelectorAll('[autocomplete="cc-exp"]')
		return expiry
	},
	getNumberField: () => {
		const number = document.querySelectorAll('[autocomplete="cc-number"]')
		return number
	},
	getCVCField: () => {
		const cvc = document.querySelectorAll('[autocomplete="cc-csc"]')
		return cvc
	}
}
