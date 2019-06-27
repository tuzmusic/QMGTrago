import React, { Component } from "react";
import { View, Text, Platform, TextInput } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { getLocationAsync } from "../redux/actions/locationActions";
import Icon from "react-native-vector-icons/FontAwesome";
import AutoFillMapSearch from "../subviews/AutoFillMapSearch";

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
        icon={<Icon name="location-arrow" color="blue" size={20} />}
      ></Button>
    </Callout>
  );
};

class MapScreen extends Component {
  state = { region: null };

  onMarkerPress = deal => {
    this.setState({
      region: { ...this.props.currentRegion, ...deal.location }
    });
  };

  onCalloutPress = deal => {
    this.props.setCurrentDealID(deal.id);
    this.props.navigation.navigate("DealDetail", {
      title: deal.title
    });
  };
  beforePressPrediction = async () => {
    console.log("beforePressPrediction");
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
          {/* 
          // provider={MapView.PROVIDER_GOOGLE}
          <DealMarkers
            deals={this.props.deals}
            onCalloutPress={this.onCalloutPress.bind(this)}
            onMarkerPress={() => {}}
            // onMarkerPress={this.onMarkerPress.bind(this)}
          /> 
        */}
          <CurrentRegionMarker currentRegion={this.props.currentRegion} />
        </MapView>
        <Callout style={styles.searchCallout}>
          <AutoFillMapSearch
            style={styles.calloutSearch}
            beforeOnPress={this.beforePressPrediction.bind(this)}
          />
        </Callout>

        <LocationButton onPress={this.props.getLocationAsync} />
      </View>
    );
  }
}

export default connect(
  ({ location }) => ({
    currentRegion: location.currentRegion
  }),
  { getLocationAsync }
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
