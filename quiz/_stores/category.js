import { action, persist, thunk } from 'easy-peasy';
import firebase from '../_services/firebase';
import QuizApi from './../_services/quizApi';

const quizApi = new QuizApi();

export const categoryModel = {
	category: {
		categories: [],
		addCategory: action((state, cat) => {
			state.categories.push(cat);
		}),
		replaceCategory: action((state, cat) => {
			state.categories = [...cat];
		}),
		removeCategory: action((state, cat) => {
			state.categories = state.categories.filter((c) => c != cat);
		}),
		dbAddCategory: thunk(async (actions, payload) => {
			const { trivia_categories: categories } = await quizApi.fetchCategories();
			console.log(categories);
			const testRef = firebase.database().ref('test');
			const tests = await testRef.get({});
			console.log(tests);
			actions.replaceCategory(categories);
		}),
	},
};
