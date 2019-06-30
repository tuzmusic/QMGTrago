// @flow
import React from "react";
import { Text, View } from "react-native";
import { Overlay } from "react-native-elements";
import { DotIndicator } from "react-native-indicators";

type Props = { isVisible?: boolean, message: string };

const LoadingIndicator = ({ isVisible, message }: Props) => {
  // console.log("message:", message);

  return (
    <Overlay
      containerStyle={styles.modal}
      height={200}
      isVisible={!!message}
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
};

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
