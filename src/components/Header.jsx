import React, { Component } from "react";
import { Link } from "@reach/router";

class Header extends Component {
  render() {
    const { user, userLogout } = this.props;
    return (
      <div className="header">
        <span className="main-heading">
          <Link to="/">{`<NC News/>`}</Link>
        </span>
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
      </div>
    );
  }
}

export default Header;
