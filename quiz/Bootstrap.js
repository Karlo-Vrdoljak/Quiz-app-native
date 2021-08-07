import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import Loader from './_components/Loader';
import { getColor } from './_lib/tailwind';
import CategoriesScreen from './_screens/CategoriesScreen';
import HomeScreen from './_screens/HomeScreen';
import LeaderBoardScreen from './_screens/LeaderBoardScreen';
import LoginScreen from './_screens/LoginScreen';
import SplashScreen from './_screens/SplashScreen';
import firebase from './_services/firebase';

const Tab = createBottomTabNavigator();

export default function Bootstrap() {
	const isRehydrated = useStoreRehydrated();
	const { metadata } = useStoreState((state) => state.authModel.user);
	const { isLoading } = useStoreState((state) => state.globalModel.spinner);
	const stopLoader = useStoreActions((action) => action.globalModel.spinner.stop);
	const storeUser = useStoreActions((action) => action.authModel.user.storeUser);
	const { quiz } = useStoreState((state) => state.categoryModel.category);

	// stopLoader();
	useEffect(() => {
		firebase.auth().onAuthStateChanged((auth) => {
			storeUser({ user: auth });
			stopLoader();
		});
	}, [isRehydrated]);

	if (!isRehydrated) {
		return <SplashScreen></SplashScreen>;
	}
	return (
		<>
			<Tab.Navigator>
				{metadata && firebase.auth().currentUser ? (
					<>
						<Tab.Screen
							name="Home"
							component={HomeScreen}
							options={{
								tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'md-home' : 'md-home-outline'} size={20} color={getColor('indigo-600')} />,
							}}
						/>
						<Tab.Screen
							name="Quiz"
							component={CategoriesScreen}
							options={{
								tabBarVisible: false,
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

			<Loader isLoading={isLoading}></Loader>
		</>
	);
}
