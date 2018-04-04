
import { closeOnOutsideClickHandler } from '../index'
import ChromePromise from 'chrome-promise'
const chromep = new ChromePromise()
require('./screenshot.css')

 export const startScreenshotSelection = () => {
    return new Promise((resolve, reject) => {   
      new ScreenCapture(resolve, reject)
    })
  }


//* returns promise 
class ScreenCapture {

  constructor(resolve, reject) {
    //callback --> resolves promise when done
    this._resolve = resolve
    this._reject = reject
    this._cover = document.createElement("div")
    this._selection = document.createElement("div")
    this._selection.style = "box-sizing: border-box; position: fixed; top: 0; left: 0; width: 100%; height: 100%; border-color: rgba(0,0,0,0.2); border-style: solid; z-index: 2147483644"
    this._cover.style="user-select: none; background: rgba(0,0,0,0.2);position: fixed;z-index: 2147483645;top: 0;left: 0;right: 0;bottom: 0;transition: opacity 1000ms;"
    this._guides = document.createElement('div')
    this._guides.id = "screenshotGuides"
    this._selectionInProgress = false
    document.body.appendChild(this._cover)
    document.documentElement.appendChild(this._selection)

    this._x1 = 0
    this._x2 = 0

    this._addGuides()
    this._addListeners()
    document.removeEventListener('click', closeOnOutsideClickHandler)
  }

  _addListeners() {
    window.addEventListener('blur', this._unmount.bind(this))
    window.addEventListener('keyup', this._escapeHandler.bind(this))
    this._cover.addEventListener('mousedown', this._drawSelectionRectangle.bind(this))
    this._cover.addEventListener('mousemove', this._updateSelectionRectangle.bind(this))
    this._cover.addEventListener('mouseup', this._removeSelectionRectangle.bind(this))
  }

  _updateGuidePosition(e) {
    this._guides.style.top = e.clientY + 'px'
    this._guides.style.left = e.clientX + 'px'
  }

  _addGuides() {
    document.body.appendChild(this._guides)
    document.addEventListener('mousemove', this._updateGuidePosition.bind(this), false)

  }

  _removeGuides() {
    this._guides.remove()
    document.removeEventListener('mousemove', this._updateGuidePosition)
  }

  _escapeHandler(e) {
    if (e.keyCode === 27) {
        this._unmount()
    }
  }


  _drawSelectionRectangle(e) {
    this._selectionInProgress = true
    this._x1 = e.clientX
    this._y1 = e.clientY
    const browserWidth = document.documentElement.clientWidth
    const browserHeight = document.documentElement.clientHeight
    const bTop = e.clientY
    const bRight = browserWidth - e.clientX
    const bBottom = browserHeight - e.clientY
    const bLeft = e.clientX

    this._selection.style.borderWidth = `${bTop}px ${bRight}px ${bBottom}px ${bLeft}px`
    this._cover.style.background = 'transparent'
    this._selection.style.visibility = 'visible'
  }

  _updateSelectionRectangle(e) {

    if (this._selectionInProgress) {
      this._updateRectangle(e.clientX, e.clientY)
    }
  }

  _updateRectangle(x, y) {
    const browserWidth = document.documentElement.clientWidth
    const browserHeight = document.documentElement.clientHeight
    const bTop = Math.min(this._y1, y)
    const bRight = x < this._x1 ? browserWidth - this._x1 : browserWidth - x
    const bBottom = y < this._y1 ? browserHeight - this._y1 : browserHeight - y
    const bLeft = Math.min(this._x1, x)
    this._selection.style.borderWidth = `${bTop}px ${bRight}px ${bBottom}px ${bLeft}px`
  }

  _removeSelectionRectangle(e) {
    this._removeGuides()
    const that = this
    const y = e.clientY
    const x = e.clientX
    const browserWidth = document.documentElement.clientWidth
    const browserHeight = document.documentElement.clientHeight
    const bTop = Math.min(this._y1, y)
    const bRight = x < this._x1 ? browserWidth - this._x1 : browserWidth - x
    const bBottom = y < this._y1 ? browserHeight - this._y1 : browserHeight - y
    const bLeft = Math.min(this._x1, x)
    const width = browserWidth - bRight - bLeft
    const height = browserHeight - bBottom - bTop
    const top = this._y1
    const left = this._x1
    if (width >= 3 && height >= 3) {
        chromep.runtime.sendMessage({  
          type: 'PARTIAL_SCREENSHOT_TAKEN',
          left: left + 1,
          top: top + 1,
          width: width - 2,
          height: height - 2,
          devicePixelRatio: window.devicePixelRatio,
          title: document.title
        })
        .then(response => {
          console.log('response', response)
          that._resolve(response)
          this._unmount()
        })
       
        this._unmount()
        console.log('sendit')
    } else {
        that._reject('toosmall')
        this._unmount()
    }
  }

  _unmount() {
    console.log('unmount called')
    this._removeGuides()
    window.removeEventListener('blur', this._unmount)
    window.removeEventListener('keyup', this._escapeHandler)
    document.addEventListener('click', closeOnOutsideClickHandler)
    this._cover.remove()
    this._selection.remove()

  }

}
