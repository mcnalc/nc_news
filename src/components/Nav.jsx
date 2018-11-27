import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <ul>
          <Link to={"/"}>Home</Link>
          {" | "}

          <Link to="/topics/coding/articles">Coding</Link>
          {" | "}
          <Link to="/topics/football/articles">Football</Link>
          {" | "}
          <Link to="/topics/cooking/articles">Cooking</Link>
        </ul>
      </div>
    );
  }
}

export default Nav;
