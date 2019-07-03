// @flow
import type { Location } from "../redux/reducers/locationReducer";
import type Deal from "../models/Deal";
import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import HTML from "react-native-render-html";
import CellTextRow from "../subviews/CellTextRow";
import pluralize from "pluralize";

type Props = {
  deal: Deal,
  onTextPress: () => mixed,
  location: Location,
  containerStyle: { [key: string]: {} },
  showDistance: boolean
};

const DealCellView = (props: Props) => {
  const deal = props.deal;
  const distanceString =
    props.location && deal.location
      ? pluralize("mile", deal.distanceFromLocation(props.location), true) +
        " away"
      : "";
  return (
    <TouchableOpacity style={styles.cellContainer} onPress={props.onTextPress}>
      <View style={styles.leftSection}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <CellTextRow style={text.title}>{deal.name}</CellTextRow>
          {props.showDistance && (
            <CellTextRow style={text.distance}>{distanceString}</CellTextRow>
          )}
        </View>
        <CellTextRow>
          <HTML html={deal.descriptionWithStyle(text.html)} />
        </CellTextRow>
      </View>
    </TouchableOpacity>
  );
};

export default connect(({ location }) => ({
  location: location.currentRegion
}))(DealCellView);

const baseSize = 16;
const text = {
  html: `fontSize:${baseSize};`,
  title: {
    fontWeight: "bold",
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
