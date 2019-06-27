import React, { Component } from "react";
import { View } from "react-native";
// import LoadingIndicator from "../components/LoadingIndicator";

import DealsList from "../subviews/DealsList";

export default DealsListContainer = props => {
  return (
    <View style={{ width: "100%" }}>
      {/* 
        <LoadingIndicator
        message={"Loading Deals..."}
        isVisible={props.isLoading}
        />
      */}
      <DealsList
        deals={props.deals}
        navigation={props.navigation}
        onTextPress={props.onTextPress}
        isLoading={props.isLoading}
      />
    </View>
  );
};
