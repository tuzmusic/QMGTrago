// @flow
import type { Location } from "../redux/reducers/locationReducer";
import type Deal from "../models/Deal";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
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
      ? deal.distanceFromLocation(props.location) + " mi."
      : "";
  return (
    <TouchableOpacity style={styles.cellContainer} onPress={props.onTextPress}>
      <View style={styles.leftSection}>
        <CellTextRow style={text.title}>{deal.name}</CellTextRow>
        <CellTextRow>{deal.address}</CellTextRow>
      </View>
      <View style={styles.rightSection}>
        {props.showDistance && (
          <CellTextRow style={text.distance}>{distanceString}</CellTextRow>
        )}
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
