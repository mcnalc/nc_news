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
            />{" "}
            <strong>{user.username}</strong>
          </Link>
          {" | "}
          <button
            onClick={() => {
              userLogout();
            }}
          >
            Log Out
          </button>
        </span>
        <h1 className="main-heading">
          NC News <i class="far fa-newspaper" />
        </h1>
      </div>
    );
  }
}

export default Header;
