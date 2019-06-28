// @flow
import React from "react";
import { Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { DotIndicator } from "react-native-indicators";

const LoadingIndicator = ({ isVisible, message }: Props) => (
  <Overlay
    containerStyle={styles.modal}
    height={200}
    isVisible={isVisible}
    style={styles.modal}
    borderRadius={20}
    overlayBackgroundColor={"lightblue"}
  >
    <View style={styles.modalContainer}>
      <DotIndicator color={"darkgrey"} />
      <Text>{message}</Text>
    </View>
  </Overlay>
);

export default LoadingIndicator;

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 40
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
type Props = { isVisible: boolean, message: string };