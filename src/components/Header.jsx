import React, { Component } from "react";

class Header extends Component {
  render() {
    const { topics, user, logout } = this.props;
    return (
      <div className="header">
        <span className="logged-in">
          <img src={user.avatar_url} className="tiny-avatar" />{" "}
          <strong>{user.username}</strong>
          {" | "}
          <button onClick={logout}>Log Out</button>
        </span>
        <h1 className="main-heading">
          NC News <i class="far fa-newspaper" />
        </h1>
      </div>
    );
  }
}

export default Header;
