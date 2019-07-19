import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import DealCellView from "../subviews/DealCellView";

class FavoritesScreen extends Component {
  render() {
    // if (this.props.favorites) debugger;
    return (
      <View>
        {!this.props.favorites ? (
          <View style={{ justifyContent: "center", textAlign: "center" }}>
            <Text>Loading favorites...</Text>
          </View>
        ) : (
          <FlatList
            data={this.props.favorites}
            renderItem={f => <DealCellView deal={f} />}
          />
        )}
      </View>
    );
  }
}

export default connect(({ wishlist }) => ({
  favorites: wishlist.currentWishlist
}))(FavoritesScreen);
