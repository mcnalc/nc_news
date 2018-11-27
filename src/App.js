import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import Header from "./components/Header";
import Login from "./components/Login";
import Articles from "./components/Articles";
import Article from "./components/Article";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import * as api from "./api";

class App extends Component {
  state = {
    user: {},
    topics: []
  };
  render() {
    const currentUser = this.state.user;
    return (
      <div className="App">
        {/* <Login user={this.state.user} login={this.login}> */}
        <Header />
        <Nav />
        <Router>
          <Articles path="/" />
          <Articles path="/topics/:topic/articles" />
          <Article path="/articles/:article_id" />
        </Router>
        <Footer />
        {/* </Login> */}
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
}

export default App;
