import React, { Component } from "react";
import * as api from "../api";

export default class PostComment extends Component {
  state = {
    title: "",
    body: "",
    belongs_to: ""
  };

  render() {
    const topics = ["Select", "coding", "football", "cooking"];
    return (
      <div>
        <div className="postcomment">
          <h1>Post new comment</h1>
          <form onSubmit={this.handleSubmit} className="comment-form">
            <label htmlFor="title">Title: </label>
            <input
              className="title-input"
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="body">Comment </label>
            <textarea
              className="second-input"
              type="text"
              id="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
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
      .postComment(
        {
          ...this.state,
          belongs_to: this.props.id,
          created_by: this.props.userId
        },
        this.props.id
      )
      .then(comment => {
        this.props.addComment(comment);
      });
    this.setState({
      title: "",
      body: "",
      belongs_to: ""
    });
  };
}
