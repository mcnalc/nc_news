import React, { Component } from "react";
import * as api from "../api";
import { Router, navigate } from "@reach/router";

class Login extends Component {
  state = {
    username: "jessjelly"
  };
  render() {
    const { user, children } = this.props;
    console.log(user);
    const { username } = this.state;
    if (user.username) return children;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={this.handleChange}
            placeholder="jessjelly"
          />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={this.handleChange} />
          <button>Log in</button>
        </form>
        <h1>Login bar</h1>
      </div>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    api.login(this.state.username).then(user => {
      console.log(user);
      this.props.login(user);
    });
  };
}

export default Login;
