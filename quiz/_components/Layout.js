import React from 'react';
import { tailwind } from '../_lib/tailwind';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function Layout(props) {
	const { children, title, subtitle } = props;
	const navigation = useNavigation();
	const { metadata } = useStoreState((state) => state.authModel.user);
	const removeUser = useStoreActions((actions) => actions.authModel.user.removeUser);
	return (
		<View style={tailwind('flex-1 w-full h-full')}>
			<Appbar.Header>
				{navigation.canGoBack() && <Appbar.BackAction onPress={() => navigation.goBack()} />}
				<Appbar.Content title={title} subtitle={subtitle} />
				{metadata && <Appbar.Action icon="logout" onPress={() => removeUser({})} />}
			</Appbar.Header>
			<View style={tailwind('flex-1 justify-center py-2')}>{children}</View>
		</View>
	);
}
