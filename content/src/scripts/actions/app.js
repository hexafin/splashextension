import axios from 'axios'
import { messageTypes } from '../messageTypes'
import { parseSite } from '../scrape'

export const actionTypes = {
	GET_TAB_DETAILS: 'GET_TAB_DETAILS',
	GET_TAB_DETAILS_SUCCESS: 'GET_TAB_DETAILS_SUCCESS',
	GET_TAB_DETAILS_FAILURE: 'GET_TAB_DETAILS_FAILURE',
	FETCH_URL_DETAILS_SUCCESS: 'FETCH_URL_DETAILS_SUCCESS',
	FETCH_URL_DETAILS_FAILURE: 'FETCH_URL_DETAILS_FAILURE',
	FETCH_URL_DETAILS: 'FETCH_URL_DETAILS',
	PARSE_SITE: 'PARSE_SITE',
	GET_LOCAL_SITE_DATA: 'RECEIVE_LOCAL_SITE_DATA',
	GET_LOCAL_SITE_DATA_SUCCESS: 'GET_LOCAL_SITE_DATA_SUCCESS',
	GET_LOCAL_SITE_DATA_FAILURE: 'GET_LOCAL_SITE_DATA_FAILURE',
}


export const getTabDetails = tabId => {
	return (dispatch, getState) => {
			const uncleanUrl = window.location.href
			const url = removeRoutePath(cleanUrl(uncleanUrl))
			dispatch({type: actionTypes.FETCH_URL_DETAILS, tabId: tabId, url: url})
			api.fetchSiteData(url)
				.then(response => {
					console.log('response', response)
					//if already been parsed on server
					if (false) {
						dispatch({type: actionTypes.FETCH_URL_DETAILS_SUCCESS})
						receivedUrlDetails(response.data)
					} else {
						return dispatch(getLocalSiteData(tabId))
					}
				})
				.catch(error => {
					dispatch({type: actionTypes.FETCH_URL_DETAILS_FAILURE, url, error})
					dispatch({type: actionTypes.GET_TAB_DETAILS, url, error})
			})
	}
}

const getLocalSiteData = tabId => {
	return dispatch => {
			const siteData = parseSite(tabId)
			console.log('siteData', siteData)
			if (siteData.fonts && siteData.colors) {
				dispatch({type: actionTypes.GET_LOCAL_SITE_DATA_SUCCESS})
				dispatch(receivedUrlDetails(siteData))
			} else {
				dispatch({type: actionTypes.GET_LOCAL_SITE_DATA_FAILURE})
			}
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

const api = {
	fetchSiteData: url => {
		// return axios.get(`https://api.similarweb.com/v1/SimilarWebAddon/${url}/all`)
		return Promise.resolve({response: 'hi'})
	}
}