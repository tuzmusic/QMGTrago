// @flow
import type { Location } from "../redux/reducers/locationReducer";
import type Deal from "../models/Deal";
import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import HTML from "react-native-render-html";

const CellTextRow = props => {
  if (typeof props.children === "string")
    return <Text style={[{ padding: 1 }, props.style]}>{props.children}</Text>;
  return <View style={[{ padding: 1 }, props.style]}>{props.children}</View>;
};

type Props = {
  deal: Deal,
  onTextPress: () => mixed,
  location: Location,
  containerStyle: { [key: string]: {} }
};

const DealCellView = (props: Props) => {
  const deal = props.deal;
  return (
    <TouchableOpacity style={styles.cellContainer} onPress={props.onTextPress}>
      <View style={styles.leftSection}>
        <CellTextRow style={text.title}>{deal.name}</CellTextRow>
        <CellTextRow style={text.title}>
          <HTML html={deal.description} />
        </CellTextRow>
        {/*           
  <CellTextRow style={text.address}>{deal.address}</CellTextRow>
        </View>
        <View style={styles.rightSection}>
          {props.location && (
            <CellTextRow style={text.distance}>
              {deal.distanceFromLocation(this.props.location)} mi.
            </CellTextRow>
          )}
          <CellTextRow style={text.price}>{deal.priceString()}</CellTextRow> */}
      </View>
    </TouchableOpacity>
  );
};

export default connect(({ location }) => ({
  location: location.currentRegion
}))(DealCellView);

const baseSize = 16;
const text = {
  title: {
    fontSize: baseSize + 3
  },
  address: {
    fontSize: baseSize - 1
  },
  distance: {
    fontSize: baseSize
  },
  caption: {
    textAlign: "center"
  },
  price: {
    fontSize: 16,
    color: "green"
  }
};

const styles = {
  rightSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  leftSection: { flex: 4 },
  cellContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  }
};
