import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import Categories from '../_components/Categories';
import Layout from './../_components/Layout';
import PlayQuizScreen from './PlayQuizScreen';

const Stack = createNativeStackNavigator();

export default function CategoriesScreen(props) {
	// const { metadata } = useStoreState((state) => state.authModel.user);
	// const removeActiveQuiz = useStoreActions((actions) => actions.categoryModel.category.removeActiveQuiz);
	// const { quiz } = useStoreState((state) => state.categoryModel.category);
	// if (quiz) {
	// 	removeActiveQuiz({ metadata });
	// }
	return (
		<>
			<Layout title={props.route.name} subtitle={`Pick a category and play! 🎮`}>
				<View style={{ flex: 1 }}>
					<Stack.Navigator>
						<Stack.Screen options={{ headerShown: false, contentStyle: { flex: 1 } }} name="Pick a category" component={Categories} />
						<Stack.Screen options={{ headerShown: false, contentStyle: { flex: 1 } }} name="Play" component={PlayQuizScreen} />
					</Stack.Navigator>
				</View>
			</Layout>
		</>
	);
}
