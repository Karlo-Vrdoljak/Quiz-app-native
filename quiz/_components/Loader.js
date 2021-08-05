import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { tailwind } from '../_lib/tailwind';
import { Dimensions } from 'react-native';

export default function Loader({ isLoading }) {
	if (isLoading) {
		return (
			<View style={tailwind('absolute flex items-center w-full h-full bg-indigo-900 bg-opacity-10')}>
				<View style={{ position: 'absolute', left: Dimensions.get('window').width / 2 - 17, top: Dimensions.get('window').height / 2 - 17 }}>
					<ActivityIndicator size="large"></ActivityIndicator>
				</View>
			</View>
		);
	}
	return <></>;
}
