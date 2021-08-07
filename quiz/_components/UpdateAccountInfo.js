import { Formik } from 'formik';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Snackbar, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import { tailwind } from '../_lib/tailwind';
import Loader from './Loader';
import firebase from './../_services/firebase';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function UpdateAccountInfo(props) {
	const { hideModal } = props;
	const [error, setError] = useState(null);
	const storeUser = useStoreActions((actions) => actions.authModel.user.storeUser);
	const { metadata: userStoreData } = useStoreState((state) => state.authModel.user);
	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);
	const [isLoading, setIsLoading] = useState(false);
	const [visible, setVisible] = useState(false);

	const Schema = Yup.object().shape({
		displayName: Yup.string().required('Required'),
	});
	const handleSubmition = async ({ displayName }) => {
		try {
			setIsLoading(true);
			await firebase.auth().currentUser.updateProfile({ displayName, photoURL: null });
			await firebase.database().ref(`user/${userStoreData.user.uid}`).child('displayName').set(displayName);
			setIsLoading(false);
			storeUser({ ...userStoreData, displayName });
			hideModal();
		} catch (error) {
			const errorMessage = error.message;
			setError(errorMessage);
			onToggleSnackBar();
			setIsLoading(false);
		}
	};
	return (
		<View style={tailwind('p-1')}>
			<Card>
				<Card.Title title={'Edit personal info'} />
				<Card.Content>
					<View style={tailwind('flex justify-center p-4')}>
						<Formik initialValues={{ displayName: '' }} validationSchema={Schema} onSubmit={(values) => handleSubmition(values)}>
							{({ handleChange, handleBlur, errors, setFieldValue, touched, handleSubmit, values }) => (
								<>
									<View style={tailwind('flex justify-center py-2')}>
										<TextInput label="Fullname" error={errors.displayName && touched.displayName} autoCapitalize="none" onChangeText={handleChange('displayName')} onBlur={handleBlur('displayName')} value={values.displayName} />
										{errors.displayName && touched.displayName ? (
											<View>
												<Text style={tailwind('flex text-red-500 py-1')}>{errors.displayName}</Text>
											</View>
										) : (
											<></>
										)}
									</View>
									<View style={tailwind('flex flex-col w-full')}>
										<View style={tailwind('w-full')}>
											<Button uppercase={false} icon="content-save-edit" mode="contained" onPress={(e) => handleSubmit(e)}>
												Save
											</Button>
										</View>
									</View>
								</>
							)}
						</Formik>
					</View>
				</Card.Content>
			</Card>
			<Snackbar visible={visible} onDismiss={onDismissSnackBar}>
				{error}
			</Snackbar>
			<Loader isLoading={isLoading}></Loader>
		</View>
	);
}
