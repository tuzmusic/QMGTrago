// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "./src/screens/MapScreen";
import MapView from "react-native-maps";
import AppNavigator from "./src/navigators/AppNavigator";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import dealsReducer from "./src/redux/reducers/dealsReducer";
import authReducer from "./src/redux/reducers/authReducer";
// import authSaga from "./src/redux/actions/authActions";
import createSagaMiddleware from "redux-saga";

const combinedReducer = combineReducers({
  deals: dealsReducer
  // auth: authReducer
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(combinedReducer, {}, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(authSaga);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
