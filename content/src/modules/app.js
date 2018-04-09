import { closeExtension } from "../index"
import axios from "axios"
import { cleanUrl, removeRoutePath } from "../lib/urls"

const initialState = {
	splashtag: null,
	activeComponent: "PROMPT_FOR_PAY",
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
	}
}

const GO_TO = "GO_TO"
const CLOSE_EXTENSION = "CLOSE_EXTENSION"
const UPDATE_SPLASHTAG = "UPDATE_SPLASHTAG"
const UPDATE_AMOUNT = "UPDATE_AMOUNT"
const START_TRANSACTION_INIT = "START_TRANSACTION_INIT"
const START_TRANSACTION_SUCCESS = "START_TRANSACTION_SUCCESS"
const START_TRANSACTION_FAILURE = "START_TRANSACTION_FAILURE"
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

		default:
			return state
	}
}

export const startTransactionInit = () => {
	return {
		type: START_TRANSACTION_INIT
	}
}

export const startTransactionSuccess = (transactionId) => {
	return {
		type: START_TRANSACTION_SUCCESS,
		transactionId
	}
}

export const startTransactionFailure = (error) => {
	return {
		type: START_TRANSACTION_FAILURE,
		error
	}
}

export const startTransaction = (splashtag, amount, userId="TGntKESxtoez4eKnc27R6wgsjr43", extensionId="test", currency="USD") => {
	return dispatch => {

		dispatch(startTransactionInit())

		const params = {
			splashtag: splashtag,
			userId: userId,
			extensionId: extensionId,
			amount: amount,
			currency: currency,
			domain: removeRoutePath(cleanUrl(window.location.href))
		}

		axios.post(
			"https://us-central1-hexa-splash.cloudfunctions.net/initializeTransaction",
			params
		).then(response => {
			console.log(response)
			dispatch(startTransactionSuccess(response.data))
			dispatch(goTo("WAIT_FOR_AUTHORIZATION"))

		}).catch(error => {
			dispatch(startTransactionFailure(error))
			dispatch(goTo("PROMPT_FOR_PAY"))
		})
	}
}

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
