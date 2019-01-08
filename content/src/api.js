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
var hexaSplash = firebase.initializeApp(config, "splashExtension");

var db = hexaSplash.firestore()

export const watchTransaction = (transactionId, property, callback) => {
	db.collection("cards").doc(transactionId).onSnapshot((snapshot) => {
		const transactionDoc = snapshot.data()
		if (transactionDoc[property]) {
			callback(transactionDoc[property])
		}
	}, (error) => {
		console.error(error)
	})
}