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
      <div className="userprofile">
        <strong /> <h2>{username}</h2>
        <p />
        <img
          src={avatar_url}
          onError={e => (e.target.src = "/default.jpeg")}
          height="90px"
          width="90px"
          className="profile-pic"
          alt="user profile avatar"
        />
        <p />
        <p />
        <strong>Real name:</strong> {name}
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
