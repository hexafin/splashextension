import rgba from 'rgba-convert'
import { cleanFont, fontToArray, findFontWeightFromName } from './lib/fontUtils'
import colorjs from 'color-js'
import chroma from 'chroma-js'

export const parseSite = tabId => {
	// const html = document.documentElement.outerHTML
	const processedFonts = findFonts().map(font => {
		console.log('font', font)
		const displayFontWeight = findFontWeightFromName(font)
		console.log('displayFontWeight', displayFontWeight, font.name)
		const cleanedFont = cleanFont(font.name)
		console.log('cleanedFont', cleanedFont)

			return {
				actualFontFamily: font.name,
				displayFontFamily: fontToArray(cleanedFont).slice(0,1),
				actualFontWeight: font.weight,
				displayFontWeight: displayFontWeight,
				fontAsArray: fontToArray(cleanedFont),
			}
		})

	const colors = findColors()
	console.log('colorspresort', colors)

	const processedColors = sortColorsBySat(colors).slice(0, 5)
	console.log('colorspostsat', processedColors)


	return {fonts: processedFonts, colors: processedColors}
}


const sortColorsBySat = colors => {
    return colors.sort((c1, c2) => {
        const sat1 = chroma(c1).get('hsl.s')
        const sat2 = chroma(c2).get('hsl.s')
        // console.log('sat', sat1)
        // console.log('sat2', sat2)
        return sat2 - sat1
    })
}


const isElementVisible = el => {
  var rect     = el.getBoundingClientRect(),
      vWidth   = window.innerWidth || doc.documentElement.clientWidth,
      vHeight  = window.innerHeight || doc.documentElement.clientHeight,
      efp      = function (x, y) { return document.elementFromPoint(x, y) };     

  // Return false if it's not in the viewport
  if (rect.right < 0 || rect.bottom < 0 
          || rect.left > vWidth || rect.top > vHeight)
      return false;

  // Return true if any of its four corners are visible
  return (
        el.contains(efp(rect.left,  rect.top))
    ||  el.contains(efp(rect.right, rect.top))
    ||  el.contains(efp(rect.right, rect.bottom))
    ||  el.contains(efp(rect.left,  rect.bottom))
  );
}


const findColors = () => {
	const html = document.querySelectorAll('*')
	let colors = {}
	//visible elements will be assigned extra priority
	let visibleElements = []
	let visibleColors = {}
	const excludedTypes = ['HEAD', 'SCRIPT', 'META', 'TITLE', 'LINK', 'STYLE', 'SOURCE', 'VIDEO']
	const excludedColors = ['#0000', '#000','#000000', '#E82110', '#F00', '#FFF0']
	html.forEach((el, i) => {
		let type = el.nodeName
		let color = getCss(el, 'color')
		let bgColor = getCss(el, 'background-color')
		let borderColor = getCss(el, 'border-color')

		if (isElementVisible(el)) {
			visibleElements.push(el)
			// console.log('visible ', el, 'color: ', color, 'visible bg: ', bgColor)
			color = rgba.hex(color)
			bgColor = rgba.hex(bgColor)
			if (visibleColors[color] == undefined) {
				visibleColors[color] = 1
			} else {
				visibleColors[color] = visibleColors[color] + 1
			}

			if (visibleColors[bgColor] == undefined) {
				visibleColors[bgColor] = 1
			} else {
				visibleColors[bgColor] = visibleColors[bgColor] + 1
			}
		}

		// Don't include any meta or other irrelevant types
		if (excludedTypes.includes(type)) {
			return
		}

		if (colors[color] == undefined) {
			colors[color] = 1
		} else {
			colors[color] = colors[color] + 1
		}

		if (colors[bgColor] == undefined) {
			colors[bgColor] = 1
		} else {
			colors[bgColor] = colors[bgColor] + 1
		}

		if (colors[borderColor] == undefined) {
			colors[borderColor] = 1
		} else {
			colors[borderColor] = colors[borderColor] + 1
		}

		// console.log('COLOR: ', el, rgba.hex(color))
		// console.log('BGCOLOR: ', el.nodeName, rgba.hex(bgColor))

	})

	const sortedColors = Object.keys(colors).sort((a, b) => colors[b] - colors[a])
	const hexColors = sortedColors.map(color => {
			try {
				return chroma(color).hex()
			} catch (e) {
				console.log('color error', e)
			}
		})
	// console.log('sorted', sortedColors)
	console.log(colors)	
	// console.log('viselements', visibleElements)
	// console.log('viscoors', visibleColors)
	function uniq(a) {
   return Array.from(new Set(a));
	}
	const cleanedColors = hexColors.filter(color => !excludedColors.includes(color))
	const dedupedColors = uniq(cleanedColors)

	return dedupedColors	
}


