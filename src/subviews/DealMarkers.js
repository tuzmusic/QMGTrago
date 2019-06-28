// @flow
import type { Location } from "../redux/reducers/locationReducer";
import type Deal from "../models/Deal";
import React, { Component } from "react";
import { Marker, Callout } from "react-native-maps";
import { View, Button, Text, Platform, TextInput } from "react-native";
import { Image } from "react-native-elements";

import DealCellView from "../subviews/DealCellView";

import CellTextRow from "./CellTextRow";
import { connect } from "react-redux";
import { setCurrentRegion } from "../redux/actions/locationActions";
import pluralize from "pluralize";
type Props = {
  deals: { [key: string]: Deal },
  onMarkerPress: Deal => void,
  onCalloutPress: Deal => void,
  location: Location
};

const DealMarkers = (props: Props) => {
  return Object.keys(props.deals).map<Marker>((key: string) => {
    const deal = props.deals[key];
    const distanceString = props.location
      ? pluralize("mile", deal.distanceFromLocation(props.location), true) +
        " away"
      : "";
    return (
      <Marker
        coordinate={deal.location}
        key={key}
        onPress={props.onMarkerPress.bind(null, deal)}
      >
        <Callout
          onPress={props.onCalloutPress.bind(null, deal)}
          style={styles.callout}
        >
          {deal.photoUrls.length && (
            <Image
              style={[styles.image, { resizeMode: "cover" }]}
              source={{ uri: deal.photoUrls[0] }}
              // PlaceholderContent={Spinner}
            />
          )}
          <DealCellView deal={deal} />
          <CellTextRow style={text.distance}>{distanceString}</CellTextRow>
        </Callout>
      </Marker>
    );
  });
};

export default connect(({ location }) => ({
  location: location.currentRegion
}))(DealMarkers);

const baseSize = 15;
const text = {
  title: {
    fontWeight: "bold",
    fontSize: baseSize + 1
  },
  address: {
    fontSize: baseSize
  },
  distance: {
    fontSize: baseSize,
    textAlign: "center",
    marginTop: 10
  },
  caption: {
    textAlign: "center"
  },
  price: {
    fontSize: baseSize,
    color: "green"
  }
};

const styles = {
  callout: {
    maxWidth: 250
  },
  rightSection: {
    justifyContent: "flex-start",
    alignItems: "flex-end"
  },
  leftSection: {},
  cellContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: "lightgrey"
  },
  textContainer: {
    flex: 5,
    marginRight: 10
  },
  imageContainer: {
    flex: 2,
    padding: 7
  },
  image: {
    height: 100,
    width: 100
  }
};
