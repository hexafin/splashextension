import ChromePromise from 'chrome-promise'
import { messageTypes } from './messageTypes'
const chromep = new ChromePromise()
import firebase, { auth } from '../../content/src/firebase.js'

// object of open extensions by tabId.
// e.g. {125: true, 255: false}
//if false, it is currently hidden (i.e. collapsed)
//if true, it is visible
//if not in the object, it is not mounted yet
let visibleExtensions = {}

const initBackgroundScript = () => {
    addListeners()
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
        console.log('tab removed', tabId)
    })
}

const addExtensionButtonListener = () => {
    chrome.browserAction.onClicked.addListener(function() {
        getCurrentTabId().then(tabId => {
            console.log('before', tabId, visibleExtensions)
            //if current extension in tab is open already => close
            if (visibleExtensions[tabId]) {
                closeExtensionInTab(tabId)
                    .then(response => {
                        if (response.closedSuccessfully) {
                            visibleExtensions[tabId] = false
                            console.log('visibleExtensions', visibleExtensions)
                        } else {
                            console.log('closing failed', response)
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
                            console.log('opening failed', response)
                        }
                    })
                    .catch(e => console.log(e))

                console.log(
                    'added current tab to open extensions',
                    visibleExtensions
                )
            } else {
                //add contentscript and open extension in the new tab
                console.log('hey there', visibleExtensions)
                openExtensionInTab(tabId)
                    .then(response => {
                        if (response.reopenedSuccessfully) {
                            visibleExtensions[tabId] = true
                        } else {
                            console.log('opening failed', response)
                        }
                    })
                    .catch(e => console.log(e))

                // sendFile()

                // chrome.tabs.executeScript({
                //     file: "./content.js"
                // })

                visibleExtensions[tabId] = true
                console.log('after', tabId, visibleExtensions)
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
                console.log('id', tabId, visibleExtensions)
                sendResponse({ removedTabIdFromArray: true })
                return
            case 'GET_CURRENT_TAB_ID':
                sendResponse({ tabId: sender.tab.id })
                return

            case 'AUTH':
                if (request.type == "AUTH") {
                    auth.onAuthStateChanged(function(user) {
                      if (user) {
                        var uid = user.uid;
                        sendResponse({uid: uid});
                      }
                    });
                    auth.signInAnonymously().catch(function(error) {
                        console.log(error)
                    });
                }
                return true;

            default:
                return
        }
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
    console.log('send closing message', tabId)
    const message = { type: messageTypes.CLOSE_EXTENSION_IN_TAB }
    return chromep.tabs.sendMessage(tabId, message, {})
}

/*
* @return void
* @param number tabId
*/
const reopenExtensionInTab = tabId => {
    console.log('send opening message', tabId)
    const message = { type: messageTypes.REOPEN_EXTENSION_IN_TAB }
    return chromep.tabs.sendMessage(tabId, message, {})
}

/*
* @return void
* @param number tabId
*/
const openExtensionInTab = tabId => {
    console.log('send opening message', tabId)
    const message = { type: messageTypes.OPEN_EXTENSION_IN_TAB }
    return chromep.tabs.sendMessage(tabId, message, {})
}

/*
* @return new array of active Tab Ids
*/
const removeTabIdFromArray = (tabId, visibleExtensions) => {
    return visibleExtensions.filter(id => id != tabId)
}

initBackgroundScript()
