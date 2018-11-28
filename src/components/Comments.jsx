import React, { Component } from "react";
import * as api from "../api";
import PostComment from "./PostComment";

export default class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    deleted: false
  };
  render() {
    return (
      <section>
        <h1>Comments</h1>
        {this.state.loading ? (
          <h1>Loading....</h1>
        ) : (
          <div>
            <PostComment
              id={this.props.article_id}
              userId="5be5a10bacf3fd8d0934132e"
              addComment={this.addComment}
            />

            {this.state.comments.map(comment => {
              return (
                <div key={comment._id} className="comments">
                  {comment.body}
                </div>
              );
            })}
          </div>
        )}
      </section>
    );
  }
  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps) {
    const id = this.props.article_id;

    if (prevProps.article_id !== id) this.fetchComments();
  }

  fetchComments = () => {
    const id = this.props.article_id;
    api.getComments(id).then(comments => {
      this.setState({
        comments,
        loading: false
      });
    });
  };
  addComment = newComment => {
    this.setState({ comments: [newComment, ...this.state.comments] });
  };
}
