import React from 'react';
import { tailwind } from '../_lib/tailwind';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function Layout(props) {
	const { children, title, subtitle } = props;
	const navigation = useNavigation();

	return (
		<View style={tailwind('flex w-full h-full')}>
			<Appbar.Header>
				{navigation.canGoBack() && <Appbar.BackAction onPress={() => navigation.goBack()} />}
				<Appbar.Content title={title} subtitle={subtitle} />
			</Appbar.Header>
			{children}
		</View>
	);
}
