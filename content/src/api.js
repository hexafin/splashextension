import firebase from "./firebase"
let firestore = firebase.firestore()

export const watchTransaction = (transactionId, property, callback) => {
	firestore.collection("transactions").doc(transactionId).onSnapshot((snapshot) => {
		const transactionDoc = snapshot.data()
		if (transactionDoc[property]) {
			callback(transactionDoc[property])
		}
	}, (error) => {
		console.error(error)
	})
}
