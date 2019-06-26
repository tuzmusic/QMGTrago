import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import MapScreen from "../screens/MapScreen";
import TabBarIcon from "../components/TabBarIcon";
import { getLocationAsync } from "../redux/actions/locationActions";

const MapStack = createStackNavigator({
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: "Deals Near You"
    }
  }
  // ResultsScreen: StationsListScreen,
  // StationDetail: StationDetailScreen
});

MapStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={focused ? "map" : "map-o"}
      library={"FontAwesome"}
    />
  )
};

const TabNavigator = createBottomTabNavigator({
  Map: MapStack
});

const SwitchNavigator = createSwitchNavigator({
  Main: TabNavigator
});

const AppNavigator = createAppContainer(SwitchNavigator);

class AppContainer extends Component {
  static router = TabNavigator.router;
  componentWillMount() {
    this.props.getLocationAsync();
  }
  render() {
    return <AppNavigator navigation={this.props.navigation} />;
  }
}

export default connect(
  null,
  { getLocationAsync }
)(AppContainer);
