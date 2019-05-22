var firebase = require("firebase")
require("firebase/firestore")

var config = {
	apiKey: "AIzaSyAAwutvYiKoglT_t8AarDMH6hJYLduDsUs",
	authDomain: "hexa-splash.firebaseapp.com",
	databaseURL: "https://hexa-splash.firebaseio.com",
	projectId: "hexa-splash",
	storageBucket: "hexa-splash.appspot.com",
	messagingSenderId: "620766359263"
};

firebase.initializeApp(config);
export const auth = firebase.auth()
export default firebase