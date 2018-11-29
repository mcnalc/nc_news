import React, { Component } from "react";
import { Link } from "@reach/router";

class Nav extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.props;
    return (
      <div className="nav">
        <Link to="/">Home</Link>
        {" | "}
        {topics.map(topic => {
          return (
            <Link key={topic._id} to={`/topics/${topic.slug}/articles`}>
              {topic.title} {" | "}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Nav;
