// @flow
import type Deal from "../models/Deal";
import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import FilterInput from "../subviews/FilterInput";
import DealsListContainer from "../containers-navigators/DealsListContainer";

type Props = { deals: Deal[], isLoading: boolean, navigation: Object };

const DealsListScreen = (props: Props) => {
  function onDealClick(deal: Deal) {
    props.navigation.navigate("DetailScreen", { title: deal.name, deal: deal });
  }

  function onSelectSearchRadius(radius: number) {
    // props.setSearchRadius(radius);
  }

  return (
    <ScrollView>
      <FilterInput
        onSelectDropdown={onSelectSearchRadius.bind(this)}
        startingValue={0}
        // startingValue={props.searchRadius}
      />
      <DealsListContainer
        deals={
          props.deals
          // .filter(withinSearchRadius.bind(this))
          // .sort(closestFirst.bind(this))
        }
        navigation={props.navigation}
        onTextPress={onDealClick.bind(this)}
        isLoading={props.isLoading}
      />
    </ScrollView>
  );
};
const mapStateToProps = ({ deals, location, main }) => ({
  deals: Object.values(deals.deals), // Array of deals
  isLoading: deals.isLoading,
  location: location.currentRegion,
  searchRadius: deals.searchRadiusInMiles
});

export default connect(mapStateToProps)(DealsListScreen);
