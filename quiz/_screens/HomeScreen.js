import { useStoreState } from 'easy-peasy';
import React from 'react';
import Layout from './../_components/Layout';
import Profile from '../_components/Profile';

export default function HomeScreen(props) {
	// const categories = useStoreState((state) => state.store.categoryModel.category);
	const { metadata } = useStoreState((state) => state.authModel.user);
	// const loginWithEmail = useStoreActions((actions) => actions.store.authModel.user.signInWithEmailAndPassword);
	//
	// const fetchFB = useStoreActions((actions) => actions.store.categoryModel.category.dbAddCategory);
	return (
		<Layout title={props.route.name} subtitle={`Welcome back 😊`}>
			<Profile user={metadata.user}></Profile>
		</Layout>
	);
}
