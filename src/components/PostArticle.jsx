import React, { Component } from "react";
import * as api from "../api";

export default class PostArticle extends Component {
  state = {
    title: "",
    body: "",
    belongs_to: ""
  };

  render() {
    const topics = ["Select", "coding", "football", "cooking"];
    return (
      <div>
        <div className="postarticle">
          <h1>Post new article</h1>
          <form onSubmit={this.handleSubmit} className="article-form">
            <label htmlFor="title">Title: </label>
            <input
              className="title-input"
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="body">Article: </label>
            <textarea
              className="second-input"
              type="text"
              id="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
            <br />
            Topic:{" "}
            <select
              className="select-button"
              value={this.state.belongs_to}
              onChange={this.handleChange}
              id="belongs_to"
            >
              {topics.map(topic => {
                return (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                );
              })}
            </select>
            <br />
            <button className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    );
  }

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    api
      .postArticle(
        { ...this.state, created_by: "5be5a10bacf3fd8d0934132e" },
        this.state.belongs_to
      )
      .then(article => {
        this.props.addArticle(article);
      });
    this.setState({
      title: "",
      body: "",
      belongs_to: ""
    });
  };
}
