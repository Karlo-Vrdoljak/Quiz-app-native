import { action, createStore, persist, thunk } from 'easy-peasy';
import firebase from '../_services/firebase';

export const authModel = persist(
	{
		user: {
			metadata: null,
			storeUser: action((state, data) => {
				state.metadata = data;
			}),
			removeUser: action((state, _ = null) => {
				state.metadata = null;
			}),
		},
	},
	{ storage: 'localStorage' }
);
