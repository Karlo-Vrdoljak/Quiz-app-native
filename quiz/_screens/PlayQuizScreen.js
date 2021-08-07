import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Loader from '../_components/Loader';
import QuizResult from '../_components/QuizResult';
import { tailwind } from '../_lib/tailwind';
import QuizQuestion from './../_components/QuizQuestion';

const Stack = createNativeStackNavigator();

export default function PlayQuizScreen(props) {
	const { categories, quiz, quizResult } = useStoreState((state) => state.categoryModel.category);
	const removeActiveQuiz = useStoreActions((actions) => actions.categoryModel.category.removeActiveQuiz);
	const { metadata } = useStoreState((state) => state.authModel.user);

	if (quizResult) {
		return <QuizResult></QuizResult>;
	} else if (!quiz) {
		return <Loader></Loader>;
	}
	return (
		<>
			<View style={{ flex: 1 }}>
				{quiz?.length ? (
					<Stack.Navigator>
						{quiz.map((q, i) => (
							<Stack.Screen options={{ headerShown: false, contentStyle: { flex: 1 } }} key={i} name={`q${i}`} component={QuizQuestion} initialParams={{ ...q, id: `q${i}` }} />
						))}
					</Stack.Navigator>
				) : (
					<>
						<View style={tailwind('flex-1 p-8')}>
							<Text style={tailwind('flex-1 text-lg text-center')}>Seems like we have no quiz available at the moment, try again later.</Text>
							<Button mode="contained" onPress={() => removeActiveQuiz({ metadata, navigation: props.navigation })}>
								Take me back to categories
							</Button>
						</View>
					</>
				)}
			</View>
		</>
	);
}
