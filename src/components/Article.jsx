import React, { Component } from "react";
import * as api from "../api";
import { Link, navigate } from "@reach/router";
import formatDate from "./utils/formatDate";
import Vote from "./Vote";
import Comments from "./Comments";

export default class Article extends Component {
  state = {
    article: {},
    loading: true
  };
  render() {
    const { title, body, comment_count, votes, _id } = this.state.article;
    return this.state.loading ? (
      <i className="fa fa-spinner fa-pulse" aria-hidden="true" />
    ) : (
      <div key={title} className="articles">
        <div className="one-article-stub">
          <div className="votes">
            <Vote votes={votes} _id={_id} />
          </div>
          <div className="meta-info">
            Posted by:{" "}
            <Link to={`/users/${this.state.article.created_by.username}`}>
              <strong>
                {this.state.article.created_by.username}{" "}
                <img
                  src={this.state.article.created_by.avatar_url}
                  onError={e => (e.target.src = "/default.jpeg")}
                  className="tiny-avatar"
                  alt="default user avatar"
                />
              </strong>
            </Link>
            {" | "} {formatDate(this.state.article.created_at)}
          </div>
          <h1 className="article-title">{title}</h1>

          <p className="article-body">{body}</p>
        </div>
        <div className="comments-section" />

        {comment_count && (
          <Comments
            article_id={this.state.article._id}
            user={this.props.user}
          />
        )}
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle();
  }

  vote = () => {
    api.vote(this.state.article_id).then(({ votes }) => {
      this.setState(state => {
        return {
          article: { ...state.article, votes: state.article.votes + 1 }
        };
      });
    });
  };

  fetchArticle = () => {
    api
      .getArticle(this.props.article_id)
      .then(article => {
        this.setState({
          article,
          loading: false
        });
      })
      .catch(err => {
        console.log("am i here?");
        navigate("/error", {
          replace: true,
          state: {
            errCode: err.response.status,
            errMsg: err.response.data.msg
          }
        });
      });
  };
}
