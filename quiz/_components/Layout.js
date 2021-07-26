import React from "react";
import { tailwind } from "../_lib/tailwind";
import { View } from "react-native";

export default function Layout(props) {
  const { children } = props;

  return (
    <View style={tailwind("flex w-full h-full")}>{children}</View>
  );
}
