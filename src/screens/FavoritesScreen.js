import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DealCellView from "../subviews/DealCellView";
// import DealsList from "../subviews/DealsList";
import DealsListContainer from "../containers-navigators/DealsListContainer";

class FavoritesScreen extends Component {
  render() {
    // if (this.props.favorites) debugger;
    return (
      <View>
        {!this.props.favorites ? (
          <View style={{ justifyContent: "center" }}>
            <Text style={{ textAlign: "center" }}>Loading favorites...</Text>
          </View>
        ) : (
          <DealsListContainer deals={this.props.favorites} />
        )}
      </View>
    );
  }
}

export default connect(({ wishlist }) => ({
  favorites: wishlist.currentWishlist
}))(FavoritesScreen);
