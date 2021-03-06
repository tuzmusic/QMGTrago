// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Linking, TouchableOpacity, Text } from "react-native";
import { Image } from "react-native-elements";
import { MaterialIndicator } from "react-native-indicators";
import DealDetailInfoView from "../subviews/DealDetailInfoView";
import CellTextRow from "../subviews/CellTextRow";
import type Deal from "../models/Deal";

const DealImage = ({ deal }) => {
  const image = deal.images[0];
  if (image) {
    return (
      <Image
        style={[styles.image, { resizeMode: "cover" }]}
        source={{ uri: image.src }}
        PlaceholderContent={<MaterialIndicator color={"blue"} />}
      />
    );
  } else {
    return (
      <View style={[styles.centered, styles.image]}>
        <Text>No Image Provided</Text>
      </View>
    );
  }
};

class DealDetailScreen extends Component<Object> {
  deal: Deal;

  constructor(props) {
    super(props);
    this.deal = this.props.deal || this.props.navigation.getParam("deal");
  }

  async onDelete() {
    this.props.navigation.navigate("ListScreen");
    this.props.deleteDeal(this.props.deal);
  }

  render() {
    const deal = this.deal;
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <DealImage deal={deal} />
        </View>
        <DealDetailInfoView deal={deal} />
      </View>
    );
  }
}

export default connect()(DealDetailScreen);

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
