import firebaseApp from './firebase'

var db = firebaseApp.firestore()

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
