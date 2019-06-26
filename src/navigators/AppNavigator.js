import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import MapScreen from "../screens/MapScreen";
// import MainTabNavigator from "./MainTabNavigator";
// import AuthStack from "./AuthNavigator";

const MapStack = createStackNavigator({
  MapScreen: MapScreen
  // ResultsScreen: StationsListScreen,
  // StationDetail: StationDetailScreen
});

const AppNavigator = createSwitchNavigator({
  // Auth: AuthStack,
  Main: MapStack
});

export default createAppContainer(AppNavigator);
