import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDNZcTfmSwLOjoxvlzSDDE-puIzLutS5Rw",
	authDomain: "whatsapp-clone-29ba2.firebaseapp.com",
	projectId: "whatsapp-clone-29ba2",
	storageBucket: "whatsapp-clone-29ba2.appspot.com",
	messagingSenderId: "958194556813",
	appId: "1:958194556813:web:08a5a2ad688908cebd27c4",
	measurementId: "G-98LV8J6GH2",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;