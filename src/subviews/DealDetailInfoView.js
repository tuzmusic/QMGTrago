// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Linking, TouchableOpacity, Text } from "react-native";
import { Image } from "react-native-elements";
import { MaterialIndicator } from "react-native-indicators";
import CellTextRow from "../subviews/CellTextRow";
import type Deal from "../models/Deal";

function openURL(url) {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        console.log("Can't handle url: " + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error("An error occurred", err));
}

function openMap(address) {
  let baseURL = "https://www.google.com/maps/search/?api=1&query=";
  // if (Platform.OS === 'ios') baseURL = "http://maps.apple.com/?q="
  openURL(baseURL + address);
}
const DealDetailInfoView = ({ deal }: { deal: Deal }) => {
  return (
    <View style={styles.textContainer}>
      {/* Name */}
      <CellTextRow style={text.name}>{deal.name}</CellTextRow>
      {/* Address */}
      <TouchableOpacity onPress={openMap.bind(null, deal.address)}>
        <CellTextRow style={[text.address, text.link]}>
          {deal.address}
        </CellTextRow>
      </TouchableOpacity>
      <View style={[styles.centered, styles.info]}>
        <CellTextRow style={text.shortDescription}>
          {deal.shortDescription}
        </CellTextRow>
        <View style={styles.rowContainer}>
          <CellTextRow style={text.fullPrice}>{deal.regularPrice$}</CellTextRow>
          <Text>{"      "}</Text>
          <CellTextRow style={text.salePrice}>{deal.salePrice$}</CellTextRow>
        </View>
      </View>
    </View>
  );
};

export default DealDetailInfoView;

const baseSize = 17;
const text = {
  name: {
    fontWeight: "bold",
    fontSize: 24
  },
  address: {
    fontSize: baseSize
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  salePrice: {
    fontSize: baseSize + 4,
    color: "green",
    fontWeight: "bold"
  },
  fullPrice: {
    fontSize: baseSize + 4,
    color: "red",
    textDecorationLine: "line-through"
  },
  shortDescription: {
    fontSize: baseSize + 2
  }
};

const styles = {
  container: { display: "flex", flex: 1 },
  info: { marginTop: 25 },
  rowContainer: {
    flexDirection: "row"
  },
  imageContainer: {
    flex: 1,
    backgroundColor: "lightgrey"
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    // borderWidth: 1,
    flex: 1
  },
  image: {
    height: "100%",
    width: null
  },
  bordered: {
    borderColor: "black",
    borderWidth: 1
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
};
