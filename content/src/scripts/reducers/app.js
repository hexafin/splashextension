import { actionTypes as appActions } from '../actions/app'
import { actionTypes as userActions } from '../actions/user'

const initialState = {
	url: '',
	traffic: 20000,
  colors: ['#ff3366', 'blue', 'red', 'green', 'yellow'],
  fonts: [
      { 
        font: 'avenir',
        weight: '400 || semi bol'
      }],
  likes: 211,
  fullPagePreview: 'https://lapa.ninja/assets/images/User-Engagement-Mixpanel-thumb.jpg',
  Similar: [{
      Url: 'stripe.com',
      preview: 'url',
  }],
	loadingUrlData: true,
	getLocalSiteDataFailed: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case appActions.GET_TAB_DETAILS:
			console.log('geturldetails', action)
			return {
				...state,
				loadingUrlData: true
			}
		case appActions.GET_TAB_DETAILS_SUCCESS:
			return {
				...state,
				loadingUrlData: false,
				...action.siteData
			}
		case appActions.GET_TAB_DETAILS_FAILURE:
			return {
				...state,
				loadingUrlData: false,
				error: action.error,
				url: action.url
			}
		case appActions.FETCH_URL_DETAILS_SUCCESS:
			return {
				...state,
				// url: action.url,
				// siteData: action.data
			}
		case appActions.FETCH_URL_DETAILS_FAILURE:
			return {
				...state,
				url: action.url,
				error: action.error
			}
		case appActions.FETCH_URL_DETAILS:
			return {
				...state,
				loadingUrlData: true,
				url: action.url
			}
		case appActions.GET_LOCAL_SITE_DATA:
			return state
		case appActions.GET_LOCAL_SITE_DATA_SUCCESS:
			return {
				...state,
				// siteData: action.siteData
			}
		case appActions.GET_LOCAL_SITE_DATA_FAILURE:
			return {
				...state,
				getLocalSiteDataFailed: true
			}
		case userActions.LIKE_SITE:
			return {
				...state,
				likes: state.likes + 1
			}
		case userActions.UNLIKE_SITE:
			return {
				...state,
				likes: Math.abs(state.likes - 1)
			}
		case userActions.LIKE_SITE:
			return {
				...state,
				likes: state.likes + 1
			}
		case userActions.UNLIKE_SITE:
			return {
				...state,
				likes: Math.abs(state.likes - 1)
			}
		case 'ADD_PREVIEW_IMAGE':
			return {
				...state,
				fullPagePreview: action.src
			}
		default:
			return state
	}
}