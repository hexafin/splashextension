import axios from "axios"

const cleanUrl = url => {
	console.log("url", url)
	return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
}

const removeRoutePath = url => {
	return url.split("/")[0]
}

const api = {
	fetchSiteData: url => {
		return axios.get(`https://api.similarweb.com/v1/SimilarWebAddon/${url}/all`)
		// return Promise.resolve({response: 'hi'})
	}
}
