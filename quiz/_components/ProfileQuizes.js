import { useStoreState } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { tailwind } from '../_lib/tailwind';
import Loader from './Loader';
import firebase from './../_services/firebase';
import QuizResultQuestion from './QuizResultQuestion';

export default function ProfileQuizes(props) {
	const { Quizes } = props;

	if (!Quizes) {
		return <Loader isLoading={true}></Loader>;
	}
	return (
		<View style={tailwind('flex-1')}>
			{Quizes?.length ? (
				<Card style={tailwind('flex-1')}>
					<Card.Content style={tailwind('flex-1')}>
						<View style={tailwind('flex-1')}>
							<ScrollView style={tailwind('flex-1 rounded-md')}>
								{Quizes.map((c, i) => {
									return <QuizResultQuestion key={i} desc={`Scored ${c.totalScore}`} title={c.category} icon="file-check"></QuizResultQuestion>;
								})}
							</ScrollView>
						</View>
					</Card.Content>
				</Card>
			) : (
				<></>
			)}
		</View>
	);
}
