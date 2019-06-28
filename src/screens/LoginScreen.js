import React, { Component } from "react";
import { Image, Overlay } from "react-native-elements";
import { View, Text, TouchableOpacity, AsyncStorage } from "react-native";
import { DotIndicator } from "react-native-indicators";
import { connect } from "react-redux";
import {
  login,
  register,
  cancelLogin,
  clearAuthError
} from "../redux/actions/authActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import LoginForm from "../subviews/LoginForm";
import RegisterForm from "../subviews/RegisterForm";
import { validate } from "email-validator";

class LoginView extends Component {
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

  async handleLogin({ username, password }) {
    let errors = [];
    if (!username) errors.push("Username required");
    if (!password) errors.push("Password required");

    if (errors.length) {
      this.props.clearAuthError();
      return this.setState({ errors });
    }

    let creds = { password };
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

  async componentWillReceiveProps(newProps) {
    if (newProps.user) {
      try {
        // await AsyncStorage.setItem(
        //   "trago_logged_in_user",
        //   JSON.stringify(newProps.user)
        // );
        // console.log(
        // "newly logged in user has been saved as:",
        // await AsyncStorage.getItem("trago_logged_in_user")
        // );
      } catch (error) {
        console.warn("Couldn't write user to storage.", error);
      }

      this.props.navigation.navigate("Main");
    }
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
      <KeyboardAwareScrollView contentContainerStyle={styles.superContainer}>
        <View style={styles.container}>
          <Overlay
            containerStyle={styles.modal}
            height={200}
            width={200}
            isVisible={this.props.isLoading}
            style={styles.modal}
            borderRadius={20}
            overlayBackgroundColor={"lightblue"}
          >
            <View style={styles.modalContainer}>
              <DotIndicator color={"darkgrey"} />
              <Text>Logging in...</Text>
              {/* <Text></Text>
              <TouchableOpacity onPress={this.props.cancelLogin}>
                <Text style={[styles.link]}>Cancel</Text>
              </TouchableOpacity> */}
            </View>
          </Overlay>
          {/*  <Image
            source={require("../../assets/images/proz-reviews-logo.png")}
            style={styles.image}
          /> */}
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
  { login, register, cancelLogin, clearAuthError }
)(LoginView);

const styles = {
  image: {
    height: 200,
    width: 200,
    marginBottom: 40
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
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 40
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    margin: 40
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};
