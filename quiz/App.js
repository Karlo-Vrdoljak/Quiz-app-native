import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StoreProvider } from "easy-peasy";
import React from "react";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { getColor } from "./_lib/tailwind";
import CategoriesScreen from "./_screens/CategoriesScreen";
import HomeScreen from "./_screens/HomeScreen";
import LeaderBoardScreen from "./_screens/LeaderBoardScreen";
import store from "./_stores/store";
const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StoreProvider store={store}>
        <PaperProvider>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "md-home" : "md-home-outline"}
                    size={20}
                    color={getColor("indigo-600")}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Categories"
              component={CategoriesScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "md-book" : "md-book-outline"}
                    size={20}
                    color={getColor("indigo-600")}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Leaderboard"
              component={LeaderBoardScreen}
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Ionicons
                    name={focused ? "md-star" : "md-star-outline"}
                    size={20}
                    color={getColor("indigo-600")}
                  />
                ),
              }}
            />
          </Tab.Navigator>
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
