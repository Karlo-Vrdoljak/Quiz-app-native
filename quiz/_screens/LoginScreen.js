import { useStoreActions } from 'easy-peasy';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import Layout from '../_components/Layout';
import { tailwind } from '../_lib/tailwind';
import firebase, { toDate } from '../_services/firebase';
import Loader from './../_components/Loader';
import fb from 'firebase';

export default function LoginScreen(props) {
	const [visible, setVisible] = React.useState(false);
	const [error, setError] = useState(null);
	const onToggleSnackBar = () => setVisible(!visible);
	// const userState = useStoreState((state) => state.store.authModel.user);
	const [IsLogin, setIsLogin] = React.useState(true);
	const storeUser = useStoreActions((actions) => actions.authModel.user.storeUser);
	const onDismissSnackBar = () => setVisible(false);
	const [isLoading, setIsLoading] = useState(false);
	const [FormValues, setFormValues] = useState({ email: null, password: null });
	const SignupSchema = Yup.object().shape({
		password: Yup.string().required('Required'),
		email: Yup.string().required('Required'),
	});
	const trySignIn = async ({ email, password }) => {
		try {
			setIsLoading(true);
			await firebase.auth().setPersistence(fb.auth.Auth.Persistence.LOCAL);
			const user = await firebase.auth().signInWithEmailAndPassword(email?.trim(), password);
			const snapshot = await firebase
				.database()
				.ref('user/' + user.user.uid)
				.once('value');
			if (snapshot.exists()) {
				await firebase
					.database()
					.ref('user/' + user.user.uid)
					.update(user.user.toJSON());
			} else {
				await firebase
					.database()
					.ref('user/' + user.user.uid)
					.push(user.user.toJSON());
			}
			setIsLoading(false);
			storeUser({ user: user.user });
		} catch (error) {
			console.error(error);
			const errorMessage = error.message;
			setError(errorMessage);
			onToggleSnackBar();
			setIsLoading(false);
		}
	};
	const tryRegister = async ({ email, password }) => {
		try {
			setIsLoading(true);
			const user = await firebase.auth().createUserWithEmailAndPassword(email?.trim(), password);
			await firebase
				.database()
				.ref('user/' + user.user.uid)
				.set(user.user.toJSON());
			setIsLoading(false);
			storeUser({ user: user.user });
		} catch (error) {
			const errorMessage = error.message;
			setError(errorMessage);
			onToggleSnackBar();
			setIsLoading(false);
		}
	};

	const handleSubmition = ({ email, password, isLogin }) => {
		if (isLogin) {
			return trySignIn({ email, password });
		} else {
			return tryRegister({ email, password });
		}
	};

	return (
		<>
			<Layout title={props.route.name} subtitle="Please sign in to continue.">
				<View style={tailwind('flex justify-center p-4')}>
					<Formik initialValues={{ email: '', password: '', isLogin: true }} validationSchema={SignupSchema} onSubmit={(values) => handleSubmition(values)}>
						{({ handleChange, handleBlur, errors, setFieldValue, touched, handleSubmit, values }) => (
							<>
								<View style={tailwind('flex justify-center py-2')}>
									<TextInput label="Email" error={errors.email && touched.email} autoCapitalize="none" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
									{errors.email && touched.email ? (
										<View>
											<Text style={tailwind('flex text-red-500 py-1')}>{errors.email}</Text>
										</View>
									) : (
										<></>
									)}
								</View>
								<View style={tailwind('flex justify-center py-2')}>
									<TextInput label="Password" secureTextEntry error={errors.password && touched.password} autoCapitalize="none" onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
									{errors.password && touched.password ? (
										<View>
											<Text style={tailwind('flex text-red-500 py-1')}>{errors.password}</Text>
										</View>
									) : (
										<></>
									)}
								</View>
								<View style={tailwind('flex justify-center py-2')}>
									<Button
										mode="contained"
										onPress={(e) => {
											setFieldValue('isLogin', true);
											handleSubmit(e);
										}}
									>
										Sign in
									</Button>
								</View>
								<View style={tailwind('flex justify-center py-2')}>
									<Button
										onPress={(e) => {
											setFieldValue('isLogin', false);
											handleSubmit(e);
										}}
									>
										Register
									</Button>
								</View>
							</>
						)}
					</Formik>
				</View>
				<Snackbar visible={visible} onDismiss={onDismissSnackBar}>
					{error}
				</Snackbar>
			</Layout>
			<Loader isLoading={isLoading}></Loader>
		</>
	);
}
