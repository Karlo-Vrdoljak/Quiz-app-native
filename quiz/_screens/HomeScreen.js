import { useStoreState } from 'easy-peasy';
import React from 'react';
import Layout from './../_components/Layout';
import Profile from '../_components/Profile';

export default function HomeScreen(props) {
	return (
		<Layout title={props.route.name} subtitle={`Welcome back 😊`}>
			<Profile></Profile>
		</Layout>
	);
}
