require('firebase')
import { closeExtension } from "../index"
import axios from "axios"
import { cleanUrl, removeRoutePath } from "../lib/urls"
import firebase, { auth } from '../firebase.js'

const initialState = {
	splashtag: null,
	user_id: null,
	extension_uuid: null,
	activeComponent: "ENTER_PHONE_NUMBER",
	isStartingTransaction: false,
	transactionId: null,
	amount: null,
	card: {
		availableBalance: null,
		cardNumber: null,
		currency: null,
		cvc: null,
		status: null,
		expiry: null,
		svbId: null,
		last4: null,
		totalCardAmount: null,
		transactionsMax: null
	},
	phoneNumber: null,
	isAuthenticating: false,
	errorAuthenticating: null,
	isConfirming: false,
	errorConfirming: null,
	loggedIn: false,
}

const GO_TO = "GO_TO"
const CLOSE_EXTENSION = "CLOSE_EXTENSION"
const UPDATE_SPLASHTAG = "UPDATE_SPLASHTAG"
const UPDATE_AMOUNT = "UPDATE_AMOUNT"
const START_TRANSACTION_INIT = "START_TRANSACTION_INIT"
const START_TRANSACTION_SUCCESS = "START_TRANSACTION_SUCCESS"
const START_TRANSACTION_FAILURE = "START_TRANSACTION_FAILURE"
const AUTH_INIT = "AUTH_INIT"
const AUTH_SUCCESS = "AUTH_SUCCESS"
const AUTH_FAILURE = "AUTH_FAILURE"
const CONFIRM_INIT = "CONFIRM_INIT"
const CONFIRM_SUCCESS = "CONFIRM_SUCCESS"
const CONFIRM_FAILURE = "CONFIRM_FAILURE"
const UPDATE_CARD = "UPDATE_CARD"

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

		case UPDATE_AMOUNT:
			return {
				...state,
				amount: action.amount
			}

		case UPDATE_CARD:
			return {
				...state,
				card: action.card
			}

		case START_TRANSACTION_INIT:
			return {
				...state,
				isStartingTransaction: true
			}

		case START_TRANSACTION_SUCCESS:
			return {
				...state,
				isStartingTransaction: false,
				transactionId: action.transactionId
			}

		case START_TRANSACTION_FAILURE:
			return {
				...state,
				isStartingTransaction: false,
				errorStartingTransaction: action.error
			}

        case AUTH_INIT:
            return {
                ...state,
                isAuthenticating: true,
                errorAuthenticating: null,
                loggedIn: false,
                phoneNumber: action.phoneNumber,
                extension_uuid: action.extension_uuid,
            };

        case AUTH_SUCCESS:
            return {
                ...state,
                isAuthenticating: false,
                errorAuthenticating: null,
            };

        case AUTH_FAILURE:
            return {
                ...state,
                isAuthenticating: false,
                phoneNumber: null,
                errorAuthenticating: action.error
            };

        case CONFIRM_INIT:
            return {
                ...state,
                isConfirming: true,
                errorConfirming: null,
                loggedIn: false,
            };

        case CONFIRM_SUCCESS:
            return {
                ...state,
                isConfirming: false,
                errorConfirming: null,
                loggedIn: true,
                phoneNumber: null,
                splashtag: action.splashtag,
                user_id: action.user_id,
            };

        case CONFIRM_FAILURE:
            return {
                ...state,
                isConfirming: false,
                phoneNumber: null,
                errorConfirming: action.error
            };

		default:
			return state
	}
}

export const startTransactionInit = () => {
	return {
		type: START_TRANSACTION_INIT
	}
}

export const startTransactionSuccess = transactionId => {
	return {
		type: START_TRANSACTION_SUCCESS,
		transactionId
	}
}

export const startTransactionFailure = error => {
	return {
		type: START_TRANSACTION_FAILURE,
		error
	}
}

export const startTransaction = (
	splashtag,
	amount,
	user_id,
	extension_uuid,
	currency = "USD"
) => {
	return dispatch => {
		dispatch(startTransactionInit())
		dispatch(updateAmount(amount))
		const params = {
			splashtag: splashtag,
			userId: user_id,
			extensionId: extension_uuid,
			amount: amount,
			currency: currency,
			domain: removeRoutePath(cleanUrl(window.location.href))
		}
		axios
			.post(
				'https://us-central1-hexa-splash.cloudfunctions.net/initializeTransaction',
				params
			)
			.then(response => {
				console.log(response)
				dispatch(startTransactionSuccess(response.data))
				dispatch(goTo('WAIT_FOR_AUTHORIZATION'))
			})
			.catch(error => {
				dispatch(startTransactionFailure(error))
				dispatch(goTo('PROMPT_FOR_PAY'))
			})
	}
}

export const AuthInit = (phoneNumber, extension_uuid) => {
	return {
		type: AUTH_INIT,
		phoneNumber,
		extension_uuid
	}
}

export const AuthSuccess = () => {
	return {
		type: AUTH_SUCCESS,
	}
}

export const AuthFailure = (error) => {
	return {
		type: AUTH_FAILURE,
		error
	}
}

// initiate firebase auth
export const Authenticate = (phoneNumber) => {
	return (dispatch, getState) => {
		phoneNumber = '+1' + phoneNumber

		chrome.runtime.sendMessage({type: "AUTH"}, function(response) {
			const extension_uuid = response.uid
			const params = {
				phoneNumber: phoneNumber,
				extension_uuid: extension_uuid,
			}
			axios
				.post(
					"https://us-central1-hexa-splash.cloudfunctions.net/linkExtension",
					params
				)
				.then(data => {
					dispatch(AuthInit(phoneNumber, extension_uuid))
					dispatch(goTo("ENTER_PIN"))
				})
				.catch(error => {
					dispatch(AuthFailure(error))
				})


		});
	}
};

export const ConfirmInit = (pin) => {
	return {
		type: CONFIRM_INIT,
		pin
	}
}

export const ConfirmSuccess = (splashtag, user_id) => {
	return {
		type: CONFIRM_SUCCESS,
		splashtag,
		user_id,
	}
}

export const ConfirmFailure = (error) => {
	return {
		type: CONFIRM_FAILURE,
		error
	}
}

// confirm pin
export const Confirm = (pin) => {
	return (dispatch, getState) => {
		const state = getState().app

		dispatch(ConfirmInit(pin))

		const params = {
			phoneNumber: state.phoneNumber,
			pin: pin,
			extension_uuid: state.extension_uuid,
		}

		axios
			.post(
				"https://us-central1-hexa-splash.cloudfunctions.net/confirmExtension",
				params
			)
			.then(response => {
				if (response.data.length == 2) {
					dispatch(ConfirmSuccess(response.data[0], response.data[1])) // splashtag and user_id
					dispatch(goTo("PROMPT_FOR_PAY"))
				} else {
					dispatch(ConfirmFailure("Incorrect PIN"))
					dispatch(goTo("ENTER_PHONE_NUMBER"))
				}
			})
			.catch(error => {
				dispatch(ConfirmFailure(error))
				dispatch(goTo("ENTER_PHONE_NUMBER"))
			})
	}
};
export const updateAmount = amount => {
	return {
		type: UPDATE_AMOUNT,
		amount: amount
	}
}

export const updateCard = card => {
	return {
		type: UPDATE_CARD,
		card: card
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
