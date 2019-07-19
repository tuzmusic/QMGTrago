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
import createSagaMiddleware from "redux-saga";
import locationSaga from "./src/redux/actions/locationActions";
import authSaga from "./src/redux/actions/authActions";
import dealsSaga from "./src/redux/actions/dealActions";
import wishlistSaga from "./src/redux/actions/wishlistActions";
import type { Saga } from "redux-saga";
import { setupMockAdapter } from "./__mocks__/axiosMocks";
import wishlistReducer from "./src/redux/reducers/wishlistReducer";

declare var __DEV__: boolean;

const combinedReducer = combineReducers({
  deals: dealsReducer,
  location: locationReducer,
  auth: authReducer,
  wishlist: wishlistReducer
});

function* rootSaga(): Saga<void> {
  sagaMiddleware.run(locationSaga);
  sagaMiddleware.run(authSaga);
  sagaMiddleware.run(dealsSaga);
  sagaMiddleware.run(wishlistSaga);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(combinedReducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

if (__DEV__) setupMockAdapter({ deals: true, auth: true, wishlist: true });

export default function App() {
  // console.log(__DEV__ ? "development" : "production", "mode");

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
