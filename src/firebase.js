// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyA0GSDJtUMFLzX8QCyIPUzduDa0c4Nyrms",
	authDomain: "discord-react-d789f.firebaseapp.com",
	databaseURL: "https://discord-react-d789f.firebaseio.com",
	projectId: "discord-react-d789f",
	storageBucket: "discord-react-d789f.appspot.com",
	messagingSenderId: "696485518326",
	appId: "1:696485518326:web:f2700288648fb6fc2045d7",
	measurementId: "G-1P908RVX3L",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
