import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import Loader from '../_components/Loader';
import Layout from './../_components/Layout';
import Category from './../_components/Category';
import { View, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { tailwind } from '../_lib/tailwind';

export default function CategoriesScreen(props) {
	const { categories } = useStoreState((state) => state.categoryModel.category);
	const dbAddCategory = useStoreActions((actions) => actions.categoryModel.category.dbAddCategory);
	const [isLoading, setIsLoading] = useState(true);

	console.log(categories, isLoading);
	useEffect(() => {
		const effect = async () => {
			await dbAddCategory();
			setIsLoading(false);
		};
		effect();
		return () => {};
	}, []);

	const handlePress = (category) => {
		console.log(category);
	};
	//  height: Dimensions.get('window').height
	// contentContainerStyle
	return (
		<>
			<Layout title={props.route.name} subtitle={`Pick a category and play! 🎮`}>
				<View style={tailwind('flex-1 px-2')}>
					{categories?.length ? (
						<Card style={tailwind('flex-1')}>
							<Card.Content style={tailwind('flex-1')}>
								<ScrollView contentContainerStyle={tailwind('flex-1')}>
									{categories.map((c) => (
										<Category key={c.id} category={c} title={c.name} icon="format-list-checks" handlePress={(c) => handlePress(c)}></Category>
									))}
								</ScrollView>
							</Card.Content>
						</Card>
					) : (
						<></>
					)}
				</View>
			</Layout>
			<Loader isLoading={isLoading}></Loader>
		</>
	);
}
