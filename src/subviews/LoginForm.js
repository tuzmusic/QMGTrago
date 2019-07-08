import React, { Component } from "react";
import { Input, Button, ThemeProvider } from "react-native-elements";
import { Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class LoginForm extends Component {
  state = {
    username: "testuser1",
    password: "123123",
    username: "",
    password: ""
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Input
          placeholder="Username"
          label={this.state.username && "Username"}
          value={this.state.username}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChangeText={username => {
            this.props.onChangeText();
            this.setState({ username });
          }}
        />
        <Input
          placeholder="Password"
          label={this.state.password && "Password"}
          secureTextEntry
          value={this.state.password}
          autoCorrect={false}
          autoCapitalize={"none"}
          onChangeText={password => {
            this.props.onChangeText();
            this.setState({ password });
          }}
        />
        <Button
          title="Login"
          disabled={this.props.isLoading}
          onPress={() => this.props.onSubmit(this.state)}
        />
        <TouchableOpacity onPress={this.props.onLinkClick}>
          <Text style={{ fontSize: 16 }}>
            Don't have an account? <Text style={styles.link}>Click here</Text>{" "}
            to register.
          </Text>
        </TouchableOpacity>
      </ThemeProvider>
    );
  }
}

export default connect(state => ({
  isLoading: state.auth.isLoading
}))(LoginForm);

const theme = {
  Input: {
    containerStyle: {
      padding: 10
    }
  },
  Button: {
    containerStyle: {
      padding: 30,
      width: "100%"
    }
  },
  Text: {
    style: {
      fontSize: 16
    }
  }
};

const styles = {
  link: {
    color: "blue",
    textDecorationLine: "underline"
  }
};
