import React, { Component } from "react";
import { View, Text } from "react-native";

export default CellTextRow = (props: Object) => {
  if (typeof props.children === "string")
    return <Text style={[{ padding: 1 }, props.style]}>{props.children}</Text>;
  return <View style={[{ padding: 1 }, props.style]}>{props.children}</View>;
};
