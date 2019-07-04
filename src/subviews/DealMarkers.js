// @flow
import type { Location } from "../redux/reducers/locationReducer";
import type Deal from "../models/Deal";
import React from "react";
import { Marker, Callout } from "react-native-maps";

import DealCellView from "../subviews/DealCellView";
import DealDetailInfoView from "../subviews/DealDetailInfoView";
import { Text } from "react-native-elements";
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
  // return null;
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
          <DealDetailInfoView deal={deal} />
          <Text style={styles.distance}>{distanceString}</Text>
        </Callout>
      </Marker>
    );
  });
};

export default connect(({ location }) => ({
  location: location.currentRegion
}))(DealMarkers);

const baseSize = 15;

const styles = {
  callout: {
    maxWidth: 250,
    marginVertical: 10,
    marginHorizontal: 20
  },
  distance: {
    fontSize: baseSize,
    textAlign: "center",
    marginTop: 25
  }
};
