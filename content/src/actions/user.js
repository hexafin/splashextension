import axios from 'axios'
import { startScreenshotSelection } from '../lib/screenshot'

export const actionTypes = {
	LIKE_SITE: 'LIKE_SITE',
	LIKE_SITE_SUCCESS: 'LIKE_SITE_SUCCESS',
	LIKE_SITE_FAILURE: 'LIKE_SITE_FAILURE',
	UNLIKE_SITE: 'UNLIKE_SITE',
	UNLIKE_SITE_SUCCESS: 'UNLIKE_SITE_SUCCESS',
	UNLIKE_SITE_FAILURE: 'UNLIKE_SITE_FAILURE',
	BOOKMARK_SITE: 'BOOKMARK_SITE',
	BOOKMARK_SITE_SUCCESS: 'BOOKMARK_SITE_SUCCESS',
	BOOKMARK_SITE_FAILURE: 'BOOKMARK_SITE_FAILURE',
	UNBOOKMARK_SITE: 'UNBOOKMARK_SITE',
	UNBOOKMARK_SITE_SUCCESS: 'UNBOOKMARK_SITE_SUCCESS',
	UNBOOKMARK_SITE_FAILURE: 'UNBOOKMARK_SITE_FAILURE',
	START_SCREENSHOT: 'START_SCREENSHOT',
	RECEIVE_SCREENSHOT: 'RECEIVE_SCREENSHOT',
	FAIL_SCREENSHOT: 'FAIL_SCREENSHOT'
}

export const handleScreenshotClick = () => {
	return dispatch => {
		dispatch(startScreenshot())
	}
}

const startScreenshot = () => {
	return dispatch => {
		dispatch({type: actionTypes.START_SCREENSHOT})
		startScreenshotSelection()
			.then(imgUrl => dispatch(receiveScreenshot(imgUrl)))
			.catch(e => dispatch(abortScreenshot(e)))
	}
}

const receiveScreenshot = imgUrl => {
	return dispatch => {
		dispatch({
			type: 'RECEIVE_SCREENSHOT', 
			screenshotPreview: imgUrl
		})
	}
}

const abortScreenshot = error => {
	return dispatch => {
		dispatch({
			type: 'FAIL_SCREENSHOT', 
			screenshotError: error
		})
	}
}


export const handleLike = () => {
	return (dispatch, getState) => {
		if (getState().user.hasLiked) {
			dispatch(unlikeSite())
		} else {
			dispatch(likeSite())
		}
	}
}

const likeSite = () => {
	return (dispatch, getState) => {
		dispatch({type: actionTypes.LIKE_SITE})

		api.likeSite(getState().app.url)
			.then(response => {
				dispatch({type: actionTypes.LIKE_SITE_SUCCESS})
			})
			.catch(error => {
				dispatch({type: actionTypes.LIKE_SITE_FAILURE})
			})

	}
}

const unlikeSite = () => {
	return (dispatch, getState) => {
		dispatch({type: actionTypes.UNLIKE_SITE})

		api.unlikeSite(getState().app.url)
			.then(response => {
				dispatch({type: actionTypes.UNLIKE_SITE_SUCCESS})
			})
			.catch(error => {
				dispatch({type: actionTypes.UNLIKE_SITE_FAILURE})
			})

	}
}


export const handleBookmark = () => {
	console.log('handleing like')
	return (dispatch, getState) => {
		if (getState().user.hasBookmarked) {
			dispatch(unbookmarkSite())
		} else {
			dispatch(bookmarkSite())
		}
	}
}

const bookmarkSite = () => {
	return (dispatch, getState) => {
		dispatch({type: actionTypes.BOOKMARK_SITE})

		api.bookmarkSite(getState().app.url)
			.then(response => {
				dispatch({type: actionTypes.BOOKMARK_SITE_SUCCESS})
			})
			.catch(error => {
				dispatch({type: actionTypes.BOOKMARK_SITE_FAILURE})
			})

	}
}

const unbookmarkSite = () => {
	return (dispatch, getState) => {
		dispatch({type: actionTypes.UNBOOKMARK_SITE})

		api.unbookmarkSite(getState().app.url)
			.then(response => {
				dispatch({type: actionTypes.UNBOOKMARK_SITE_SUCCESS})
			})
			.catch(error => {
				dispatch({type: actionTypes.UNBOOKMARK_SITE_FAILURE})
			})

	}
}


const api = {
	likeSite: (url) => {
		return Promise.resolve()
	},
	unlikeSite: (url) => {
		return Promise.resolve()
	},
	bookmarkSite: (url) => {
		return Promise.resolve()
	},
	unbookmarkSite: (url) => {
		return Promise.resolve()
	},

}
