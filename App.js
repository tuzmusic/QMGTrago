import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "./src/screens/MapScreen";
import MapView from "react-native-maps";

export default function App() {
  return (
    // <View style={styles.container}>
    // <Text>Home Screen</Text>
    // <MapView style={{ flex: 1 }} showsUserLocation={true} />
    <MapScreen />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
