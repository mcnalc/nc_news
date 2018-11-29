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
        <div className="postarticle">
          <h1>
            <i class="fas fa-pen-square" />
          </h1>
          <form onSubmit={this.handleSubmit} className="article-form">
            <textarea
              className="body-input"
              type="text"
              id="body"
              placeholder="Write your comment here"
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
