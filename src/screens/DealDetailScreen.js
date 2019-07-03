// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  View,
  Linking,
  TouchableOpacity,
  Platform,
  Text
} from "react-native";
import { Image, Avatar, Button } from "react-native-elements";
import { MaterialIndicator } from "react-native-indicators";
import HTML from "react-native-render-html";
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
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
    };
  };

  deal: Deal;

  constructor(props) {
    super(props);
    this.deal = this.props.navigation.getParam("deal");
  }

  async onDelete() {
    this.props.navigation.navigate("ListScreen");
    this.props.deleteDeal(this.props.deal);
  }

  render() {
    // if (!this.props.deal) return null;
    // const { deal, users } = this.props;
    const deal = this.deal;
    // const user = users[deal.userID];
    return (
      <ScrollView>
        <View style={styles.imageContainer}>
          <DealImage deal={deal} />
        </View>

        <View style={styles.textContainer}>
          {/* Name */}
          <CellTextRow style={text.name}>{deal.name}</CellTextRow>
          {/* Address */}
          <TouchableOpacity onPress={openMap.bind(null, deal.address)}>
            <CellTextRow style={[text.address, text.link]}>
              {deal.address}
            </CellTextRow>
          </TouchableOpacity>
          <CellTextRow>
            <HTML html={deal.shortDescriptionHTML} />
          </CellTextRow>
        </View>
      </ScrollView>
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
  content: {
    fontSize: baseSize
  },
  website: {
    fontSize: baseSize
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  price: {
    fontSize: baseSize + 4,
    textAlign: "center",
    width: "100%"
  }
};

const styles = {
  buttonContainer: {
    padding: 10,
    width: "100%",
    alignItems: "center"
  },
  infoCell: {
    flex: 2
  },
  iconCell: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    width: "100%"
  },
  icon: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 5,
    marginBottom: 5
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  imageContainer: {
    backgroundColor: "lightgrey"
  },
  textContainer: { alignItems: "flex-start", padding: 15 },
  image: {
    height: 350,
    width: null
  },
  bordered: {
    borderColor: "black",
    borderWidth: 1
  },
  centered: {
    justifyContent: "center",
    alignItems: "center"
  }
};
