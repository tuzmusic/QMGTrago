// @flow
import type Deal from "../models/Deal";
import type { Location } from "../redux/reducers/locationReducer";
import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import FilterInput from "../subviews/FilterInput";
import DealsListContainer from "../containers-navigators/DealsListContainer";
import { setSearchRadius } from "../redux/actions/locationActions";

type Props = {
  deals: Deal[],
  isLoading: boolean,
  navigation: Object,
  searchRadius: number,
  setSearchRadius: number => void,
  location: Location
};

class DealsListScreen extends Component<Props> {
  onDealClick(deal: Deal) {
    this.props.navigation.navigate("DetailScreen", {
      title: deal.name,
      deal: deal
    });
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.onSelectSearchRadius(5000);
      //   this.onDealClick(this.props.deals[this.props.deals.length - 1]);
    }, 1000);
  };

  onSelectSearchRadius(radius: number) {
    this.props.setSearchRadius(radius);
  }

  render() {
    if (this.props.deals.length)
      console.log(
        "rendering list screen with",
        this.props.deals.length,
        "deals"
      );

    return (
      <ScrollView>
        <FilterInput
          onSelectDropdown={this.onSelectSearchRadius.bind(this)}
          startingValue={this.props.searchRadius}
        />
        {this.props.location && (
          <DealsListContainer
            deals={this.props.deals
              .filter(withinSearchRadius.bind(this))
              .sort(closestFirst.bind(this))}
            navigation={this.props.navigation}
            onTextPress={this.onDealClick.bind(this)}
            isLoading={this.props.isLoading}
          />
        )}
      </ScrollView>
    );
  }
}

function closestFirst(a: Deal, b: Deal): number {
  if (!a.location || !b.location) return 0;
  return a.distanceFromLocation(this.props.location) >
    b.distanceFromLocation(this.props.location)
    ? 1
    : -1;
}

function withinSearchRadius(deal: Deal): boolean {
  if (!deal.location) return true;
  return (
    deal.distanceFromLocation(this.props.location) <= this.props.searchRadius
  );
}

const mapStateToProps = ({ deals, location, main }) => ({
  deals: Object.values(deals.deals), // Array of deals
  isLoading: deals.isLoading,
  location: location.currentRegion,
  searchRadius: location.searchRadiusInMiles
});

export default connect(
  mapStateToProps,
  { setSearchRadius }
)(DealsListScreen);
