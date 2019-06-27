// @flow

import type Deal from "../models/Deal";
import type { Location } from "../redux/reducers/locationReducer";
import React from "react";
import { connect } from "react-redux";
import { FlatList, View, Text } from "react-native";
import DealCellView from "../subviews/DealCellView";

type Props = {
  deals: Deal[],
  navigation: {},
  onTextPress: (item: Deal) => mixed,
  location: Location
};

const EmptyDealList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>
        Sorry, there are no deals within the search area.
      </Text>
      <Text style={styles.emptyListText}>
        Try searching a different region, or expanding the search radius.
      </Text>
    </View>
  );
};

const DealsList = (props: Props) => {
  return (
    <View>
      {props.deals.length === 0 ? (
        <EmptyDealList />
      ) : (
        <FlatList
          data={props.deals}
          renderItem={({ item }) => (
            <DealCellView
              deal={item}
              navigation={props.navigation}
              onTextPress={() => props.onTextPress(item)}
            />
          )}
          style={{ marginLeft: 5, marginRight: 5 }}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
    </View>
  );
};
export default connect()(DealsList);

const styles = {
  emptyListContainer: {
    justifyContent: "center",
    height: "90%",
    padding: 10
  },
  emptyListText: {
    textAlign: "center",
    fontSize: 18,
    padding: 10
  }
};
