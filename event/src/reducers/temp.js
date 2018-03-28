import { actionTypes } from '../actions/app'

const initialState = {
	url: '',
	tabs: {
		{
			url: 'pepperfilters.com',
			data: {
				fonts: 'fonts',
				colors: ['color1', 'color2']
			},
			loadingData: false,
			error: null, 
		}
	},
	loadingUrlData: true,
	getLocalSiteDataFailed: false,
}

export default (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.GET_TAB_DETAILS:
			console.log('geturldetails', action)
			return {
				...state,
				tabs: {
					...state.tabs,
					[action.tabId]: {
						...state.tabs[action.tabId],
						loadingUrlData: true,
						url: action.url
					}
				}
			}
		case actionTypes.GET_TAB_DETAILS_SUCCESS:
			return {
				...state,
				loadingUrlData: false,
				siteData: action.siteData
			}
		case actionTypes.GET_TAB_DETAILS_FAILURE:
			return {
				...state,
				loadingUrlData: false,
				error: action.error,
				url: action.url
			}
		case actionTypes.FETCH_URL_DETAILS_SUCCESS:
			return {
				...state,
				// url: action.url,
				// siteData: action.data
			}
		case actionTypes.FETCH_URL_DETAILS_FAILURE:
			return {
				...state,
				url: action.url,
				error: action.error
			}
		case actionTypes.FETCH_URL_DETAILS:
			return {
				...state,
				url: action.url
			}
		case actionTypes.GET_LOCAL_SITE_DATA:
			return state
		case actionTypes.GET_LOCAL_SITE_DATA_SUCCESS:
			return {
				...state,
				// siteData: action.siteData
			}
		case actionTypes.GET_LOCAL_SITE_DATA_FAILURE:
			return {
				...state,
				getLocalSiteDataFailed: true
			}
		default:
			return state
	}
}


function insertItem(array, action) {
    let newArray = array.slice();
    newArray.splice(action.index, 0, action.item);
    return newArray;
}

function removeItem(array, action) {
	return array.filter((tabData, index) => index != action.tabId)
}