import type Deal from "../models/Deal";
import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { connect } from "react-redux";

class DealsListScreen extends Component {
  render() {
    return (
      <View>
        <Text> DealsListScreen </Text>
      </View>
    );
  }
}

export default connect()(DealsListScreen);
