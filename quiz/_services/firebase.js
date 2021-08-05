import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyBrkzDsrtTIqMyrEZdCa5dObJZvMOdw_6Y',
	authDomain: 'quizapp-b1722.firebaseapp.com',
	projectId: 'quizapp-b1722',
	storageBucket: 'quizapp-b1722.appspot.com',
	messagingSenderId: '980502816203',
	appId: '1:980502816203:web:0f5cf329fc181a4b57424e',
	measurementId: 'G-XR74MDLVPP',
	databaseURL: 'https://quizapp-b1722-default-rtdb.europe-west1.firebasedatabase.app/',
};
export default firebase.initializeApp(firebaseConfig);

export function toDate(timestamp) {
	return new Date(+timestamp);
}
