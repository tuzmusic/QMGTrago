import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import { loadUser, setUser } from "../redux/actions/authActions";

const AuthStack = createSwitchNavigator({ Login: LoginScreen });

export class AuthNavigator extends Component {
  static router = AuthStack.router;

  async componentDidMount() {
    await this.props.loadUser();
    if (this.props.user) this.props.navigation.navigate("Main");
  }

  render() {
    return <AuthStack navigation={this.props.navigation} />;
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user };
};

export default connect(
  mapStateToProps,
  { setUser, loadUser }
)(AuthNavigator);
