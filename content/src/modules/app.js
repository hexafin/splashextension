import { closeExtension } from "../index"
const initialState = {
	splashtag: "",
	activeComponent: "CARD_CREATED"
}

const GO_TO = "GO_TO"
const CLOSE_EXTENSION = "CLOSE_EXTENSION"
const UPDATE_SPLASHTAG = "UPDATE_SPLASHTAG"

export default (state = initialState, action) => {
	switch (action.type) {
		case GO_TO:
			return {
				...state,
				activeComponent: action.component
			}
		case CLOSE_EXTENSION:
			return {
				...state
			}
		case UPDATE_SPLASHTAG:
			return {
				...state,
				splashtag: action.splashtag
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

export const onCloseExtension = () => {
	closeExtension()
}
