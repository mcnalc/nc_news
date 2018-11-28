import React, { Component } from "react";
import * as api from "../api";

class UserProfile extends Component {
  state = {
    user: {},
    loading: true
  };
  render() {
    const { username, name, avatar_url } = this.state.user;
    return (
      <div>
        <h1>USER PROFILE</h1>
        <div className="userprofile">
          <img src={avatar_url} height="90px" width="90px" />
          <p />
          <strong>Username:</strong> {username}
          <p />
          <strong>Real name:</strong> {name}
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    api.getUser(this.props.username).then(user => {
      this.setState({
        user,
        loading: false
      });
    });
  };
}

export default UserProfile;
