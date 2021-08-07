import { action, persist, thunk } from 'easy-peasy';
import firebase from '../_services/firebase';
import QuizApi from './../_services/quizApi';

const quizApi = new QuizApi();
const parseQuestionId = (id) => +id.slice(1);

export const categoryModel = {
	category: {
		categories: [],
		quiz: null,
		quizResult: null,
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
			const uselessIds = [10, 13, 16, 25, 26, 29, 30]; // by trial
			const { trivia_categories: categories } = await quizApi.fetchCategories();
			const filteredCategories = categories?.length ? categories.filter((c) => !uselessIds.includes(c.id)) : [];
			await firebase.database().ref('category').remove();
			await firebase.database().ref('category').push(filteredCategories);
			actions.replaceCategory(filteredCategories);
		}),

		setQuiz: action((state, quiz) => {
			state.quiz = quiz;
		}),
		setQuizResult: action((state, quiz) => {
			state.quizResult = quiz;
		}),
		createQuiz: thunk(async (actions, { category, metadata }) => {
			const { user } = metadata;
			const quiz = await quizApi.createQuiz({
				category: category.id,
			});
			const mappedQuiz = quiz.map((q) => ({ ...q, userAnswer: 0 }));
			await firebase.database().ref(`user/${user.uid}/quiz`).set(mappedQuiz);
			actions.setQuiz(mappedQuiz);
		}),
		findActiveQuiz: thunk(async (actions, { metadata, navigation }) => {
			const { user } = metadata;
			const quiz = await firebase.database().ref(`user/${user.uid}/quiz`).get();
			if (quiz.exists()) {
				actions.setQuiz(quiz.val());
				navigation.navigate('Play');
			}
		}),
		removeActiveQuiz: thunk(async (actions, { metadata, navigation = null }) => {
			const { user } = metadata;
			await firebase.database().ref(`user/${user.uid}/quiz`).remove();
			actions.setQuiz(null);
			navigation && navigation.navigate('Pick a category');
		}),
		onAnsweredQuestion: thunk(async (actions, { metadata, navigation, userAnswer, id, CurrentScore, isCorrect = false }) => {
			const { user } = metadata;
			const index = parseQuestionId(id);
			const question = await firebase.database().ref(`user/${user.uid}/quiz/${index}`).get();

			await firebase
				.database()
				.ref(`user/${user.uid}/quiz/${index}`)
				.set({ ...question.val(), userAnswer, CurrentScore: isCorrect ? CurrentScore : 0 });

			const quiz = await firebase.database().ref(`user/${user.uid}/quiz`).get();
			if (quiz.exists()) {
				actions.setQuiz(quiz.val());
				if (index + 1 != quiz.val()?.length) {
					setTimeout(() => {
						navigation.navigate(`q${index + 1}`);
					}, 1000);
				} else {
					const quizResult = {
						quiz: quiz.val(),
						totalScore: quiz
							.val()
							.map((q) => q.CurrentScore)
							.reduce((curr, next) => curr + next, 0),
					};
					await firebase.database().ref(`user/${user.uid}/completedQuizes`).push(quizResult);
					actions.removeActiveQuiz({ metadata });
					actions.setQuizResult(quizResult);
					// navigation.navigate('Quiz Result');
				}
			}
		}),
	},
};
