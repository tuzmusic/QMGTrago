// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapScreen from "./src/screens/MapScreen";
import MapView from "react-native-maps";
import AppNavigator from "./src/containers-navigators/AppNavigator";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import dealsReducer from "./src/redux/reducers/dealsReducer";
import locationReducer from "./src/redux/reducers/locationReducer";
import authReducer from "./src/redux/reducers/authReducer";
// import authSaga from "./src/redux/actions/authActions";
import createSagaMiddleware from "redux-saga";
import locationSaga from "./src/redux/actions/locationActions";
import authSaga from "./src/redux/actions/authActions";
import type { Saga } from "redux-saga";
import { setupAuthMockAdapter } from "./__mocks__/auth/axiosMocks";

const combinedReducer = combineReducers({
  deals: dealsReducer,
  location: locationReducer,
  auth: authReducer
});

function* rootSaga(): Saga<void> {
  sagaMiddleware.run(locationSaga);
  sagaMiddleware.run(authSaga);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combinedReducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
setupAuthMockAdapter();

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
