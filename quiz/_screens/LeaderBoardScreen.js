import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Badge, Card } from 'react-native-paper';
import { tailwind } from '../_lib/tailwind';
import Layout from './../_components/Layout';
import firebase from './../_services/firebase';
import QuizResultQuestion from './../_components/QuizResultQuestion';

export default function CategoriesScreen(props) {
	const [Leaderboard, setLeaderboard] = useState([]);
	useEffect(() => {
		firebase
			.database()
			.ref(`user`)
			.on('value', (allUsers) => {
				const board = [];
				allUsers.forEach((u) => {
					const userValue = u.val();
					const userQuizes = [];
					const quizes = u.child('completedQuizes');
					quizes.forEach((q) => {
						userQuizes.push({
							totalScore: q.val().totalScore,
						});
					});
					board.push({
						user: {
							name: userValue.displayName,
							email: userValue.email,
						},
						userQuizes,
					});
				});
				const leaderboard = board.map((b) => ({ user: b.user, totalPlayed: b.userQuizes.length, totalScore: b.userQuizes?.length ? b.userQuizes.map((uq) => uq.totalScore).reduce((c, n) => c + n, 0) : 0 })); //.filter((b) => b.totalScore > 0);
				leaderboard.sort((a, b) => {
					if (a.totalScore === b.totalScore) {
						return a.totalPlayed < b.totalPlayed ? 1 : -1;
					}
					return a.totalScore < b.totalScore ? 1 : -1;
				});
				setLeaderboard(leaderboard.slice(0, 10));
			});

		return () => {
			firebase.database().ref(`user`).off();
		};
	}, []);
	return (
		<Layout title={props.route.name} subtitle={`Top 10 players! 🔥🔥🔥`}>
			<View style={tailwind('flex-1')}>
				{Leaderboard?.length ? (
					<Card style={tailwind('flex-1')}>
						<Card.Content style={tailwind('flex-1')}>
							<View style={tailwind('flex-1')}>
								<ScrollView style={tailwind('flex-1 rounded-md')}>
									{Leaderboard.map((c, i) => (
										<QuizResultQuestion
											right={(props) => (
												<View style={tailwind('flex justify-center')}>
													<Badge size={30}>{i + 1}</Badge>
												</View>
											)}
											key={i}
											desc={`Scored ${c.totalScore}`}
											title={`${c.user.name}  ${c.user.email}`}
											icon="crown"
										></QuizResultQuestion>
									))}
								</ScrollView>
							</View>
						</Card.Content>
					</Card>
				) : (
					<></>
				)}
			</View>
		</Layout>
	);
}
