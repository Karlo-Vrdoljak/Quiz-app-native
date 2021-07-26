import { useStoreActions, useStoreState } from "easy-peasy";
import React from "react";
import { Button } from "react-native-paper";
import Layout from "./../_components/Layout";

export default function HomeScreen(props) {
  const categories = useStoreState((state) => state.category.categories);
  const fetchFB = useStoreActions((actions) => actions.category.dbAddCategory);
  console.log(categories);
  return (
    <Layout>
      <Button icon="camera" mode="contained" onPress={() => fetchFB()}></Button>
    </Layout>
  );
}
