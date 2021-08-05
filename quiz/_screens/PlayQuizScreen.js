import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStoreState } from 'easy-peasy';
import React from 'react';
import { View } from 'react-native';
import Categories from '../_components/Categories';
import Loader from '../_components/Loader';
import QuizQuestion from './../_components/QuizQuestion';

const Stack = createNativeStackNavigator();

export default function PlayQuizScreen(props) {
	const { categories, quiz } = useStoreState((state) => state.categoryModel.category);
	console.log(quiz);
	if (!quiz) {
		return <Loader></Loader>;
	}
	return (
		<>
			<View style={{ flex: 1 }}>
				<Stack.Navigator>
					{quiz.map((q, i) => (
						<Stack.Screen key={i} style={{ flex: 1 }} name={`q${i}`} component={QuizQuestion} initialParams={{ ...q, id: `q${i}` }} />
					))}
				</Stack.Navigator>
			</View>
		</>
	);
}
