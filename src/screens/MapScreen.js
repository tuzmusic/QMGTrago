import React, { Component } from "react";
import { View, Text, Platform, TextInput } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import {
  getLocationAsync,
  setCurrentRegion
} from "../redux/actions/locationActions";
import Icon from "react-native-vector-icons/FontAwesome";
import AutoFillMapSearch from "../subviews/AutoFillMapSearch";
import DealMarkers from "../subviews/DealMarkers";

const CurrentRegionMarker = ({ currentRegion }) => {
  return currentRegion && currentRegion.showMarker ? (
    <Marker coordinate={currentRegion} pinColor={"green"} />
  ) : null;
};

const LocationButton = ({ onPress }) => {
  return (
    <Callout style={styles.locationButtonCallout}>
      <Button
        buttonStyle={styles.locationButton}
        onPress={onPress}
        icon={<Icon name="location-arrow" color="#3B6EC2" size={20} />}
      ></Button>
    </Callout>
  );
};

const GoToMockDealsButton = props => {
  return (
    <Callout style={[styles.locationButtonCallout, { right: 50 }]}>
      <Button
        onPress={() =>
          props.setCurrentRegion({
            latitude: 40.74410640000001,
            longitude: -73.98741129999999,
            showMarker: false
          })
        }
        title={"New York"}
      />
    </Callout>
  );
};

class MapScreen extends Component {
  state = { region: null };

  onMarkerPress = deal => {
    // this is for reorienting the map. not working yet.
    this.setState({
      region: { ...this.props.currentRegion, ...deal.location }
    });
  };

  onCalloutPress = deal => {
    this.props.navigation.navigate("DetailScreen", {
      title: deal.name,
      deal: deal
    });
  };
  beforePressPrediction = async () => {
    await this.setState({ region: null });
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <LoadingIndicator
          message={"Loading Deals..."}
          isVisible={this.props.isLoading}
        /> */}
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          region={this.props.currentRegion || null}
        >
          <DealMarkers
            deals={this.props.deals}
            onCalloutPress={this.onCalloutPress.bind(this)}
            onMarkerPress={() => {}}
            // onMarkerPress={this.onMarkerPress.bind(this)}
          />
          <CurrentRegionMarker currentRegion={this.props.currentRegion} />
        </MapView>
        <Callout style={styles.searchCallout}>
          <AutoFillMapSearch
            style={styles.calloutSearch}
            beforeOnPress={this.beforePressPrediction.bind(this)}
          />
        </Callout>
        <GoToMockDealsButton setCurrentRegion={this.props.setCurrentRegion} />
        <LocationButton onPress={this.props.getLocationAsync} />
      </View>
    );
  }
}

export default connect(
  ({ location, deals }) => ({
    currentRegion: location.currentRegion,
    deals: deals.deals
  }),
  { getLocationAsync, setCurrentRegion }
)(MapScreen);

const styles = {
  searchCallout: {
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 10,
    top: 20,
    left: 15,
    right: 15
  },
  calloutSearch: {
    marginLeft: 10,
    marginRight: 10,
    height: 40
  },
  locationButtonCallout: {
    borderRadius: 50,
    opacity: 0.7,
    backgroundColor: "lightgrey",
    bottom: 0,
    right: 0,
    margin: 10
  },
  locationButton: {
    backgroundColor: "transparent",
    padding: 12
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
};
