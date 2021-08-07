import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from 'easy-peasy';
import React from 'react';
// import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Bootstrap from './Bootstrap';
import store from './_stores/store';


export default function App() {
	// LogBox.ignoreLogs(['Setting a timer']);
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
