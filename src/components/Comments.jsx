import React, { Component } from "react";
import * as api from "../api";
import PostComment from "./PostComment";
import formatDate from "./utils/formatDate";
import { navigate } from "@reach/router";

export default class Comments extends Component {
  state = {
    comments: [],
    loading: true,
    deleted: false
  };
  render() {
    return (
      <section>
        {this.state.loading ? (
          <h1>Loading....</h1>
        ) : (
          <div>
            <PostComment
              id={this.props.article_id}
              userId={this.props.user._id}
              addComment={this.addComment}
            />

            {this.state.comments.map(comment => {
              return (
                <div key={comment._id} className="comments">
                  {this.props.user._id === comment.created_by._id ? (
                    <button
                      className="delete"
                      onClick={() => this.deleteComment(comment._id)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  ) : null}
                  <div className="meta-info">
                    Posted by{" "}
                    <img
                      src={comment.created_by.avatar_url}
                      onError={e => (e.target.src = "/default.jpeg")}
                      className="tiny-avatar"
                      alt="default user avatar"
                    />
                    {comment.created_by.username}
                    {" | "}
                    {formatDate(comment.created_at)}
                  </div>
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
    api
      .getComments(id)
      .then(comments => {
        comments.sort(function(a, b) {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        this.setState({
          comments,
          loading: false
        });
      })
      .catch(err => {
        navigate("/error", {
          replace: true,
          state: {
            errCode: err.response.status,
            errMsg: err.response.data.msg
          }
        });
      });
  };
  addComment = newComment => {
    this.setState({ comments: [newComment, ...this.state.comments] });
  };

  deleteComment = id => {
    api.deleteComment(id).then(result => {
      const remainingComments = this.state.comments.filter(
        comment => comment._id !== id
      );
      this.setState({
        comments: remainingComments
      });
    });
  };
}
