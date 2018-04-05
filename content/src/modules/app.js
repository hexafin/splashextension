const initialState = {
	splashtag: "",
	activeComponent: "PROMPT_FOR_PAY"
}

const GO_TO = "GO_TO"

export default (state = initialState, action) => {
	switch (action.type) {
		case GO_TO:
			return {
				...state,
				activeComponent: action.component
			}
		default:
			return state
	}
}

export const goTo = component => {
	return {
		type: GO_TO,
		component
	}
}
