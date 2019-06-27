import React, { Component } from "react";
import { View, Text, Platform, TextInput } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { getLocationAsync } from "../redux/actions/locationActions";
import TabBarIcon from "../components/TabBarIcon";
import Icon from "react-native-vector-icons/FontAwesome";

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
      >
        {/* <TabBarIcon name={"location-arrow"} library={"FontAwesome"} /> */}
      </Button>
    </Callout>
  );
};

class MapScreen extends Component {
  componentDidMount = () => {
    // setTimeout(automate.bind(this), 2000);
  };

  state = { region: null };

  // onMarkerPress = station => {
  //   this.setState({
  //     region: { ...this.props.currentRegion, ...station.location }
  //   });
  // };

  // onCalloutPress = station => {
  //   this.props.setCurrentStationID(station.id);
  //   this.props.navigation.navigate("StationDetail", {
  //     title: station.title
  //   });
  // };
  // beforePressPrediction = async () => {
  //   console.log("beforePressPrediction");
  //   await this.setState({ region: null });
  // };
  render() {
    return (
      <View style={styles.container}>
        {/* <LoadingIndicator
          message={"Loading Stations..."}
          isVisible={this.props.isLoading}
        /> */}
        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          region={this.props.currentRegion || null}
        >
          {/* <StationMarkers
            // provider={MapView.PROVIDER_GOOGLE}
            // region={this.props.currentRegion}
            stations={this.props.stations}
            onCalloutPress={this.onCalloutPress.bind(this)}
            onMarkerPress={() => {}}
            // onMarkerPress={this.onMarkerPress.bind(this)}
          /> 
        */}
          <CurrentRegionMarker currentRegion={this.props.currentRegion} />
        </MapView>
        {/* <Callout style={styles.searchCallout}>
          <AutoFillMapSearch
            style={styles.calloutSearch}
            beforeOnPress={this.beforePressPrediction.bind(this)}
          />
        </Callout>
      */}
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
