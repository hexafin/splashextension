

/* 
* @param String font 
* e.g. 'Graphik Web, Helvetica Neue, Avenir Next, sans serif'
* @return [ 'Graphik Web', 'Helvetica Neue', 'Avenir Next', 'sans serif' ]
*/
export const fontToArray = (font) => {
	return font.split(',').map(f => f.trim())
}


/* 
* @param String font 
* e.g. '"Graphik-Web", "Helvetica Neue", "Avenir Next", sans-serif'
* @return 'Graphik Web, Helvetica Neue, Avenir Next, sans-serif'
*/
export const cleanFont = (font) => {
	const cleanedFont = font.replace(/-/g, " ").replace(/\"|\'/g, "")

	return removeFontWeightsFromName(cleanedFont)
}

/*
*	@param String font
* e.g. {font: "Graphik-WebSemiBold", weight: 500}
* @return 'semibold' or null if not found
*/
export const findFontWeightFromName = font => {
	const firstFont = font.name.substring(0, font.name.indexOf(','))
	const weights = {}
	weights.semibold = firstFont.indexOf('semibold')
	weights.bold = firstFont.indexOf('bold')
	weights.semi = firstFont.indexOf('semi')
	weights.thin = firstFont.indexOf('thin')
	weights.demi = firstFont.indexOf('demi')
	weights.regular = firstFont.indexOf('regular')
	weights.medium = firstFont.indexOf('medium')
	weights.heavy = firstFont.indexOf('heavy')

	//semibold should be returned instead of bold 
	if (weights.semibold >= 0) {
		return 'semibold'
	}  
	console.log('weights', weights)

	//return the weight that was found in the font string
	for (let weight in weights) {
		if (weights[weight] >= 0) {
			return weight
		}
	}

	//if none of these was found, return computed weight e.g. 500 from passed object
	return font.weight
	
}


export const removeFontWeightsFromName = font => {
	return font.replace(/demi|semi|bold|semibold|thin|heavy|regular|medium/g, '')
}