import React from 'react';
import { Badge, List } from 'react-native-paper';

export default function QuizResultQuestion(props) {
	const { title, desc, icon, right, style } = props;
	return <List.Item right={right} titleNumberOfLines={10} style={style} title={title} description={desc} left={(props) => <List.Icon {...props} icon={icon} />} />;
}
