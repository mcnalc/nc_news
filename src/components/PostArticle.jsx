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
          <i className="fas fa-pen-square" />

          <form onSubmit={this.handleSubmit} className="article-form">
            <input
              className="title-input"
              type="text"
              id="title"
              placeholder="Article title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <br />
            <textarea
              className="body-input"
              type="text"
              id="body"
              placeholder="Write your article here"
              value={this.state.body}
              onChange={this.handleChange}
            />
            <br />{" "}
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
            <button className="submit-button">
              <i className="far fa-envelope" />
            </button>
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
        { ...this.state, created_by: this.props.user._id },
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
