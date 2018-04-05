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

