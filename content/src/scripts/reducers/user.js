import { actionTypes } from '../actions/user'

const initialState = {
	likedBy: [
    {
      name: 'name',
      description: 'eco @ pineapple',
      avatar: 'url',
    }
  ],
	processingLikeAction: false,
	hasLiked: false,
	hasBookmarked: false,
	hasScreenshotted: false,
	processingBookmarkAction: false,
	screenshotInProgress: false,
	screenshotPreview: null,
}

export default (state = initialState, action) => {
		console.log('helloooo', action)
	switch (action.type) {
		case actionTypes.LIKE_SITE:
			return {
				...state,
				hasLiked: true,
				processingLikeAction: true, 
			}
		case actionTypes.LIKE_SITE_SUCCESS:
			return {
				...state,
				processingLikeAction: false,
			}
		case actionTypes.LIKE_SITE_FAILURE:
			return {
				...state,
				processingLikeAction: false,
				hasLiked: false,
				error: action.error,
				}
		case actionTypes.UNLIKE_SITE:
			return {
				...state,
				hasLiked: false,
				processingLikeAction: true, 
			}
		case actionTypes.UNLIKE_SITE_SUCCESS:
			return {
				...state,
				processingLikeAction: false,
			}
		case actionTypes.UNLIKE_SITE_FAILURE:
			return {
				...state,
				hasLiked: true,
				processingLikeAction: false,
				}
			case actionTypes.BOOKMARK_SITE:
			return {
				...state,
				processingBookmarkAction: true, 
			}
		case actionTypes.BOOKMARK_SITE_SUCCESS:
			return {
				...state,
				hasBookmarked: true,
				processingBookmarkAction: false,
			}
		case actionTypes.BOOKMARK_SITE_FAILURE:
			return {
				...state,
				processingBookmarkAction: false,
				}
		case actionTypes.UNBOOKMARK_SITE:
			return {
				...state,
				hasBookmarked: false,
				processingBookmarkAction: true, 
			}
		case actionTypes.UNBOOKMARK_SITE_SUCCESS:
			return {
				...state,
				processingBookmarkAction: false,
			}
		case actionTypes.UNBOOKMARK_SITE_FAILURE:
			return {
				...state,
				hasBookmarked: true,
				processingBookmarkAction: false,
				}		
		case actionTypes.START_SCREENSHOT:
		console.log('startscreenshot')
			return {
				...state,
				screenshotInProgress: true,
			}
		case actionTypes.RECEIVE_SCREENSHOT:
			return {
				...state,
				screenshotInProgress: false,
				screenshotPreview: action.screenshotPreview
			}
		case actionTypes.FAIL_SCREENSHOT:
			return {
				...state,
				screenshotInProgress: false,
				screenshotError: action.screenshotError
			}
		default:
			return state
	}
}