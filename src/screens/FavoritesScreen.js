// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, FlatList } from "react-native";
import DealCellView from "../subviews/DealCellView";
// import DealsList from "../subviews/DealsList";
import DealsListContainer from "../containers-navigators/DealsListContainer";
import Deal from "../models/Deal";

type Props = { favorites: Deal[], navigation: Object };

class FavoritesScreen extends Component<Props> {
  onDealClick(deal: Deal) {
    this.props.navigation.navigate("DetailScreen", {
      title: deal.name,
      deal: deal
    });
  }

  render() {
    // if (this.props.favorites) debugger;
    return (
      <View>
        {!this.props.favorites ? (
          <View style={{ justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>Loading favorites...</Text>
          </View>
        ) : (
          <DealsListContainer
            deals={this.props.favorites}
            onTextPress={this.onDealClick.bind(this)}
          />
        )}
      </View>
    );
  }
}

export default connect(({ wishlist }) => ({
  favorites: wishlist.currentWishlist
}))(FavoritesScreen);
