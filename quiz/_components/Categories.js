import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card } from 'react-native-paper';
import Loader from '../_components/Loader';
import { tailwind } from '../_lib/tailwind';
import Category from './../_components/Category';
import Layout from './../_components/Layout';

export default function Categories(props) {
	const { categories, quiz } = useStoreState((state) => state.categoryModel.category);
	const dbAddCategory = useStoreActions((actions) => actions.categoryModel.category.dbAddCategory);
	const createQuiz = useStoreActions((actions) => actions.categoryModel.category.createQuiz);
	const [isLoading, setIsLoading] = useState(true);
	const { metadata } = useStoreState((state) => state.authModel.user);

	useEffect(() => {
		const effect = async () => {
			await dbAddCategory();
			setIsLoading(false);
		};
		effect();
		return () => {};
	}, []);
	console.log(quiz, props);

	const handlePress = (category) => {
		createQuiz({ category, metadata });
		props.navigation.navigate('Play');
	};
	//  height: Dimensions.get('window').height
	// contentContainerStyle
	// contentContainerStyle={tailwind('flex-1')}
	return (
		<>
			<View style={tailwind('flex-1 px-2')}>
				{categories?.length ? (
					<Card style={tailwind('flex-1')}>
						<Card.Content style={tailwind('flex-1')}>
							<View style={tailwind('flex-1')}>
								<ScrollView style={tailwind('flex-1')}>
									{categories.map((c) => (
										<Category key={c.id} category={c} title={c.name} icon="format-list-checks" handlePress={(c) => handlePress(c)}></Category>
									))}
								</ScrollView>
							</View>
						</Card.Content>
					</Card>
				) : (
					<></>
				)}
			</View>
			<Loader isLoading={isLoading}></Loader>
		</>
	);
}
