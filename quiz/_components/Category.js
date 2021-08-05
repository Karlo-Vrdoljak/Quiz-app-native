import React from 'react';
import { List } from 'react-native-paper';

export default function Category(props) {
	const { title, desc, icon, handlePress, category } = props;
	return <List.Item title={title} description={desc} left={(props) => <List.Icon {...props} icon={icon} />} onPress={() => handlePress(category)} />;
}
