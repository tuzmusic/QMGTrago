import React, { Component } from "react";
import { Platform } from "react-native";
import { connect } from "react-redux";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import MapScreen from "../screens/MapScreen";
import DealsListScreen from "../screens/DealsListScreen";
import DealDetailScreen from "../screens/DealDetailScreen";
import TabBarIcon from "../components/TabBarIcon";
import { getLocationAsync } from "../redux/actions/locationActions";

const initialRouteName = "List";

const MapStack = createStackNavigator({
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      title: "Deals Near You"
    }
  },
  DetailScreen: {
    screen: DealDetailScreen
  }
});

const ListStack = createStackNavigator({
  ListScreen: {
    screen: DealsListScreen,
    navigationOptions: {
      title: "Deals Near You"
    }
  },
  DetailScreen: {
    screen: DealDetailScreen
  }
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

ListStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-list" : "md-list"}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    Map: MapStack,
    List: ListStack
  },
  { initialRouteName }
);

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
