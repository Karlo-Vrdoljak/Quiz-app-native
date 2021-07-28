import React from 'react';
import { Button } from 'react-native-paper';
import Layout from './../_components/Layout';

export default function HomeScreen(props) {
	// const categories = useStoreState((state) => state.store.categoryModel.category);
	// const user = useStoreState((state) => state.store.authModel.user);
	// const loginWithEmail = useStoreActions((actions) => actions.store.authModel.user.signInWithEmailAndPassword);
	//
	function loginWithEmail() {}
	// const fetchFB = useStoreActions((actions) => actions.store.categoryModel.category.dbAddCategory);
	return <Button icon="camera" mode="contained" onPress={() => loginWithEmail()}></Button>;
}
