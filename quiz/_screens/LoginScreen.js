import { Formik } from 'formik';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import Layout from '../_components/Layout';
import { tailwind } from '../_lib/tailwind';
export default function LoginScreen(props) {
	const SignupSchema = Yup.object().shape({
		password: Yup.string().required('Required'),
		email: Yup.string().required('Required'),
	});
	return (
		<Layout title={props.route.name} subtitle="Please sign in to continue.">
			<View style={tailwind('flex justify-center p-4')}>
				<Formik initialValues={{ email: '', password: '' }} validationSchema={SignupSchema} onSubmit={(values) => console.log(values)}>
					{({ handleChange, handleBlur, errors, touched, handleSubmit, values }) => (
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
								<Button mode="contained" onPress={handleSubmit}>
									Sign in
								</Button>
							</View>
						</>
					)}
				</Formik>
			</View>
		</Layout>
	);
}
