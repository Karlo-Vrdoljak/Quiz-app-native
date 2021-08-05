import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import Categories from '../_components/Categories';
import Layout from './../_components/Layout';

const Stack = createNativeStackNavigator();

export default function CategoriesScreen(props) {
	return (
		<>
			<Layout title={props.route.name} subtitle={`Pick a category and play! 🎮`}>
				<View style={{ flex: 1 }}>
					<Stack.Navigator>
						<Stack.Screen options={{ headerShown: false, contentStyle: { flex: 1 } }} name="Pick a category" component={Categories} />
						<Stack.Screen style={{ flex: 1 }} name="Play" component={Layout} />
					</Stack.Navigator>
				</View>
			</Layout>
		</>
	);
}
