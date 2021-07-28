import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from 'easy-peasy';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Bootstrap from './Bootstrap';
import store from './_stores/store';
import Layout from './_components/Layout';

export default function App() {
	return (
		<NavigationContainer>
			<StoreProvider store={store}>
				<PaperProvider>
					<Bootstrap></Bootstrap>
				</PaperProvider>
			</StoreProvider>
		</NavigationContainer>
	);
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
