import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function QuizQuestion(props) {
	const parseQuestionId = (id) => +id.slice(1);
	const question = props.route.params;
	console.log(props);
	return (
		<>
			<Text>{JSON.stringify(question)}</Text>
			<Button onPress={() => props.navigation.navigate(`q${parseQuestionId(question.id) + 1}`)}> next</Button>
		</>
	);
}
