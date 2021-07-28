import { tailwind } from '../_lib/tailwind';
import { View, Text } from 'react-native';
import React from 'react';
import Layout from './../_components/Layout';

export default function CategoriesScreen({ children }) {
	return <Text style={tailwind('text-xl text-gray-600')}>categories</Text>;
}
