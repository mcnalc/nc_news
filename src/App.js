import React, { Component } from "react";
import "./App.css";
import { Router, navigate } from "@reach/router";
import Header from "./components/Header";
import Login from "./components/Login";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Comments from "./components/Comments";
import UserProfile from "./components/UserProfile";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import * as api from "./api";
import NotFound from "./components/NotFound";

class App extends Component {
  state = {
    user: {},
    topics: []
  };
  render() {
    const currentUser = this.state.user;
    return (
      <div className="App">
        <Login user={currentUser} login={this.login}>
          <Header user={currentUser} />
          <Nav topics={this.state.topics} user={currentUser} />
          <Router>
            <Articles path="/" user={currentUser} />
            <Articles path="/topics/:topic/articles" user={currentUser} />
            <Article path="/articles/:article_id" user={currentUser} />
            <Comments
              path="/articles/:article_id/comments"
              user={currentUser}
            />
            <UserProfile path="users/:username" user={currentUser} />
            <NotFound default />
          </Router>
          <Footer />
        </Login>
      </div>
    );
  }
  componentDidMount() {
    api.getTopics().then(topics => {
      this.setState({
        topics
      });
    });
  }

  login = user => {
    this.setState({
      user
    });
  };
  logout = () => {
    sessionStorage.clear();
    this.setState({
      user: {}
    });
    navigate("/");
  };
}
export default App;
