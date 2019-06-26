// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "./src/screens/MapScreen";
import MapView from "react-native-maps";
import AppNavigator from "./src/navigators/AppNavigator";
export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
