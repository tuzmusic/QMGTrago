// @flow
import type Deal from "../models/Deal";
import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import FilterInput from "../subviews/FilterInput";
import DealsListContainer from "../containers-navigators/DealsListContainer";

type Props = { deals: Deal[], isLoading: boolean, navigation: Object };

class DealsListScreen extends Component<Props> {
  onDealClick = (deal: Deal) => {
    // this.props.setCurrentDealID(deal.id);
    // this.props.navigation.navigate("DealDetail", { title: deal.title });
  };

  onSelectSearchRadius = (radius: number) => {
    // this.props.setSearchRadius(radius);
  };

  render() {
    return (
      <ScrollView>
        <FilterInput
          onSelectDropdown={this.onSelectSearchRadius.bind(this)}
          startingValue={0}
          // startingValue={this.props.searchRadius}
        />
        <DealsListContainer
          deals={
            this.props.deals
            // .filter(withinSearchRadius.bind(this))
            // .sort(closestFirst.bind(this))
          }
          navigation={this.props.navigation}
          onTextPress={this.onDealClick.bind(this)}
          isLoading={this.props.isLoading}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = ({ deals, location, main }) => ({
  deals: Object.values(deals.deals), // Array of deals
  isLoading: deals.isLoading,
  location: location.currentRegion,
  searchRadius: deals.searchRadiusInMiles
});

export default connect(mapStateToProps)(DealsListScreen);
