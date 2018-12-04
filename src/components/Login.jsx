import React, { Component } from "react";
import * as api from "../api";

class Login extends Component {
  state = {
    username: "jessjelly"
  };
  render() {
    const { user, children } = this.props;
    if (user.username) return children;
    return (
      <div className="login">
        <h1>Welcome to NC News!</h1>
        <p>You need to log in to read and post</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="username-input"
            type="text"
            value={this.state.username}
            id="username"
            onChange={this.handleChange}
            placeholder="jessjelly"
          />
          <label htmlFor="password">Password:</label>
          <input
            className="password-input"
            type="password"
            id="password"
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
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
      this.props.userLogin(user);
    });
  };
}

export default Login;
