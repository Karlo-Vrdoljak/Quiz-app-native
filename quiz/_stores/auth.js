import { action, createStore, persist, thunk } from 'easy-peasy';
import firebase from '../_services/firebase';

export const authModel = persist(
	{
		user: {
			metadata: null,
			storeUser: action((state, data) => {
				state.metadata = data;
			}),
			removeUser: action((state, _) => {
				state.metadata = null;
			}),
			signInWithEmailAndPassword: thunk(async (actions, payload) => {
				const creds = await firebase.auth().signInWithEmailAndPassword('1karlo.vrdoljak@gmail.com', 'asdfasdf');
				actions.storeUser(creds);
			}),
		},
	},
	{ storage: 'localStorage' }
);
