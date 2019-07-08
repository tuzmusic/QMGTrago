// @flow

import React, { Component } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { AsyncStorage } from "react-native";

class UserScreen extends Component<Object> {
  componentWillReceiveProps(newProps) {
    if (!newProps.user) this.props.navigation.navigate("Auth");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.user &&
            `Logged in as ${this.props.user.username ||
              this.props.user.user.username}`}
        </Text>
        <Button
          buttonStyle={styles.logout}
          containerStyle={styles.button}
          color="red"
          titleStyle={styles.text}
          onPress={this.props.logout}
          title="Log Out"
          loading={this.props.isLoading}
          disabled={this.props.isLoading}
        />
      </View>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user, isLoading: state.auth.isLoading }),
  { logout }
)(UserScreen);

const styles = {
  button: { width: "65%", margin: 30 },
  logout: { backgroundColor: "red" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100
  },
  text: {
    fontSize: 24,
    textAlign: "center"
  }
};