const findFonts = () => {
	const html = document.querySelectorAll('*')

	//counted font-familys
	let fontsCount = {}
	//final return font array
	let fonts = []

	const headings = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
	const excludedTypes = ['HEAD', 'SCRIPT', 'META', 'TITLE', 'LINK', 'STYLE', 'SOURCE', 'VIDEO']
	const headingFonts = {}

	const weightsCount = {}

	const countWeights = element => {
		let weight = getCss(element, 'font-weight')

		//create a counter of weights
		if (weightsCount[weight] == undefined) {
			weightsCount[weight] = 1
		} else {
			weightsCount[weight] = weightsCount[weight] + 1
		}

	}

	const countFonts = element => {
		let font = getCss(element, 'font-family')

		//create a counter of styles
		if (fontsCount[font] == undefined) {
			fontsCount[font] = 1
		} else {
			fontsCount[font] = fontsCount[font] + 1
		}
	}

	const countHeadingFonts = element => {
		let type = element.nodeName

		//take any h1, h2 etc and count it to headingFonts
		if (headings.includes(type)) {
			let font = getCss(element, 'font-family')
			headingFonts[type] = {font: font, count: (headingFonts[type] != undefined ? headingFonts[type].count + 1 : 1)}
		}
	}

	const getPrimaryFontWeight = () => {
		const h1 = document.getElementsByTagName('h1')[0]
		const h1Weight = getCss(h1, 'font-weight')
		if (h1Weight) {
			return h1Weight
		} else {
			return sortedWeightCount[1] || sortedWeightCount[2]
		}
	}

	const getSecondaryFontWeight = () => {
		//return the most popular font weight on the site
		return sortedWeightCount[0]
	}

	//go through all elements on the page and count
	//fontweights and fonts and headings
	html.forEach((element, i) => {
		let type = element.nodeName

		// Don't include any meta or other irrelevant types
		if (excludedTypes.includes(type)) {
			return
		}
		countWeights(element)
		countFonts(element)
		countHeadingFonts(element)

	})

	// console.log('headingFonts', headingFonts)
	// console.log('unsortedCount', fontsCount)
	const sortedfontsCount = sortByCount(fontsCount)
	const sortedWeightCount = sortByCount(weightsCount)

	console.log('before', fontsCount)
	console.log('before', weightsCount)
	console.log('sorted', sortedWeightCount)
	// console.log('sortedStyles', sortedfontsCount)
// headingFonts.H1
	if (false) {
		fonts[0] = {name: headingFonts.H1.font, weight: getPrimaryFontWeight()}

	} else {
		let primaryFont = {weight: getPrimaryFontWeight()}
		primaryFont.name = sortedfontsCount[2] || sortedfontsCount[1] || sortedfontsCount[0]
		fonts[0] = primaryFont
	}

	let secondaryFont = {weight: getSecondaryFontWeight()}
	secondaryFont.name = sortedfontsCount[0]
	fonts[1] = secondaryFont

	//Add the other lesser known ones
	sortedfontsCount.filter(font => !fonts.includes(font)).forEach((font, index) => {
				//+ 2 because already index 0 and one are filled
				let otherFont = {weight: getSecondaryFontWeight()}
				otherFont.name = font

				fonts[index + 2] = otherFont
			
		})

	// console.log('fonts', fonts)
	// fonts = [
	// 	{font: '"AvenirNext-Web Semibold"', sans-serif, weight: 500}, 
	// 	{font: '"Graphik-Thin"', sans-serif, weight: 400}
	// ]
	return fonts
}

/*
* @param Object {'avenir next': 5, 'Graphik': 124}
*/
const sortByCount = countObj => {
	return Object.keys(countObj).sort((a, b) => countObj[b] - countObj[a])
}


const getCss = (element, property) => {
	try {
		return window.getComputedStyle(element, null).getPropertyValue(property);
	} catch (e) {}
		return null;
}


