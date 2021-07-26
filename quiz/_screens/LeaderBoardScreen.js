import { tailwind } from "../_lib/tailwind";
import { View, Text } from "react-native";
import React from "react";
import Layout from './../_components/Layout';
import { useStore } from 'easy-peasy';


export default function CategoriesScreen({ children }) {
  const store = useStore();
  console.log(store.getState());
  return (
    <Layout>
      <Text style={tailwind("text-xl text-gray-600")}>leaderboard</Text>
    </Layout>
  );
}
