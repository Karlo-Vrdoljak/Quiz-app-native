import { useStoreRehydrated, useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button, Card, Modal, Portal } from 'react-native-paper';
import { tailwind } from '../_lib/tailwind';
import { toDate } from './../_services/firebase';
import ProfileQuizes from './ProfileQuizes';
import UpdateAccountInfo from './UpdateAccountInfo';
import firebase from '../_services/firebase';

export default function Profile() {
	const [visible, setVisible] = React.useState(false);
	const { metadata } = useStoreState((state) => state.authModel.user);
	const { user } = metadata;

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;
	const ContentRow = ({ icon, text }) => (
		<View style={tailwind('flex flex-row py-2 items-center')}>
			<Avatar.Icon size={24} icon={icon} />
			<Text style={tailwind('px-4 text-base')}>{text || '-'}</Text>
		</View>
	);
	const isRehydrated = useStoreRehydrated();

	const [Quizes, setQuizes] = useState([]);
	useEffect(() => {
		firebase
			.database()
			.ref(`user/${user.uid}/completedQuizes`)
			.on('value', (quizes) => {
				// const { user } = metadata;
				// const quizes = await firebase.database().ref(`user/${user.uid}/completedQuizes`).get();
				const quizesMap = [];
				quizes.forEach((q) => {
					const value = q.val();
					const [first] = value.quiz;
					quizesMap.push({ ...value, category: first.category });
				});
				quizesMap.reverse(); // desc order
				setQuizes(quizesMap);
			});
		return () => {
			firebase.database().ref(`user/${user.uid}/completedQuizes`).off();
		};
	}, []);

	// if (!user) {
	// 	return <SplashScreen></SplashScreen>;
	// }
	return (
		<>
			<View style={tailwind('flex-1 p-2')}>
				<View style={tailwind('flex-1')}>
					<Card style={tailwind('flex-1')}>
						{/* <Card.Cover source={{ uri: user.photoURL || Asset.fromModule(require('../assets/profile_bg.jpg')).uri }} /> */}
						<Card.Title title={user.displayName || user.email} subtitle={user?.createdAt ? `Joined at ${toDate(user.createdAt).toLocaleDateString('hr')}` : ''} />
						<Card.Content style={tailwind('flex-1')}>
							<View style={tailwind('px-3')}>
								<ContentRow icon="email" text={user.email}></ContentRow>
								<ContentRow icon="pound" text={`Played ${Quizes.length} in total`}></ContentRow>
								<ContentRow icon="counter" text={`Scored ${Quizes.map((q) => q.totalScore).reduce((acc, q) => acc + q, 0)} in total`}></ContentRow>
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
				</View>
				<View style={tailwind('flex-1 py-2')}>
					<ProfileQuizes Quizes={Quizes}></ProfileQuizes>
				</View>
			</View>

			<Portal>
				<Modal visible={visible} onDismiss={hideModal}>
					<UpdateAccountInfo hideModal={hideModal} user={user}></UpdateAccountInfo>
				</Modal>
			</Portal>
		</>
	);
}
