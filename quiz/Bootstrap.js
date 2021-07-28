import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStoreRehydrated, useStoreState } from 'easy-peasy';
import React from 'react';
import { getColor } from './_lib/tailwind';
import CategoriesScreen from './_screens/CategoriesScreen';
import HomeScreen from './_screens/HomeScreen';
import LeaderBoardScreen from './_screens/LeaderBoardScreen';
import LoginScreen from './_screens/LoginScreen';
import SplashScreen from './_screens/SplashScreen';

const Tab = createBottomTabNavigator();

export default function Bootstrap() {
	const isRehydrated = useStoreRehydrated();
	const user = useStoreState((state) => state.authModel.user);
	console.log(user);
	console.log(isRehydrated);
	if (!isRehydrated) {
		return <SplashScreen></SplashScreen>;
	}

	return (
		<>
				<Tab.Navigator>
					{user.userMeta ? (
						<>
							<Tab.Screen
								name="Home"
								component={HomeScreen}
								options={{
									tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'md-home' : 'md-home-outline'} size={20} color={getColor('indigo-600')} />,
								}}
							/>
							<Tab.Screen
								name="Categories"
								component={CategoriesScreen}
								options={{
									tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'md-book' : 'md-book-outline'} size={20} color={getColor('indigo-600')} />,
								}}
							/>
							<Tab.Screen
								name="Leaderboard"
								component={LeaderBoardScreen}
								options={{
									tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'md-star' : 'md-star-outline'} size={20} color={getColor('indigo-600')} />,
								}}
							/>
						</>
					) : (
						<>
							<Tab.Screen
								name="Sign in"
								component={LoginScreen}
								options={{
									tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'md-log-in' : 'md-log-in-outline'} size={20} color={getColor('indigo-600')} />,
								}}
							/>
						</>
					)}
				</Tab.Navigator>
		</>
	);
}
