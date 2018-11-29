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
              userId={this.props.user._id}
              addComment={this.addComment}
            />

            {this.state.comments.map(comment => {
              return (
                <div key={comment._id} className="comments">
                  {comment.body}
                  {this.props.user._id === comment.created_by._id ? (
                    <button
                      className="delete"
                      onClick={() => this.deleteComment(comment._id)}
                    >
                      <i class="fas fa-trash-alt" />
                    </button>
                  ) : null}
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
