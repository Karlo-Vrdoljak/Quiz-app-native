import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Badge, Button, Card, Snackbar, Text, Title } from 'react-native-paper';
import { getColor, tailwind } from '../_lib/tailwind';
import { correctAnswerText, wrongAnswerText } from '../_lib/utils';

const LeftContent = (props) => <Badge size={30}>{props.count}</Badge>;

export default function QuizQuestion(props) {
	const [visible, setVisible] = React.useState(false);
	const [SnackBarText, setSnackBarText] = React.useState(null);

	const onToggleSnackBar = () => setVisible(!visible);
	const onDismissSnackBar = () => setVisible(false);

	const [CurrentScore, setCurrentScore] = useState(30);

	const parseQuestionId = (id) => +id.slice(1);
	const question = props.route.params;
	const removeActiveQuiz = useStoreActions((actions) => actions.categoryModel.category.removeActiveQuiz);
	const onAnsweredQuestion = useStoreActions((actions) => actions.categoryModel.category.onAnsweredQuestion);

	const [IsCorrect, setIsCorrect] = React.useState(null);
	const submited = React.useRef(false);
	const { metadata } = useStoreState((state) => state.authModel.user);
	const handleAnswer = (answer) => {
		if (!submited.current) {
			const isCorrect = question.correct_answer === answer;
			onAnsweredQuestion({ metadata, navigation: props.navigation, userAnswer: answer, id: question.id, CurrentScore, isCorrect });
			if (isCorrect) {
				setIsCorrect(true);
				setSnackBarText(correctAnswerText());
				onToggleSnackBar();
			} else {
				setIsCorrect(false);
				setSnackBarText(wrongAnswerText());
				onToggleSnackBar();
			}
		}
		submited.current = true;
	};

	if (submited.current) {
		return (
			<>
				<Snackbar style={IsCorrect ? styles.correct : styles.wrong} visible={visible} onDismiss={onDismissSnackBar}>
					{SnackBarText}
				</Snackbar>
			</>
		);
	}
	return (
		<>
			<View style={tailwind('p-2')}>
				<Button icon="close-octagon" onPress={() => removeActiveQuiz({ metadata, navigation: props.navigation })}>
					Quit
				</Button>
			</View>
			<View style={{ flex: 1, flexShrink: 2, justifyContent: 'center', alignItems: 'center' }}>
				<CountdownCircleTimer
					isPlaying={!submited.current}
					duration={30}
					size={150}
					colors={[
						['#004777', 0.4],
						['#F7B801', 0.4],
						['#A30000', 0.2],
					]}
					onComplete={() => handleAnswer(question.correct_answer === 'True' ? 'False' : 'True')}
				>
					{({ remainingTime, animatedColor }) => {
						setTimeout(() => {
							setCurrentScore(remainingTime);
						}, 0);
						return (
							<Animated.Text style={{ color: animatedColor }}>
								<Text style={tailwind('text-xl')}> {remainingTime}</Text>
							</Animated.Text>
						);
					}}
				</CountdownCircleTimer>
			</View>
			<Card style={tailwind('flex-1 pt-2')}>
				<Card.Title titleNumberOfLines={10} titleStyle={tailwind('text-base')} title={question.question} subtitle={question.category} left={() => <LeftContent count={parseQuestionId(question.id) + 1}></LeftContent>} />
				<Card.Content>
					<Title style={tailwind('text-base text-center py-8')}>Answer with yes or no!</Title>
					<View style={tailwind('flex items-center flex-row justify-center')}>
						<View style={tailwind('w-1/2 px-2')}>
							<Button icon="close" mode="outlined" onPress={() => handleAnswer('False')}>
								No
							</Button>
						</View>
						<View style={tailwind('w-1/2 px-2')}>
							<Button icon="check" mode="outlined" onPress={() => handleAnswer('True')}>
								Yes
							</Button>
						</View>
					</View>
				</Card.Content>
			</Card>
		</>
	);
}
const styles = StyleSheet.create({
	correct: {
		backgroundColor: getColor('green-500'),
	},
	wrong: {
		backgroundColor: getColor('red-500'),
	},
});
