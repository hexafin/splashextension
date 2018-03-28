import { actionTypes } from './actions/app'
import axios from 'axios'
import { messageTypes } from './messageTypes'

const getTabDetails = () => {
	return (dispatch, getState) => {
		chrome.tabs.query({ currentWindow: true, active: true }, tab => {
			const tabId = tab[0].id
			const url = removeRoutePath(cleanUrl(tab[0].url))
			console.log('url here', tab[0])
			dispatch({type: actionTypes.FETCH_URL_DETAILS, tabId: tabId, url: url})
			api.fetchSiteData(url)
				.then(response => {
					console.log('response', response)
					//if already been parsed on server
					if (false) {
						dispatch({type: actionTypes.FETCH_URL_DETAILS_SUCCESS})
						receivedUrlDetails(response.data)
					} else {
						return dispatch(parseSite(tabId))
					}
				})
				.catch(error => {
					dispatch({type: actionTypes.FETCH_URL_DETAILS_FAILURE, url, error})
					dispatch({type: actionTypes.GET_TAB_DETAILS, url, error})
			})
		})
	}
}

const parseSite = tabId => {
	return dispatch => {
		const message = {
			type: messageTypes.GET_LOCAL_SITE_DATA
		}

		chrome.tabs.sendMessage(tabId, message, {}, (res => {
			console.log('res', res)
			if (res.fonts && res.colors) {
				dispatch({type: actionTypes.GET_LOCAL_SITE_DATA_SUCCESS})
				dispatch(receivedUrlDetails(res))
			} else {
				dispatch({type: actionTypes.GET_LOCAL_SITE_DATA_FAILURE})
			}
		}))
	}
}

const receivedUrlDetails = (siteData) => {
	return dispatch => dispatch({type: actionTypes.GET_TAB_DETAILS_SUCCESS, siteData: siteData})
} 

const cleanUrl = url => {
	console.log('url', url)
	return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
}

const removeRoutePath = url => {
	return url.split('/')[0]
}

export default {
	GET_TAB_DETAILS: getTabDetails
}


const api = {
	fetchSiteData: url => {
		return axios.get(`https://api.similarweb.com/v1/SimilarWebAddon/${url}/all`)
		// return Promise.resolve({response: 'hi'})
	}
}