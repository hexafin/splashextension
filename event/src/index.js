import { createStore, applyMiddleware } from "redux"
import rootReducer from "./reducers"
import { createLogger } from "redux-logger"
import { wrapStore, alias } from "react-chrome-redux"
import thunkMiddleware from "redux-thunk"
import aliases from "./aliases"
import ChromePromise from "chrome-promise"
import { messageTypes } from "./messageTypes"
const chromep = new ChromePromise()

// import perflogger from 'redux-perf-middleware'
// const freeze = require('redux-freeze')
// import difflogger from 'redux-log-diff';
// import { composeWithDevTools } from 'redux-devtools-extension';

// object of open extensions by tabId.
// e.g. {125: true, 255: false}
//if false, it is currently hidden (i.e. collapsed)
//if true, it is visible
//if not in the object, it is not mounted yet
let visibleExtensions = {}

const initBackgroundScript = () => {
  addListeners()
  initStore()
}

const addListeners = () => {
  addExtensionButtonListener()
  addMessageListeners()
  addCloseTabListener()
  addRefreshListener()
}
const addRefreshListener = () => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    delete visibleExtensions[tabId]
  })
}

const addCloseTabListener = () => {
  chrome.tabs.onRemoved.addListener(tabId => {
    delete visibleExtensions[tabId]
    console.log("tab removed", tabId)
  })
}

const addExtensionButtonListener = () => {
  chrome.browserAction.onClicked.addListener(function() {
    getCurrentTabId().then(tabId => {
      console.log("before", tabId, visibleExtensions)
      //if current extension in tab is open already => close
      if (visibleExtensions[tabId]) {
        closeExtensionInTab(tabId)
          .then(response => {
            if (response.closedSuccessfully) {
              visibleExtensions[tabId] = false
              console.log("visibleExtensions", visibleExtensions)
            } else {
              console.log("closing failed", response)
            }
          })
          .catch(e => console.log(e))
      } else if (visibleExtensions[tabId] == false) {
        //add currentTab to visibleExtensions
        visibleExtensions[tabId] = true
        //reopen closed (i.e. htabIdden), but mounted extension
        reopenExtensionInTab(tabId)
          .then(response => {
            if (response.reopenedSuccessfully) {
              visibleExtensions[tabId] = true
            } else {
              console.log("opening failed", response)
            }
          })
          .catch(e => console.log(e))

        console.log("added current tab to open extensions", visibleExtensions)
      } else {
        //add contentscript and open extension in the new tab

        // sendFile()

        chrome.tabs.executeScript({
          file: "./content.js"
        })

        visibleExtensions[tabId] = true
        console.log("after", tabId, visibleExtensions)
      }
    })
  })
}

const addMessageListeners = () => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
      case messageTypes.EXTENSION_WAS_CLOSED_BY_OUTSIDE_CLICK:
        const tabId = sender.tab.id
        visibleExtensions[tabId] = false
        console.log("id", tabId, visibleExtensions)
        sendResponse({ removedTabIdFromArray: true })
        return
      case "GET_CURRENT_TAB_ID":
        sendResponse({ tabId: sender.tab.id })
        return
      case "PARTIAL_SCREENSHOT_TAKEN":
        takeScreenshot(request).then(imgUrl => {
          sendResponse({ imgUrl: imgUrl })
        })
        return true

      // cb.util.storeDataUrl(dataUrl, sender.url, 'clip', function() {
      //     cb.background.startBadgeBlink()
      //     callback()
      // })

      default:
        return
    }
  })
}

/**
 * @return cropped dataurl (image)
 *
 */
const takeScreenshot = request => {
  return chromep.tabs
    .captureVisibleTab(null, { format: "png", quality: 100 })
    .then(dataUrl => {
      return new Promise((resolve, reject) => {
        console.log("ayyoo", request)
        let left = request.left * request.devicePixelRatio
        let top = request.top * request.devicePixelRatio
        let width = request.width * request.devicePixelRatio
        let height = request.height * request.devicePixelRatio

        let canvas = document.createElement("canvas")
        let ctx = canvas.getContext("2d")
        let img = new Image()
        console.log(width, height)
        img.onload = () => {
          canvas.width = width || img.width
          canvas.height = height || img.height
          if (width && height) {
            ctx.drawImage(img, left, top, width, height, 0, 0, width, height)
          } else {
            ctx.drawImage(img, 0, 0)
          }
          resolve(canvas.toDataURL())
        }
        img.onerror = e => reject(e)
        img.src = dataUrl
      })
    })
}

const initStore = () => {
  let middleware = [alias(aliases), thunkMiddleware]

  //add any dev debug tools here
  if (process.env.NODE_ENV !== "production") {
    const logger = createLogger({ level: "info", collapsed: false, diff: true })
    middleware = [...middleware, logger]
  }

  const store = createStore(rootReducer, applyMiddleware(...middleware))

  wrapStore(store, {
    portName: "pineapple"
  })
}

/*
* @return number tabId (e.g. 152)
*/
const getCurrentTabId = () => {
  return chromep.tabs
    .query({ currentWindow: true, active: true })
    .then(tab => tab[0].id)
    .catch(e => console.log(e))
}

/*
* @return void
* @param number tabId
*/
const closeExtensionInTab = tabId => {
  console.log("send closing message", tabId)
  const message = { type: messageTypes.CLOSE_EXTENSION_IN_TAB }
  return chromep.tabs.sendMessage(tabId, message, {})
}

/*
* @return void
* @param number tabId
*/
const reopenExtensionInTab = tabId => {
  console.log("send opening message", tabId)
  const message = { type: messageTypes.REOPEN_EXTENSION_IN_TAB }
  return chromep.tabs.sendMessage(tabId, message, {})
}

/*
* @return new array of active Tab Ids
*/
const removeTabIdFromArray = (tabId, visibleExtensions) => {
  return visibleExtensions.filter(id => id != tabId)
}

initBackgroundScript()
