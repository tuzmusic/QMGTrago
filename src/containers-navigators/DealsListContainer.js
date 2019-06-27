import React, { Component } from "react";
import { View } from "react-native";
// import LoadingIndicator from "../components/LoadingIndicator";

import DealsList from "../subviews/DealsList";

export default class DealsListContainer extends Component {
  render() {
    const { props } = this;
    const deals = Object.values(props.deals);

    return (
      <View style={{ width: "100%" }}>
        {/* 
        <LoadingIndicator
        message={"Loading Deals..."}
        isVisible={props.isLoading}
        />
      */}
        <DealsList
          deals={deals}
          navigation={props.navigation}
          onTextPress={props.onTextPress}
          isLoading={props.isLoading}
        />
      </View>
    );
  }
}
