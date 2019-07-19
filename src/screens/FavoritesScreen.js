import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";

class FavoritesScreen extends Component {
  render() {
    return (
      <View>
        <Text> Favorites </Text>
      </View>
    );
  }
}

export default connect(({ wishlist }) => ({
  favorites: wishlist.currentWishlist
}))(FavoritesScreen);
