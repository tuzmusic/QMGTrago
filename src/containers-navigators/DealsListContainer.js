import React, { Component } from "react";
import { View } from "react-native";

import DealsList from "../subviews/DealsList";

export default DealsListContainer = props => {
  return (
    <View style={{ width: "100%" }}>
      <DealsList
        deals={props.deals}
        navigation={props.navigation}
        onTextPress={props.onTextPress}
        isLoading={props.isLoading}
      />
    </View>
  );
};
