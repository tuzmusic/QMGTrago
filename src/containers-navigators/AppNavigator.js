// @flow
import React, { Component } from "react";
import { Platform, View } from "react-native";
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
import LoadingIndicator from "../components/LoadingIndicator";

let initialRouteName;
initialRouteName = "List";
initialRouteName = "Map";

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

type Props = {
  navigation: Object,
  getLocationAsync: () => void,
  loadingMessage: string
};
class AppContainer extends Component<Props> {
  static router = TabNavigator.router;
  componentDidMount() {
    this.props.getLocationAsync();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LoadingIndicator message={this.props.loadingMessage} />
        <AppNavigator navigation={this.props.navigation} />
      </View>
    );
  }
}

export default connect(
  ({ location, deals }) => ({
    loadingMessage: location.loadingMessage || deals.loadingMessage
  }),
  { getLocationAsync }
)(AppContainer);
