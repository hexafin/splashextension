import { closeExtension } from '../index'
import axios from 'axios'
import { cleanUrl, removeRoutePath } from '../lib/urls'
import { getPhone } from "../api"
import { auth } from "../firebase"

const initialState = {
	splashtag: null,
	isLinking: false,
	errorLinking: null,
	isVerifyingCode: false,
	errorVerifyingCode: null,
	activeComponent: 'ENTER_PHONE_NUMBER',
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

const GO_TO = 'GO_TO'
const CLOSE_EXTENSION = 'CLOSE_EXTENSION'
const LINK_INIT = 'LINK_INIT'
const LINK_SUCCESS = 'LINK_SUCCESS'
const LINK_FAILURE = 'LINK_FAILURE'
const VERIFY_CODE_INIT = 'VERIFY_CODE_INIT'
const VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS'
const VERIFY_CODE_FAILURE = 'VERIFY_CODE_FAILURE'
const UPDATE_AMOUNT = 'UPDATE_AMOUNT'
const UPDATE_SPLASHTAG = 'UPDATE_SPLASHTAG'
const START_TRANSACTION_INIT = 'START_TRANSACTION_INIT'
const START_TRANSACTION_SUCCESS = 'START_TRANSACTION_SUCCESS'
const START_TRANSACTION_FAILURE = 'START_TRANSACTION_FAILURE'
const UPDATE_CARD = 'UPDATE_CARD'

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

		case UPDATE_AMOUNT:
			return {
				...state,
				amount: action.amount
			}

		case UPDATE_SPLASHTAG:
			return {
				...state,
				splashtag: action.splashtag
			}

		case UPDATE_CARD:
			return {
				...state,
				card: action.card
			}

		case LINK_INIT:
			return {
				...state,
				isLinking: true,
				linkingSplashtag: null,
			}

		case LINK_SUCCESS:
			return {
				...state,
				isLinking: false,
				linkingSplashtag: action.linkingSplashtag
			}

		case LINK_FAILURE:
			return {
				...state,
				isLinking: false,
				errorLinking: action.error
			}

		case VERIFY_CODE_INIT:
			return {
				...state,
				isVerifyingCode: true
			}

		case VERIFY_CODE_SUCCESS:
			return {
				...state,
				isVerifyingCode: false,
				splashtag: action.splashtag
			}

		case VERIFY_CODE_FAILURE:
			return {
				...state,
				isVerifyingCode: false,
				errorVerifyingCode: action.error
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

export const linkInit = () => {
	return {
		type: LINK_INIT
	}
}

export const linkSuccess = linkingSplashtag => {
	return {
		type: LINK_SUCCESS,
		linkingSplashtag
	}
}

export const linkFailure = error => {
	return {
		type: LINK_FAILURE,
		error
	}
}

export const verifyCodeInit = () => {
	return {
		type: VERIFY_CODE_INIT
	}
}

export const verifyCodeSuccess = splashtag => {
	return {
		type: VERIFY_CODE_SUCCESS,
		splashtag
	}
}

export const verifyCodeFailure = error => {
	return {
		type: VERIFY_CODE_FAILURE,
		error
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
	userId = 'TGntKESxtoez4eKnc27R6wgsjr43',
	extensionId = 'test',
	currency = 'USD'
) => {
	return dispatch => {
		dispatch(startTransactionInit())
		dispatch(updateAmount(amount))
		const params = {
			splashtag: splashtag,
			userId: userId,
			extensionId: extensionId,
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

export const Link = splashtag => {
	return dispatch => {
		// get phone number from splashtag
		dispatch(linkInit())
		getPhone(splashtag).then(result => {
			console.log(result)
		}).catch(error => {
			dispatch(linkFailure(error))
		})
	}
}

export const VerifyCode = code => {
	return dispatch => {
		
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
