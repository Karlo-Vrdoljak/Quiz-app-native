import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { getColor, tailwind } from '../_lib/tailwind';
import QuizResultQuestion from './QuizResultQuestion';
import { useNavigation } from '@react-navigation/native';

export default function QuizResult() {
	const { quizResult } = useStoreState((state) => state.categoryModel.category);
	const { quiz, totalScore } = quizResult;
	const navigation = useNavigation();

	const setQuizResult = useStoreActions((actions) => actions.categoryModel.category.setQuizResult);
	const handlePress = () => {
		setQuizResult(null);
		navigation.navigate('Pick a category');
	};

	const totalScoreMessage = () => {
		if (totalScore > 250) {
			return 'Congratulations! This is a great result!';
		}
		if (totalScore > 199) {
			return 'Nicely done! This is a nice result!';
		}
		if (totalScore > 100) {
			return 'Great! You can do a lot better tho!';
		}
		return 'Unlucky! Try again for a better result!';
	};
	// const removeActiveQuiz = useStoreActions((actions) => actions.categoryModel.category.removeActiveQuiz);
	const userIsCorrect = (c) => c.userAnswer === c.correct_answer;
	return (
		<>
			<View style={tailwind('flex-1')}>
				{quiz?.length ? (
					<Card style={tailwind('flex-1')}>
						<Card.Content style={tailwind('flex-1')}>
							<View style={tailwind('flex-1')}>
								<ScrollView style={tailwind('flex-1 rounded-md')}>
									{quiz.map((c, i) => {
										return <QuizResultQuestion key={i} desc={`Scored ${c.CurrentScore}`} title={c.question} style={{ backgroundColor: userIsCorrect(c) ? getColor('green-500') : getColor('red-500') }} icon={userIsCorrect(c) ? 'check-circle' : 'close-circle'}></QuizResultQuestion>;
									})}
								</ScrollView>
							</View>
						</Card.Content>
						<Card.Actions style={tailwind('flex-1 h-8')}>
							<View style={tailwind('flex-1')}>
								<View style={tailwind('flex-1 justify-center')}>
									<Text style={tailwind('text-4xl text-center ')}>You scored {totalScore}</Text>
								</View>
								<View style={tailwind('flex-1 justify-center')}>
									<Text style={tailwind('text-2xl text-center ')}>{totalScoreMessage()}</Text>
								</View>
								<View style={tailwind('flex-1')}>
									<Button mode="contained" onPress={() => handlePress()}>
										Play again!
									</Button>
								</View>
							</View>
						</Card.Actions>
					</Card>
				) : (
					<></>
				)}
			</View>
		</>
	);
}
