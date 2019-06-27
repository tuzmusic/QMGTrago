// @flow

import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import pluralize from "pluralize";

const FilterInput = (props: {
  onSelectDropdown: any => void,
  startingValue: number
}) => {
  const radiuses: number[] = [1, 5, 15, 25]; //, 50, 100];
  const dropDownOptions = radiuses.map(num => ({
    value: num,
    label: pluralize("mile", num, true)
  }));
  dropDownOptions.push({ value: 1e100, label: "∞ miles" });
  return (
    <View style={styles.filterContainerLine1}>
      <Text style={{ fontSize: 17 }}>Show stations within: </Text>
      <View style={styles.dropDownContainer}>
        <Dropdown
          dropdownOffset={{ top: 15, left: 0 }}
          value={pluralize("miles", props.startingValue, true)}
          onChangeText={props.onSelectDropdown}
          data={dropDownOptions}
          dropdownPosition={-5.15}
          // renderBase can use default text, but then you lose the accessory.
          // Original accessory uses styles, check out the module's index.js, search for "renderAccessory() {"
        />
      </View>
    </View>
  );
};
export default FilterInput;
const styles = {
  dropDownContainer: {
    width: "30%",
    paddingLeft: 5
  },
  filterContainerLine1: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center"
  }
};
