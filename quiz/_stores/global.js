import { action } from 'easy-peasy';

export const globalModel = {
	spinner: {
		isLoading: true,
		start: action((state, _ = null) => {
			state.isLoading = true;
		}),
		stop: action((state, _ = null) => {
			state.isLoading = false;
		}),
		// signInWithEmailAndPassword: thunk(async (actions, payload) => {
		// 	const creds = await firebase.auth().signInWithEmailAndPassword('1karlo.vrdoljak@gmail.com', 'asdfasdf');
		// 	actions.storeUser(creds);
		// }),
	},
};
