import { useStoreRehydrated } from 'easy-peasy';
import { Asset } from 'expo-asset';
import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button, Card, Modal, Portal, Provider, Title } from 'react-native-paper';
import { tailwind } from '../_lib/tailwind';
import SplashScreen from '../_screens/SplashScreen';
import { toDate } from './../_services/firebase';
import UpdateAccountInfo from './UpdateAccountInfo';

export default function Profile(props) {
	const [visible, setVisible] = React.useState(false);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const { user } = props;
	const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;
	const ContentRow = ({ icon, text }) => (
		<View style={tailwind('flex flex-row items-center')}>
			<Avatar.Icon size={18} icon={icon} />
			<Text style={tailwind('px-4 text-sm')}>{text || '-'}</Text>
		</View>
	);
	const isRehydrated = useStoreRehydrated();

	if (!isRehydrated || !user) {
		return <SplashScreen></SplashScreen>;
	}
	return (
		<View style={tailwind('px-2')}>
			<Card>
				<Card.Cover source={{ uri: user.photoURL || Asset.fromModule(require('../assets/profile_bg.jpg')).uri }} />
				<Card.Title title={user.displayName || user.email} subtitle={user?.createdAt ? `Joined at ${toDate(user.createdAt).toLocaleDateString('hr')}` : ''} />
				<Card.Content>
					<View style={tailwind('px-3')}>
						<ContentRow icon="email" text={user.email}></ContentRow>
						<ContentRow icon="account" text={user.displayName}></ContentRow>
						{/* <ContentRow icon="phone" text={user.phoneNumber}></ContentRow> */}
					</View>
				</Card.Content>
				<Card.Actions>
					<View style={tailwind('flex flex-col w-full')}>
						<View style={tailwind('w-full')}>
							<Button uppercase={false} icon="pencil" mode="contained" onPress={showModal}>
								Update info
							</Button>
						</View>
					</View>
				</Card.Actions>
			</Card>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal}>
					<UpdateAccountInfo hideModal={hideModal} user={user}></UpdateAccountInfo>
				</Modal>
			</Portal>
		</View>
	);
}
