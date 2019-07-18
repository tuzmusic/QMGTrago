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
import { getDeals } from "../redux/actions/dealActions";
import { addToWishlist } from "../redux/actions/wishlistActions";
import LoadingIndicator from "../components/LoadingIndicator";
import LoginScreen from "../screens/LoginScreen";
import AuthNavigator from "./AuthNavigator";
import axios from "axios";
import UserScreen from "../screens/UserScreen";

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
    screen: DealDetailScreen,
    navigationOptions: {
      title: "Deal"
    }
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
    screen: DealDetailScreen,
    navigationOptions: {
      title: "Deal"
    }
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

UserScreen.navigationOptions = {
  tabBarLabel: "Me",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={focused ? "user-circle" : "user-circle-o"}
      library={"FontAwesome"}
    />
  )
};

const TabNavigator = createBottomTabNavigator(
  {
    Map: MapStack,
    List: ListStack,
    User: UserScreen
  },
  { initialRouteName }
);

class TabContainer extends Component<Object> {
  static router = TabNavigator.router;
  async componentDidMount() {
    // this.props.addToWishlist();
    await this.props.getLocationAsync();
    await this.props.getDeals();
  }
  render() {
    return <TabNavigator navigation={this.props.navigation} />;
  }
}
const SwitchNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Main: connect(
    ({ location }) => ({ location: location.currentRegion }),
    { getLocationAsync, getDeals, addToWishlist }
  )(TabContainer)
});

const AppNavigator = createAppContainer(SwitchNavigator);

type AppProps = {
  navigation: Object,
  getLocationAsync: () => void,
  loadingMessage: string
};

class AppContainer extends Component<AppProps> {
  static router = TabNavigator.router;

  componentDidMount() {
    // this.props.getLocationAsync();
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

export default connect(({ location, deals, auth }) => ({
  loadingMessage:
    auth.loadingMessage || location.loadingMessage || deals.loadingMessage
}))(AppContainer);
