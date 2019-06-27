import React, { Component } from "react";
import { View, Button, Text, Platform, TextInput } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { connect } from "react-redux";
import { getLocationAsync } from "../redux/actions/locationActions";

const CurrentRegionMarker = ({ currentRegion }) => {
  return currentRegion && currentRegion.showMarker ? (
    <Marker coordinate={currentRegion} pinColor={"green"} />
  ) : null;
};

const LocationButton = ({ onPress }) => {
  return (
    <Callout style={styles.locationButtonCallout}>
      <Button onPress={onPress} title={"Find Me"} style={styles.locationButton}>
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
        <Callout style={[styles.locationButtonCallout, { right: 100 }]}>
          <Button
            onPress={() =>
              this.props.setCurrentRegion({
                ...Locations.cupertino,
                showMarker: true
              })
            }
            title={"Cupertino"}
            style={styles.locationButton}
          />
        </Callout>
      */}
        <LocationButton
          onPress={() => {
            // this.setState({ region: null });
            this.props.getLocationAsync();
          }}
        />
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
    borderRadius: 10,
    opacity: 0.7,
    backgroundColor: "lightgrey",
    bottom: 0,
    right: 0,
    margin: 10
  },
  locationButton: {
    backgroundColor: "grey",
    borderRadius: 10,
    opacity: 0.8
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  }
};
