// @flow
import React, { Component } from "react";
import { Image, Overlay } from "react-native-elements";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import {
  login,
  register,
  cancelLogin,
  clearAuthError,
  saveUser
} from "../redux/actions/authActions";
import { getLocationAsync } from "../redux/actions/locationActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import LoginForm from "../subviews/LoginForm";
import RegisterForm from "../subviews/RegisterForm";
import { validate } from "email-validator";
import type { AuthParams } from "../redux/actions/authActions";
import type User from "../models/User";

type State = {
  loggingIn: boolean,
  registering: boolean,
  errors: string[]
};
type Props = {
  clearAuthError: () => void,
  login: AuthParams => void,
  register: AuthParams => void,
  navigation: Object,
  error: string,
  isLoading: boolean,
  user: User,
  getLocationAsync: () => void,
  saveUser: User => void
};

class LoginView extends Component<Props, State> {
  state = {
    loggingIn: true,
    registering: false,
    // loggingIn: false,
    // registering: true,
    errors: []
  };

  componentDidMount() {
    const automate = () => {
      setTimeout(() => {
        this.handleLogin({ username: "testuser1", password: "123123" });
      }, 500);
    };
    // automate();
  }

  async handleLogin({ username, password }: AuthParams) {
    let errors = [];
    if (!username) errors.push("Username required");
    if (!password) errors.push("Password required");

    if (errors.length) {
      this.props.clearAuthError();
      return this.setState({ errors });
    }

    let creds: AuthParams = { password, username: "" };
    if (username.includes("@")) {
      creds.email = username;
    } else {
      creds.username = username;
    }

    await this.props.login(creds);
  }

  async handleRegister({ username, email, password, passwordConfirmation }) {
    let errors = [];
    if (!username) errors.push("Username required");
    if (!email) errors.push("Email required");
    if (!validate(email)) errors.push("Please enter a valid email address");
    if (!password) errors.push("Password required");
    if (password && !passwordConfirmation)
      errors.push("Please type your password twice");
    if (password && passwordConfirmation && password !== passwordConfirmation)
      errors.push("Passwords don't match");

    this.props.clearAuthError();
    this.setState({ errors });
    if (errors.length) return;
    await this.props.register({ username, email, password });
  }

  async componentWillReceiveProps({ user }: Object) {
    if (user) this.props.navigation.navigate("Main");
  }

  toggleForm() {
    this.props.clearAuthError();
    this.setState({
      errors: [],
      loggingIn: !this.state.loggingIn,
      registering: !this.state.registering
    });
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.superContainer}
        // these don't appear to work
        scrollEnabled={true}
        enableAutomaticScroll={true}
        extraScrollHeight={100}
      >
        <View style={styles.container}>
          <Image
            source={require("../../assets/TragoiLogoGrande1.png")}
            style={styles.image}
          />
          {this.state.errors.map((e, i) => (
            <Text style={styles.errorText} key={i}>
              {e}
            </Text>
          ))}
          {!this.state.errors.length && (
            <Text style={styles.errorText}>{this.props.error}</Text>
          )}

          {this.state.loggingIn && (
            <LoginForm
              onSubmit={this.handleLogin.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ errors: [] })}
            />
          )}
          {this.state.registering && (
            <RegisterForm
              onSubmit={this.handleRegister.bind(this)}
              onLinkClick={this.toggleForm.bind(this)}
              onChangeText={() => this.setState({ errors: [] })}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.auth.isLoading,
    user: state.auth.user,
    error: state.auth.error
  }),
  { login, register, cancelLogin, clearAuthError, getLocationAsync, saveUser }
)(LoginView);

const styles = {
  image: {
    height: 100,
    width: 300,
    resizeMode: "contain",
    marginBottom: 20
  },
  errorText: {
    color: "red",
    fontSize: 16
  },
  link: {
    color: "blue",
    textDecorationLine: "underline"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  superContainer: {
    flex: 1,
    justifyContent: "center"
  }
};
