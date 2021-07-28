import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { tailwind } from '../_lib/tailwind';
export default function SplashScreen() {
	return (
		<View style={tailwind('flex items-center justify-center h-full w-full')}>
			<ActivityIndicator size="large"></ActivityIndicator>
		</View>
	);
}
