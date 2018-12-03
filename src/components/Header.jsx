import React, { Component } from "react";
import { Link } from "@reach/router";

class Header extends Component {
  render() {
    const { user, userLogout } = this.props;
    return (
      <div className="header">
        <span className="logged-in">
          <Link to={`/users/${user.username}`}>
            <img
              src={user.avatar_url}
              onError={e => (e.target.src = "/default.jpeg")}
              className="tiny-avatar"
              alt="default user avatar"
            />{" "}
            <strong>{user.username}</strong>
          </Link>
          {" | "}
          <button
            className="logout"
            onClick={() => {
              userLogout();
            }}
          >
            Log Out
          </button>
        </span>
        <h1 className="main-heading">
          <Link to="/">
            NC News <i className="far fa-newspaper" />
          </Link>
        </h1>
      </div>
    );
  }
}

export default Header;
