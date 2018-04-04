import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store, wrapStore } from "react-chrome-redux";

import App from "./components/app/App";
import { parseSite } from "./scrape";
import { actionTypes } from "../../../event/src/actions/app";
import { messageTypes } from "../../../event/src/messageTypes";
import ChromePromise from "chrome-promise";
const chromep = new ChromePromise();
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { getTabDetails } from "./actions/app";
let store;

const initStore = () => {
	let middleware = [thunkMiddleware];

	//add any dev debug tools here
	if (process.env.NODE_ENV !== "production") {
		const logger = createLogger({
			level: "info",
			collapsed: false,
			diff: true
		});
		middleware = [...middleware, logger];
	}

	store = createStore(rootReducer, applyMiddleware(...middleware));
	console.log("MAKINGSTORE");
	getCurrentTabId()
		.then(id => {
			store.dispatch(getTabDetails(id));
		})
		.catch(e => console.log(e));

	wrapStore(store, {
		portName: "splash"
	});
};

const splashBox = document.createElement("div");

const init = () => {
	initStore();
	addExtensionContainer();
	initEventListeners();
	addReactApp();
};

// const pineappleIframe = document.createElement('iframe')

// const addExtensionContainer = () => {
// 	document.body.appendChild(pineappleIframe)
// 	const iframeDoc = pineappleIframe.contentDocument
// 	splashBox.id = 'splashBox'
// 	splashBox.style = "position: fixed; width: 375px; background: white; z-index: 2147483647; top: 15px; right: 15px;border-radius: 3px; box-shadow: rgba(37, 53, 70, 0.4) 0px 6px 55px -16px;"
// 	iframeDoc.body.appendChild(splashBox)

// 	// document.body.appendChild(splashBox)
// }

// const addReactApp = () => {
// 	render(
// 	  <Provider store={store}>
// 	    <App/>
// 	  </Provider>
// 	, splashBox)
// }

const addExtensionContainer = () => {
	splashBox.id = "splashBox";
	splashBox.style =
		"position: fixed; width: 375px; background: white; z-index: 2147483647; top: 15px; right: 15px;border-radius: 3px; box-shadow: rgba(37, 53, 70, 0.4) 0px 6px 55px -16px;";
	document.body.appendChild(splashBox);
};

const addReactApp = () => {
	render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById("splashBox")
	);
};

const getCurrentTabId = () => {
	return chromep.runtime.sendMessage({
		type: messageTypes.GET_CURRENT_TAB_ID
	});
};

const initEventListeners = () => {
	addOutsideClickListener();
	addMessageListeners();
};

export const closeOnOutsideClickHandler = event => {
	const isClickInside = splashBox.contains(event.target);

	if (!isClickInside) {
		splashBox.parentNode.removeChild(splashBox);
		removeExtensionFromOpenExtensions()
			.then(r => console.log("successfullyRemovedfromarray"))
			.catch(e => console.log(e));
		removeOutsideClickListener();
	}

	return;
};

const addOutsideClickListener = () => {
	//hide extension when outside of page is clicked
	document.addEventListener("click", closeOnOutsideClickHandler);
};

const removeOutsideClickListener = () => {
	console.log("removeOutsideClickListener");
	document.removeEventListener("click", closeOnOutsideClickHandler);
};

const addMessageListeners = () => {
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		console.log("incoming message", request, sender, sendResponse);
		switch (request.type) {
			case messageTypes.GET_LOCAL_SITE_DATA:
				let siteData = {};
				try {
					siteData = parseSite(sender);
				} catch (e) {
					console.log("gotya", e);
				} finally {
					sendResponse(siteData);
				}
				return;
			case messageTypes.CLOSE_EXTENSION_IN_TAB:
				try {
					splashBox.parentNode.removeChild(splashBox);
					//remove click handler
					removeOutsideClickListener();
				} catch (e) {
					console.log("try catch", e);
				} finally {
					sendResponse({ closedSuccessfully: true });
				}

				return;
			case messageTypes.REOPEN_EXTENSION_IN_TAB:
				try {
					addExtensionContainer();
					addOutsideClickListener();
				} catch (e) {
					console.log("opening did not work", e);
				} finally {
					sendResponse({ reopenedSuccessfully: true });
				}
				return;
			// case 'FILE':
			// 	console.log('save', request, sender)
			// 	const file = document.createElement('img')
			// 	file.src = request.content
			// 	splashBox.appendChild(file)
			// 	store.dispatch({type: 'ADD_PREVIEW_IMAGE', src: request.content})
			default:
				return;
		}
	});
};

const removeExtensionFromOpenExtensions = () => {
	return chromep.runtime.sendMessage({
		type: messageTypes.EXTENSION_WAS_CLOSED_BY_OUTSIDE_CLICK
	});
};

//start app
init();