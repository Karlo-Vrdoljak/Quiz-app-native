import { action, persist, thunk } from 'easy-peasy';
import firebase from '../_services/firebase';
import QuizApi from './../_services/quizApi';

const quizApi = new QuizApi();

export const categoryModel = {
	category: {
		categories: [],
		quiz: null,
		addCategory: action((state, cat) => {
			state.categories.push(cat);
		}),
		replaceCategory: action((state, cat) => {
			state.categories = [...cat];
		}),
		removeCategory: action((state, cat) => {
			state.categories = state.categories.filter((c) => c != cat);
		}),
		dbAddCategory: thunk(async (actions, _ = null) => {
			const { trivia_categories: categories } = await quizApi.fetchCategories();
			await firebase.database().ref('category').remove();
			await firebase.database().ref('category').push(categories);
			actions.replaceCategory(categories);
		}),

		setQuiz: action((state, quiz) => {
			state.quiz = quiz;
		}),
		createQuiz: thunk(async (actions, selectedCat) => {
			const quiz = await quizApi.createQuiz({
				category: selectedCat.id,
			});
			console.log(selectedCat, quiz);
			actions.setQuiz(quiz);
		}),
	},
};
