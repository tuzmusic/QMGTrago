import React, { Component } from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import MapScreen from "../screens/MapScreen";
import TabBarIcon from "../components/TabBarIcon";
// import MainTabNavigator from "./MainTabNavigator";
// import AuthStack from "./AuthNavigator";

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
  tabBarLabel: "Map",
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

const AppNavigator = createSwitchNavigator({
  // Auth: AuthStack,
  Main: TabNavigator
});

export default createAppContainer(AppNavigator);
