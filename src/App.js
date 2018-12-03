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
    loginError: false,
    topics: []
  };
  render() {
    const currentUser = this.state.user;
    return (
      <div className="container">
        <Login user={currentUser} userLogin={this.userLogin}>
          <div className="App">
            <Header user={currentUser} userLogout={this.userLogout} />
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
          </div>
        </Login>
      </div>
    );
  }
  componentDidMount() {
    this.fetchTopics();
    const user = localStorage.getItem("user");
    if (user) this.setState({ user: JSON.parse(user) });
  }

  fetchTopics = () => {
    api.getTopics().then(newTopics => {
      this.setState({
        topics: newTopics
      });
    });
  };

  userLogin = user => {
    this.setState({
      user,
      loginError: false
    });
    localStorage.setItem("user", JSON.stringify(user));
  };

  userLogout = () => {
    this.setState({
      user: {}
    });
    localStorage.removeItem("user");
  };
}

export default App;
