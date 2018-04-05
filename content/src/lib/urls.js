const cleanUrl = url => {
	console.log("url", url)
	return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
}

const removeRoutePath = url => {
	return url.split("/")[0]
}
